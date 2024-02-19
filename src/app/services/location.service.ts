import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http : HttpClient) { }

  getVetByLatLon(lat : number,lon : number){
    return this.http.get(`http://127.0.0.1:8000/get-nearby-doctors?latitude=${lat}&longitude=${lon}`);
  }
}
