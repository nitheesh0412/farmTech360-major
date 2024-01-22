import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Attendance } from 'src/app/models/attendance';
import { User } from 'src/app/models/user';
import { UserdataService } from 'src/app/services/userdata.service';
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  filter : string = ""
  location(){

  }
  ngOnInit(): void {
      
  }
}
