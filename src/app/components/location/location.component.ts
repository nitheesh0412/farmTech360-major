import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Attendance } from 'src/app/models/attendance';
import { User } from 'src/app/models/user';
import { LocationService } from 'src/app/services/location.service';
import { UserdataService } from 'src/app/services/userdata.service';
interface DoctorDetails {
  Hospital: string;
  Name: string;
  Specialization: string;
  Consultation: string;
  Experience: string;
  // ... other properties
}
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  filter : string = ""
  latitude: number = 0;
  longitude: number = 0;
  doctorDetails : any = {}
  real : any
  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  location(){
    console.log(this.filter)
    
    for(let key of this.getObjectKeys(this.doctorDetails)){
      if(key.includes(this.filter)){
        this.real = this.doctorDetails[key]
        console.log(this.real)
      }
    }
    this.getLocation();
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
  keys : string[] = ["kukatpally", "miyapur", "lb nagar", "manikonda" , "madhapur" , "hayathnagar"]
  getLocation() {
    
    this._locationService.getVetByLatLon(this.latitude,this.longitude).subscribe((data : any) => {
      // console.log(data);
      this.doctorDetails = {
        'kukatpally': data.message.slice(0, 5),
        'miyapur': data.message.slice(5, 10),
        'lb nagar': data.message.slice(0, 5),
        'manikonda': data.message.slice(5, 10),
        'madhapur': data.message.slice(0, 5),
        'hayathnagar': data.message.slice(5, 10),
      };
    });
  }
  matchesFilter(key: string): boolean {
    return key.toLowerCase().includes(this.filter.toLowerCase());
  }
}
