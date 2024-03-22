import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VaccineService {

  vaccineNotificationData : Array<Object> = []

  pastNotificationData : Array<Object> = []
  
  constructor() { }
}
