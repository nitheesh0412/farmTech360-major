import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Attendance } from 'src/app/models/attendance';
import { User } from 'src/app/models/user';
import { LocationService } from 'src/app/services/location.service';
import { UserdataService } from 'src/app/services/userdata.service';
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  filter : string = ""
  latitude: number = 0;
  longitude: number = 0;
  doctorDetails : any 
  location(){

  }
  constructor(private _locationService : LocationService){

  }
  ngOnInit(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
    else {
      console.error('Geolocation is not supported by this browser.');
    }
  }
  getLocation() {
    
    this._locationService.getVetByLatLon(this.latitude,this.longitude).subscribe(data => {
      console.log(data);
      this.doctorDetails = data;
      console.log(this.doctorDetails.message.slice(0,5  ))
    });
  }

}
