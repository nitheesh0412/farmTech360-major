import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GooglePlacesService {

  private apiKey = 'AIzaSyDKSU3MBrIK8fHXkrxR3fxk-6xb_YMRbRI';

  constructor(private http: HttpClient) {}

  searchVeterinaryServices(location: string): Observable<any> {
    const apiUrl = 'https://maps.googleapis.com/maps/api/place/textsearch/json';

    

    const params = {
      query: `veterinary services in ${location}`,
      key: this.apiKey,
    };

    return this.http.get(apiUrl, { params });
  }
}
