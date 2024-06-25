import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, finalize, Observable, retry, throwError } from 'rxjs';
import { AuthService } from './services/auth.service';
import { UtilsService } from './services/utils.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService:AuthService,
    private utils:UtilsService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(!request.url.includes("last-seen-check") && !request.url.includes("crm") && !request.url.includes("super-admin") && !request.url.includes('check-token')){
      this.utils.showLoading()
   }
  //  console.log('check request')
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
          } else {
            // server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          }
          
          // console.log(errorMessage)
          
          let is_show_error=1

          console.log(error)
          if(error.name==="HttpErrorResponse" && error.status===401){
            // console.log('11111')
            try{
              //this.authService.logout();
              /* this.authService.logout();
              this.sessionStorageService.clear()
              this.router.navigateByUrl("/") */
            }catch(e){
              //this.router.navigateByUrl("/")
            }
            is_show_error=0
          }
          // if(error.error.status==="ERROR" && error.error.message==="Invalid token"){
          //   this.authService.logout();
          //   this.sessionStorageService.clear()
          //   is_show_error=0
          // }

          // // if(error.error.status==="ERROR" && error.error.message==="Token expired"){
          // //   this.authService.logout();
          // //   this.sessionStorageService.clear()
          // // }

          if(is_show_error===1){
            this.utils.showNotify("error", "Error , Please try again");
          }

          return throwError(errorMessage);
        }),
        finalize(()=>{
          this.utils.hideLoading()
        })
      )
  }
}
