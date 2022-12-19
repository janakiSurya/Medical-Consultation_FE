import { Component, OnInit } from '@angular/core';
import {HttpserviceService} from "../service/httpservice.service";
import {HttpClient} from "@angular/common/http";
import {DatePipe} from "@angular/common";
import {ConfirmationService, MessageService} from "primeng/api";

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css'],
  providers:[ConfirmationService,MessageService,DatePipe]
})
export class MainpageComponent implements OnInit {

  constructor(private http:HttpserviceService,private datePipe:DatePipe,private httpClient:HttpClient,private confirmationService: ConfirmationService,
              private message:MessageService) { }
  users:string|undefined
  sessionUser:any;
data:any[]=[];
  display: boolean=false;
  reason: string|undefined;
  selectedValue:any ;
  date:Date=new Date();
  ngOnInit(): void {
    this.sessionUser=this.http.user;
    this.users=this.sessionUser.userDetail.applicantName;
    this.http.getPatient().subscribe(a=>{
      this.data=a;
      console.log(this.data)
    })
  }

  openupdate(d: any) {
    this.selectedValue= d;
    this.display=!this.display;
  }
  getFormatedDate(date: Date, format: string) {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, format);
  }

  update(){
    if(this.reason){
      this.httpClient.patch("https://r21z3kv2w8.execute-api.us-east-2.amazonaws.com/updateTreatment",{
        id :this.selectedValue.id,
        patientName:this.selectedValue.patientName ,
        patientEmail: this.selectedValue.patientEmail,
        patientReason: this.reason,
        status: "Updated",
        doctorName: this.users,
        admittedDate: this.getFormatedDate(this.date,"dd/MMM/YYYY"),
        returnDate: this.getFormatedDate(this.date,"dd/MMM/YYYY")
      }).subscribe(a=>{
        if(a==1){
          this.message.add({severity:'info', summary: 'Info', detail: 'Updated'})
          this.display=!this.display;
          this.ngOnInit();
        }else{
          this.message.add({severity:'error', summary: 'Error', detail: 'Error in updation'})
        }
      })
    }else{
      this.message.add({severity:'error', summary: 'Error', detail: 'Entered all the details'})
    }
  }

  delete(email:any){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to issue book ('+email+')',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.httpClient.delete("https://r21z3kv2w8.execute-api.us-east-2.amazonaws.com/deletepatient/"+email).subscribe(a=>{
            if(a==1){
              this.message.add({severity:'error', summary: 'Error', detail: 'Request student details are deleted'})
            }
            this.ngOnInit();
          }
        )
      }
    });
  }
}
