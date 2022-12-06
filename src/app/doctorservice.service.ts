import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DoctorserviceService {

  constructor(private http:HttpClient) { }

  getDoctorDetails(){
    return this.http.get<any>("http://localhost:7070/getDoctorDetails");
  }

  getDoctorCateory(doctorId:number){
    return this.http.get<any>(`http://localhost:7070/doctorCategory/${doctorId}`);
  }
}
