import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, OnDestroy, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User, Userdashboard } from 'src/app/models/user';
import { UserdataService } from 'src/app/services/userdata.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Sort, MatSortModule } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ViewuserComponent } from '../viewuser/viewuser.component';
import { EdituserComponent } from '../edituser/edituser.component';
import { Attendance } from 'src/app/models/attendance';
import { BlockScrollStrategy } from '@angular/cdk/overlay';




@Component({
  selector: 'app-disease-detection',
  templateUrl: './disease-detection.component.html',
  styleUrls: ['./disease-detection.component.scss']
})

export class DiseaseDetectionComponent implements OnInit {

  isClickedSCM : boolean = false;
  isClickedLSD : boolean = false;

  ngOnInit(): void {
      
  }
  SCMDetection(){
    this.isClickedSCM = true;
    this.isClickedLSD = false;
  }
  LSDDetection(){
    this.isClickedLSD = true;
    this.isClickedSCM = false;
  }
  onChange(e : any){
    file : File = e.target.files[0]
    
  }
  onUpload(){
    console.log()
  }

}
