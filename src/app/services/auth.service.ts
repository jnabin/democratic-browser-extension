import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import * as AWS from 'aws-sdk/global';


import {
	CognitoUserPool,
	CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserSession
} from 'amazon-cognito-identity-js';
import { environment } from 'src/environments/environment';
import { ApiUserService } from '../api/api-user.service';
import { SessionStorageService } from './session-storage.service';

const POOL_DATA = {
	UserPoolId:environment.AwsUserPoolId, // Your user pool id here
	ClientId: environment.AwsClientId, // Your client id here
};
const userPool = new CognitoUserPool(POOL_DATA);
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  savedCognitoUser:CognitoUser
  authIsLoading = new BehaviorSubject<boolean>(false);
  onAuthenticatorApp = new Subject<any>();
  authDidFail = new BehaviorSubject<boolean>(false);
  authStatusChanged = new Subject<boolean>();
  signInSubmit = new Subject<any>()
  
  constructor(
    private apiService:ApiUserService,
    private sessionStorageService:SessionStorageService,
  ) { }

  signIn(username: string, password: string,remember_me): void {
    this.authIsLoading.next(true);
    const authData = {
      Username: username,
      Password: password
    };
    const authDetails = new AuthenticationDetails(authData)
    const userData={
      Username: username,
      Pool: userPool
    }
    const cognitUser = new CognitoUser(userData)
    const that = this
    // console.log('signin')
    cognitUser.authenticateUser(authDetails,{
      onSuccess(result: CognitoUserSession) {

        console.log(result)

        if(remember_me==true){

          cognitUser.setDeviceStatusRemembered({
            onSuccess: function(result) {
              console.log('call result: ' + result);
            },
            onFailure: function(err) {
              // alert(err.message || JSON.stringify(err));
            },
          })
        }

        AWS.config.region = environment.AwsRegion;
        const user_pool_key = 'cognito-idp.'+environment.AwsRegion+'.amazonaws.com/'+environment.AwsUserPoolId
        
        const login = {}
        login[user_pool_key]=result.getIdToken().getJwtToken();

        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: environment.AwsIdentifyPoolId, // your identity pool id here
          Logins: login,
        });
        
        //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
        (AWS.config.credentials as AWS.CognitoIdentityCredentials).refresh(error => {
          if (error) {
            console.error(error);
          } else {
            that.apiService.logIn({
              email:result.getIdToken().payload['email'],
              id_token:result.getIdToken().getJwtToken(),
              refresh_token:result.getRefreshToken().getToken(),
              access_token:result.getAccessToken().getJwtToken(),
            }).subscribe(res=>{
              if(res.status==="ERROR"){
                // console.log(res.message)
                that.authStatusChanged.next(false)
                that.authDidFail.next(true)
                that.authIsLoading.next(false)
              }else{

                that.sessionStorageService.set('logged',res.data)

                that.authStatusChanged.next(true)
                that.authDidFail.next(false)
                that.authIsLoading.next(false)
              }
            })
          }
        }); 

      },
      onFailure(err){
        that.authStatusChanged.next(false)
        that.authDidFail.next(true)
        that.authIsLoading.next(false)
        that.signInSubmit.next({status:'false',message:err.message})
      },
      newPasswordRequired: function(userAttributes, requiredAttributes) {
        delete userAttributes.email_verified;
        delete userAttributes.phone_number_verified;
        cognitUser.completeNewPasswordChallenge(password, userAttributes, this);
      },
      selectMFAType: function(challengeName, challengeParameters) {
        console.log(challengeParameters,challengeParameters.CODE_DELIVERY_DESTINATION)
        // var mfaType = prompt('Please select the MFA method.', ''); // valid values for mfaType is "SMS_MFA", "SOFTWARE_TOKEN_MFA"
        // cognitUser.sendMFASelectionAnswer(mfaType, this);
        that.savedCognitoUser = cognitUser
        that.signInSubmit.next({status:'select-mfa',sms_delivery_phone:challengeParameters.CODE_DELIVERY_DESTINATION})
      },
      totpRequired: function () {
        that.savedCognitoUser = cognitUser
        that.signInSubmit.next({status:'software-token-mfa-input'})
        // console.log('mfa required')
        // const verificationCode = prompt('Please input verification code', '');
        // cognitUser.sendMFACode(verificationCode, this,"SOFTWARE_TOKEN_MFA");
      },
      mfaRequired:function (challengeName,codeDeliveryDetails) {
        that.savedCognitoUser = cognitUser
        that.signInSubmit.next({status:'sms-mfa-input',sms_delivery_phone:codeDeliveryDetails.Destination})
        // console.log('mfa required')
        // const verificationCode = prompt('Please input verification code', '');
        // cognitUser.sendMFACode(verificationCode, this);
      }
    })

    // this.authStatusChanged.next(true);
    return;
  }
  getAuthenticatedUser() {
    return userPool.getCurrentUser()
  }
}
