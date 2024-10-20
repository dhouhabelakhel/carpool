import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AjouterTrajetComponent } from './component/ajouter-trajet/ajouter-trajet.component';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import { AjouterOfferlocationComponent } from './component/ajouter-offerlocation/ajouter-offerlocation.component';
import { AjouterVoitureComponent } from './component/ajouter-voiture/ajouter-voiture.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { PageDacceuilComponent } from './component/page-dacceuil/page-dacceuil.component';
import { FooterComponent } from './component/footer/footer.component';
import { LoginSignupComponent } from './component/login-signup/login-signup.component';

@NgModule({
  declarations: [
    AppComponent,
    AjouterTrajetComponent,
    AjouterOfferlocationComponent,
    AjouterVoitureComponent,
    NavBarComponent,
    PageDacceuilComponent,
    FooterComponent,
    LoginSignupComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
