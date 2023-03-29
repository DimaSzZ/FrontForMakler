import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ButtonComponent} from "./components/UI/button/button.component";
import {LoginComponent} from "./components/auth/login/login.component";
import {RegisterComponent} from "./components/auth/register/register.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AgGridModule} from "ag-grid-angular";
import { AdminpanelComponent } from './pages/adminpanel/adminpanel.component';
import { HomeComponent } from './components/admin/home/home.component';
import { CreatecsComponent } from './components/admin/cat-sub/createcs/createcs.component';
import { UpdatecsComponent } from './components/admin/cat-sub/updatecs/updatecs.component';
import { DeletecsComponent } from './components/admin/cat-sub/deletecs/deletecs.component';
import { CreatecComponent } from './components/admin/city/createc/createc.component';
import { DeletecComponent } from './components/admin/city/deletec/deletec.component';
import { UpdatecComponent } from './components/admin/city/updatec/updatec.component';
import { CreateComponent } from './components/admin/ads/create/create.component';
import { DeleteComponent } from './components/admin/ads/delete/delete.component';
import { UpdateComponent } from './components/admin/ads/update/update.component';
import { RouterModule} from "@angular/router";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {InterceptInterceptor} from "./token-interceptor/intercept.interceptor";
import {InputComponent} from "./components/UI/input/input.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import { SidepanelComponent } from './components/sidepanel/sidepanel.component';
import { SmallunitComponent } from './components/smallunit/smallunit.component';
import { BigunitComponent } from './components/bigunit/bigunit.component';


@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    ButtonComponent,
    LoginComponent,
    RegisterComponent,
    AdminpanelComponent,
    HomeComponent,
    CreatecsComponent,
    UpdatecsComponent,
    DeletecsComponent,
    CreatecComponent,
    DeletecComponent,
    UpdatecComponent,
    CreateComponent,
    DeleteComponent,
    UpdateComponent,
    SidepanelComponent,
    SmallunitComponent,
    BigunitComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AgGridModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: InterceptInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
