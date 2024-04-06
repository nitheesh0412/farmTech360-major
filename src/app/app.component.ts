import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserdataService } from './services/userdata.service';
import { Subscription } from 'rxjs';
import { User } from './models/user';
import { VaccineService } from './services/vaccine.service';
import { CowsService } from './services/cows.service';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  vaccineList: any = [];
  events: string[] = [];
  opened! : boolean;
  title = 'studentdashboard';
  isExpanded : boolean = true;
  someusers = this._userdataservice.allUsers;
  vaccineDue: any;
  pastVaccineDue : any
  constructor(private _userdataservice: UserdataService, private vaccineService : VaccineService,
    private cowService : CowsService, public datepipe: DatePipe, private toastr : ToastrService){

  }
  
userSubscription$ !: Subscription
  userAttendanceSubscription$ !: Subscription
  subscriptions: Subscription[] = []

  ngOnInit(): void {
    this.subscribeVaccineData();
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


    
  }
  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }

  subscribeVaccineData() {
    this.cowService.getVaccinedata().subscribe((vaccinedata: any) => {
      this.vaccineList = vaccinedata;
      this.notifications();
      for (let vaccine of this.vaccineList) {
        for (let val of vaccine.status) {
          val.date = this.datepipe.transform(val.date, 'dd-MM-YYYY');
        }
      }
    });
  }
  notifications() {
    const currentTime = new Date();
    const intervalInMilliseconds =  27 * 24 * 60 * 60 * 1000;

    const past3days = 3 * 24 * 60 * 60 * 1000;
    // console.log(this.vaccineList);
    for (let val of this.vaccineList) {
      const time = val.status[val.status.length - 1].date;
      // console.log(typeof(time));
      const givenTime = new Date(time);
      const timeDifference = currentTime.getTime() - givenTime.getTime();
      if (timeDifference >= (val.timeinterval-1)*30*24*60*60*1000 + intervalInMilliseconds + past3days && val.doses > val.status.length) {
        this. pastdue(val);
      }
      else if (timeDifference >= (val.timeinterval-1)*30*24*60*60*1000 +  intervalInMilliseconds && val.doses > val.status.length) {
        this.sendNotification(val);
      }
    }
  }

  sendNotification(cow: any) {
    this.vaccineService.vaccineNotificationData.push(cow);
    this.vaccineDue = this.vaccineService.vaccineNotificationData;
    console.log(this.vaccineDue);
    this.toastr.warning(`cow ID: ${cow.id} need vaccine ${cow.vaccine_name} of ${cow.status.length + 1}  dosage in 3 days</h3>`)
  }
  pastdue(cow : any){
    this.vaccineService.pastNotificationData.push(cow);
    this.pastVaccineDue = this.vaccineService.pastNotificationData;
    console.log(this.pastVaccineDue)
    this.toastr.error(`cow ID: ${cow.id} is past due its ${cow.status.length + 1} dosage of vaccine {${cow.vaccine_name}   `)
  }
}
