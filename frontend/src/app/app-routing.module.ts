import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjouterTrajetComponent } from './component/ajouter-trajet/ajouter-trajet.component';
import { AjouterOfferlocationComponent } from './component/ajouter-offerlocation/ajouter-offerlocation.component';
import { AjouterVoitureComponent } from './component/ajouter-voiture/ajouter-voiture.component';
import { PageDacceuilComponent } from './component/page-dacceuil/page-dacceuil.component';
import { OfferlocationComponent } from './component/offerlocation/offerlocation.component';
import { OfferConvoiturageComponent } from './component/offer-convoiturage/offer-convoiturage.component';
import { ReserverConvoiturageComponent } from './component/reserver-convoiturage/reserver-convoiturage.component';
import { LoginSignupComponent } from './component/login-signup/login-signup.component';
import { ProfiluserComponent } from './component/profiluser/profiluser.component';
import { PageacceuillocationComponent } from './component/pageacceuillocation/pageacceuillocation.component';
import { PageacceuilcovoiturageComponent } from './component/pageacceuilcovoiturage/pageacceuilcovoiturage.component';

const routes: Routes = [

  {path:'login',component:LoginSignupComponent},

  {  
  path: '', component: PageDacceuilComponent,children:[
  {path:'trajet',component:AjouterTrajetComponent},
  {path:'location',component:OfferlocationComponent},
  {path:'location/ajouter',component:AjouterOfferlocationComponent},
  {path:'reserverConvoiturage/:id',component:ReserverConvoiturageComponent},
  {path:'covoiturage',component:OfferConvoiturageComponent},
  {path:'voiture',component:AjouterVoitureComponent},
  {path:'profil',component:ProfiluserComponent},
  {path:'acceuillocation',component:PageacceuillocationComponent},
  {path:'acceuilcovoiturage',component:PageacceuilcovoiturageComponent},
  {path:'',redirectTo:'',pathMatch:'full'},
]}, 


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
