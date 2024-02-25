import { LiveAnnouncer } from '@angular/cdk/a11y';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CowsService } from 'src/app/services/cows.service';
import { VaccineService } from 'src/app/services/vaccine.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  vaccineList: any = [];
  vaccineDue: any;
  constructor(
    private cowService: CowsService,
    private _liveAnnouncer: LiveAnnouncer,
    public dialog: MatDialog,
    public datepipe: DatePipe,
    private vaccineService: VaccineService
  ) {}

  ngOnInit(): void {
    this.subscribeVaccineData();
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
    const intervalInMilliseconds = 27 * 24 * 60 * 60 * 1000;
    // console.log(this.vaccineList);
    for (let val of this.vaccineList) {
      const time = val.status[val.status.length - 1].date;
      // console.log(typeof(time));
      const givenTime = new Date(time);
      const timeDifference = currentTime.getTime() - givenTime.getTime();

      if (timeDifference >= intervalInMilliseconds) {
        this.sendNotification(val);
      }
    }
  }

  sendNotification(cow: any) {
    this.vaccineService.vaccineNotificationData.push(cow);
    this.vaccineDue = this.vaccineService.vaccineNotificationData;
    console.log(this.vaccineDue);
  }
}
