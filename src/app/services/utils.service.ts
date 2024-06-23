import { Injectable } from '@angular/core';
import { SessionStorageService } from './session-storage.service';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private sessionStorageService:SessionStorageService) { }

  getAuthHeader(){
    const logged = this.sessionStorageService.get('logged')
    let tok= ""
    if(logged!==undefined &&  logged.token !== undefined){
      tok  = logged.token
    }
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': tok
      })
    }
  }

  getAuthEmailHeader(email){
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': CryptoJS.AES.encrypt(email, environment.secret_key).toString()
      })
    }
  }

  getTokenHeader(token){
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': token
      })
    }
  }
}
