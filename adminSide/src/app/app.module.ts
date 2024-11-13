import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/users/users.component';
import { CarpooloffreComponent } from './components/carpooloffre/carpooloffre.component';
import { GerercompteComponent } from './components/gerercompte/gerercompte.component';
import { HttpClientModule } from '@angular/common/http';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  EditcarpoolComponent } from './components/editcarpool/editcarpool.component';
import { RouterModule } from '@angular/router';
import { DetailscarpoolComponent } from './components/detailscarpool/detailscarpool.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UsersComponent,
    CarpooloffreComponent,
    GerercompteComponent,
    EditUserComponent,

    EditcarpoolComponent,
      DetailscarpoolComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
