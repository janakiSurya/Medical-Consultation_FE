import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {
  get user(): any {
    return this._user;
  }

  set user(value: any) {
    this._user = value;
  }

  constructor(private http:HttpClient) { }

  private _user:any;

  getAllstudent():Observable<any>{
    return this.http.get("https://r21z3kv2w8.execute-api.us-east-2.amazonaws.com/getPatient");
  }
  getPatient():Observable<any>{
    return this.http.get("https://r21z3kv2w8.execute-api.us-east-2.amazonaws.com/getPatient");
  }
}
