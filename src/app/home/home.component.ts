import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from '@auth0/auth0-angular';
import {DatePipe, DOCUMENT} from '@angular/common';
import {HttpserviceService} from "../service/httpservice.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[ConfirmationService,MessageService]
})
export class HomeComponent implements OnInit{
   users:string|undefined;
   data:any[]=[];
  products:any[]=[];
  emailList:Array<string>=[];
  mobileList:Array<string>=[];
  display: boolean=false;
  displayUpdate: boolean=false;
  studentName: string| undefined;
  mobileNumber: string| undefined;
  email: string| undefined;
  course: string| undefined;
  dep: string| undefined;
  updateNo: string| undefined;
  updateCourse: string| undefined;
  updateDep: string| undefined;
  selectedData: any;
  username: string |undefined;
  pwd: string |undefined;
  reason: string | undefined;
  date:Date=new Date();
  constructor(public auth: AuthService,
              @Inject(DOCUMENT) private doc: Document,
              private confirmationService: ConfirmationService,
              private message:MessageService,
              private http:HttpserviceService,
              private router:Router,
              private httpclient:HttpClient) {
  }
  d:any;
  userdetails:string|undefined;

  async ngOnInit(): Promise<void> {
    await this.auth?.user$.subscribe(
      a => {
        console.log("sunb", a)
        this.users = a?.nickname;
        this.userdetails=a?.email;
        if(this.users){
          this.httpclient.get("https://r21z3kv2w8.execute-api.us-east-2.amazonaws.com/getonepatient/"+a?.email).subscribe(a=>{
            const as:any=a;
            if(as.Status=='false'){
              this.display=!this.display;
            }else{
              this.d=as.patient;
            }
          })
        }
      }
    )
    await this.http.getAllstudent().subscribe(a => {
      this.products = a;
      this.products.forEach(s=>{
        this.emailList.push(s.studentEmail);
        this.mobileList.push(s.mobile_number);
      })
      console.log("checking emailList :", this.emailList, "moblie ", this.mobileList);
      console.log("checking stud :", this.products);
    })
  }

  login(): void {
    this.auth.loginWithRedirect();
  }

  logout(): void {
    this.auth.logout({ returnTo: this.doc.location.origin });
  }

  save(){
    if(this.email&& this.mobileNumber&&this.studentName&& this.course&&this.dep){
      if(!this.emailList.includes(this.email) && !this.mobileList.includes(this.mobileNumber)){
       console.log("save")
        this.httpclient.post("https://r21z3kv2w8.execute-api.us-east-2.amazonaws.com/postStudent",{
          "mobile_number":this.mobileNumber ,
          "department": this.dep,
          "name": this.studentName,
          "course": this.course,
          "studentEmail":this.email
        }).subscribe(a=>{
          this.ngOnInit();
          this.email=undefined
          this.mobileNumber=undefined
          this.studentName=undefined
          this.course=undefined
          this.dep=undefined
          this.message.add({severity:'info', summary: 'Info', detail: 'Student Details are added'})
          this.display=!this.display;
        })
      }else {
        console.log("already save")
        this.message.add({severity:'error', summary: 'Error', detail: 'Entered details are duplicated'})
      }
    }else {
      console.log("enter all the details")
      this.message.add({severity:'error', summary: 'Error', detail: 'Please fill all fields'})
    }

  }


  // update(selected: any){
  //   this.selectedData=selected;
  //   console.log("check selected data :",this.selectedData);
  //   this.displayUpdate=!this.displayUpdate;
  // }
  savePost() {
    if (this.reason) {
      this.httpclient.post("https://r21z3kv2w8.execute-api.us-east-2.amazonaws.com/patientpost", {
        patientName: this.users,
        patientEmail: this.userdetails,
        patientReason: this.reason,
        status: "YTR",
        doctorName: "Not Assigned",
        admittedDate: this.getFormatedDate(this.date, "dd/MMM/YYYY"),
        returnDate: "Yet To Update"
      }).subscribe(a => {
        if (a) {
          this.d=a
          this.message.add({severity: 'info', summary: 'Info', detail: 'Updated'})
          this.display = !this.display;
        } else {
          this.message.add({severity: 'error', summary: 'Error', detail: 'Error in updation'})
        }
      })
    } else {
      this.message.add({severity: 'error', summary: 'Error', detail: 'Entered all the details'})
    }
  }

  getFormatedDate(date: Date, format: string) {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, format);
  }
  updateDetails() {
    if(this.updateCourse&& this.updateNo&&this.updateDep){
      if( !this.mobileList.includes(this.updateNo)){
        this.httpclient.patch("https://r21z3kv2w8.execute-api.us-east-2.amazonaws.com/updateStudent",{
          "mobile_number":this.updateNo ,
          "department": this.updateDep,
          "name": this.selectedData.name,
          "course": this.updateCourse,
          "studentEmail":this.selectedData.studentEmail
        }).subscribe(as=>{
          this.ngOnInit();
          this.updateCourse=undefined
          this.updateNo=undefined
          this.updateDep=undefined
          this.message.add({severity:'info', summary: 'Info', detail: 'Student Details are updated'})
          this.displayUpdate=!this.displayUpdate;
        })
      }else {
        console.log("already save")
        this.message.add({severity:'error', summary: 'Error', detail: 'Entered details are duplicated'})
      }
    }else {
      console.log("enter all the details")
      this.message.add({severity:'error', summary: 'Error', detail: 'Please fill all fields'})
    }

  }

  deleteuser(email:any){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to issue book ('+email+')',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.httpclient.delete("https://r21z3kv2w8.execute-api.us-east-2.amazonaws.com/delete/"+email).subscribe(a=>{
            if(a==1){
              this.message.add({severity:'error', summary: 'Error', detail: 'Request student details are deleted'})
            }
            this.ngOnInit();
            }
          )
      }
    });
  }

  adminlogin() {
      this.httpclient.get("https://r21z3kv2w8.execute-api.us-east-2.amazonaws.com/login/"+this.username+"/"+this.pwd).subscribe(a=>{
        console.log(a);
        const res:any=a;
        if(res.status=='true'){
          this.message.add({severity:'info', summary: 'Info', detail: 'Success'})
          this.http.user=res;
          this.router.navigate(['./admin']);
        }else {
          this.message.add({severity:'error', summary: 'Error', detail: 'Invalid User'})
        }
      })
  }
}
