import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { doctorcategory } from 'src/doctorcategory';
import { DoctorserviceService } from '../doctorservice.service';

@Component({
  selector: 'app-doctorcategory',
  templateUrl: './doctorcategory.component.html',
  styleUrls: ['./doctorcategory.component.css']
})
export class DoctorcategoryComponent implements OnInit {
  id:number;
  doccat1:doctorcategory;

  constructor(private activatedRoute:ActivatedRoute,private http:HttpClient,private ser:DoctorserviceService) { }

  ngOnInit(): void {
    let idparam=this.activatedRoute.snapshot.paramMap.get('id');
    this.id=idparam?+idparam:0;
    this.ser.getDoctorCateory(this.id).subscribe(
      data=>{
        this.doccat1=data;
      }
    );

  }

}
