import { Injectable } from '@angular/core';
import { ICow,  IUpdateCow, IVaccine, dates } from '../models/cow';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SCM } from '../models/scm';

@Injectable({
  providedIn: 'root'
})
export class CowsService {

  allCows : any 
  constructor(private http : HttpClient) { }

  postCow(cow :ICow) : Observable<any>{
    return this.http.post('http://127.0.0.1:8000/cow',cow);
  }

  getCows() : Observable<any > {
    return this.http.get('http://127.0.0.1:8000/cows');
  }

  updateVaccine(data : IVaccine){
    return this.http.post('http://127.0.0.1:8000/cowvaccine' ,data);
  }

  getVaccinedata(){
    return this.http.get('http://127.0.0.1:8000/vaccinedetails');
  }

  updateCowVaccine(data : dates,id : string){
    console.log(data, id)
    return this.http.put('http://127.0.0.1:8000/vaccinedetails/' + id, data);
  }

  scmDetection(data : SCM){
    return this.http.post('http://127.0.0.1:8000/predict' ,data);
  }
}
