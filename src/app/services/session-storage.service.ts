import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }

  public set(key:string,value:any){
    this.storage.set(key,value);
  }
  public get(key:string):any{
    return this.storage.get(key)
  }
  public remove(key:string){
    this.storage.remove(key);
  }
  public clear(){
    // console.log("HERE", this.storage)
    const storage = this.storage as any;

    setTimeout(() => {
      Object.keys(storage.storage).forEach((key) =>{
        if(!key.includes('persistent'))
          this.storage.remove(key)
      })
    }, 10000)
    
    //this.storage.clear();
  }
  public getLoggedUser(){
     return this.get('logged')
  }
}
