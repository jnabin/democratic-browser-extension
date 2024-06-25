import { Injectable } from '@angular/core';
import { ApiUserService } from '../api/api-user.service';
import { SessionStorageService } from './session-storage.service';
import { interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionExpirationCheckService {

  constructor(
    private userService: ApiUserService,
    private sessionStorage: SessionStorageService
  ) { }

  intervalSubscription;

  startTokenExpirationCheck() {
      if(!this.intervalSubscription){
          console.log("IN CHECK")
          // Check every minute (adjust interval time as needed)
          this.intervalSubscription = interval(60000).subscribe(() => {
              let logged = this.sessionStorage.get('logged');
              let token
              if(logged){
                  token = logged.token
              }
              this.userService.checkValidToken(token).subscribe((res) => {
                  
              })
          });
      }
  }

  stopTokenExpirationCheck(){
      if(this.intervalSubscription)
          this.intervalSubscription.unsubscribe();
  }
}
