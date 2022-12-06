import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { doctorcategory } from 'src/doctorcategory';
import { DoctorComponent } from './doctor/doctor.component';
import { DoctorcategoryComponent } from './doctor/doctorcategory.component';

const routes: Routes = [
  {
    path: 'doctor',
    component: DoctorComponent
  },
  {
    path:'doctorcategory/:id',
    component:DoctorcategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
