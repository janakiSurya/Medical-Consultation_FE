import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthRoutingModule } from './auth-routing.module';
import { MainpageComponent } from './mainpage/mainpage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {ToastModule} from "primeng/toast";
import {DialogModule} from "primeng/dialog";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {ConfirmDialogModule} from "primeng/confirmdialog";

@NgModule({
  declarations: [
    AppComponent,
    MainpageComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AuthRoutingModule,
        BrowserAnimationsModule,
        TableModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        DialogModule,
        FormsModule,
        InputTextModule,
        ConfirmDialogModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
