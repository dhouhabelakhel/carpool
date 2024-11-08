import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AjouterTrajetComponent } from './component/ajouter-trajet/ajouter-trajet.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import { AjouterOfferlocationComponent } from './component/ajouter-offerlocation/ajouter-offerlocation.component';
import { AjouterVoitureComponent } from './component/ajouter-voiture/ajouter-voiture.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { PageDacceuilComponent } from './component/page-dacceuil/page-dacceuil.component';
import { CommonModule } from '@angular/common'; // Importez CommonModule ici
import { OfferlocationComponent } from './component/offerlocation/offerlocation.component';
import { OfferConvoiturageComponent } from './component/offer-convoiturage/offer-convoiturage.component';
import { ReserverConvoiturageComponent } from './component/reserver-convoiturage/reserver-convoiturage.component';
import { LoginSignupComponent } from './component/login-signup/login-signup.component';
import { FooterComponent } from './component/footer/footer.component';
import { ProfiluserComponent } from './component/profiluser/profiluser.component';


@NgModule({
  declarations: [
    AppComponent,
    AjouterTrajetComponent,
    AjouterOfferlocationComponent,
    AjouterVoitureComponent,
    OfferlocationComponent,
    NavBarComponent,
    PageDacceuilComponent,
    OfferConvoiturageComponent,
    ReserverConvoiturageComponent,
    LoginSignupComponent,
    FooterComponent,
    ProfiluserComponent,    
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
