import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserdataService } from './services/userdata.service';
import { Subscription } from 'rxjs';
import { User } from './models/user';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  events: string[] = [];
  opened! : boolean;
  title = 'studentdashboard';
  isExpanded : boolean = true;
  someusers = this._userdataservice.allUsers;
  constructor(private _userdataservice: UserdataService){

  }
  
userSubscription$ !: Subscription
  userAttendanceSubscription$ !: Subscription
  subscriptions: Subscription[] = []

  ngOnInit(): void {
    
    (function (d, m) {
      var kommunicateSettings = {
        appId: "378cb90130214c38e06eada6e51aa1a03",
        popupWidget: true,
        automaticChatOpenOnNavigation: true,
      };
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      var h = document.getElementsByTagName("head")[0];
      h.appendChild(s);
      (window as any).kommunicate = m;
      m._globals = kommunicateSettings;
    })(document, (window as any).kommunicate || {});


    this.userSubscription$ = this._userdataservice.getUsers().subscribe((userData: User[]) => {
      this._userdataservice.allUsers = userData;
      console.log(this._userdataservice.allUsers)
    }
    )
    this.subscriptions.push(this.userSubscription$)
    this.userAttendanceSubscription$ = this._userdataservice.getUsersAttendance().subscribe({
      next: users => {
        console.log(this._userdataservice.usersAttendance);
      },
      error: err => console.log(err)
    })
    this.subscriptions.push(this.userAttendanceSubscription$)
  }
  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }
}
