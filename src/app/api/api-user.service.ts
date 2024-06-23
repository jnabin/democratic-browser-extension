import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SigninRes } from '../models/signin.res';
import { environment } from 'src/environments/environment';
import { UtilsService } from '../services/utils.service';

@Injectable({
  providedIn: 'root'
})
export class ApiUserService {

  constructor(private httpClient: HttpClient, private utils: UtilsService) { }

  signIn(parti_id):Observable<SigninRes>{
    return this.httpClient.post<SigninRes>(`${environment.api_url}/api/user/signin`,{organization_id:parti_id},this.utils.getAuthHeader());
  }

  logIn(token_obj){
    return this.httpClient.post<SigninRes>(`${environment.api_url}/api/user/login`,token_obj,this.utils.getAuthEmailHeader(token_obj.email));
  }
  
  updateToken(token_obj){
    return this.httpClient.post<SigninRes>(`${environment.api_url}/api/user/update-token`,token_obj,this.utils.getAuthEmailHeader(token_obj.email));
  }
  
  checkValidToken(token){
    return this.httpClient.post<SigninRes>(`${environment.api_url}/api/user/check-token`,{token},this.utils.getAuthHeader());
  }
}
