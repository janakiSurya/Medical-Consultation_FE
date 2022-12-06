import { Component, OnInit } from '@angular/core';
import { doctorcategory } from 'src/doctorcategory';
import { doctorDetails } from 'src/doctorDetails';
import { DoctorserviceService } from '../doctorservice.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {

  doctordet:doctorDetails;
  doctorcat:doctorcategory[]=[];

  constructor(public service: DoctorserviceService) { }

  ngOnInit(): void {
    this.doctordet=new doctorDetails();
  }

  getDoctorDetails():void{
     this.service.getDoctorDetails().subscribe(
      data=>this.doctorcat=data
      );
    
  }

}
