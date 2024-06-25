import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SessionStorageService } from './services/session-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLogin: boolean = false;
  isOrganizationSelected: boolean = false;
  title = 'democratic-browser-extension';

  constructor(private sessionStorageService:SessionStorageService, private cd: ChangeDetectorRef){
  }

  ngOnInit(): void {
    chrome.storage.local.get(["tokenObject"], (res: any) => {
      console.log(res);
      if(res.tokenObject) {
        this.sessionStorageService.set('logged',res.tokenObject);
        this.isLogin = true;
        this.cd.detectChanges();
        console.log(this.isLogin);
      } else {
        this.sessionStorageService.clear();
        this.isLogin = false;
        this.cd.detectChanges();
      }
  });
  }
}
