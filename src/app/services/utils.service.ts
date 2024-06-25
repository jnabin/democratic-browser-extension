import { Injectable } from '@angular/core';
import { SessionStorageService } from './session-storage.service';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';
import { CallCenterToast } from './toast';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private sessionStorageService:SessionStorageService,
    private toastr: ToastrService
  ) { }

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

  hideLoading(){
    console.log("In HIDE")
    const loading = document.querySelector('.loading-container')
    if(loading){
      (document.querySelector('.loading-container') as HTMLElement).style.display = 'none';
    }
  }
  showNotify(type,message,title="",ops_config={}){
    let ops={}
    if(Object.keys(ops_config).length === 0){
      ops={
        toastComponent:CallCenterToast,
        titleClass:'toast-title '+type,
        // timeOut:3000
        // easeTime:3000
      }
    }else{
      ops = {
        toastComponent:CallCenterToast,
        titleClass:'toast-title '+type,
        ...ops_config
      }
    }
    // console.log(ops)
    if(type=="success"){
      if(title===""){
        title = "Success"
      }
      this.toastr.success(message,title,ops)
    }else if(type=="error"){
      if(title===""){
        title = "Error"
      }
      this.toastr.error(message,title,ops)
    }else if(type=="plivo"){
      if(title===""){
        title = "Alert Notification"
      }
      this.toastr.error(message,title,ops)
    }else if(type=="warning"){
      if(title===""){
        title = "Warning"
      }
      this.toastr.warning(message,title,ops)
    }else if(type=="info"){
      if(title===""){
        title = "Info"
      }
      this.toastr.info(message,title,ops)
    }
  }

  showLoading(){
    console.log("In SHOW")
    let loading = document.querySelector('.loading-container')
    if(loading){
      (document.querySelector('.loading-container') as HTMLElement).style.display = 'block';
    }
  }

}
