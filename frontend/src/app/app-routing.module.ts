import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjouterTrajetComponent } from './component/ajouter-trajet/ajouter-trajet.component';
import { AjouterOfferlocationComponent } from './component/ajouter-offerlocation/ajouter-offerlocation.component';
import { AjouterVoitureComponent } from './component/ajouter-voiture/ajouter-voiture.component';
import { PageDacceuilComponent } from './component/page-dacceuil/page-dacceuil.component';
import { OfferlocationComponent } from './component/offerlocation/offerlocation.component';
import { OfferConvoiturageComponent } from './component/offer-convoiturage/offer-convoiturage.component';
import { ReserverConvoiturageComponent } from './component/reserver-convoiturage/reserver-convoiturage.component';

const routes: Routes = [
{  path: '', component: PageDacceuilComponent,children:[
  {path:'trajet/ajouter',component:AjouterTrajetComponent},
  {path:'location',component:OfferlocationComponent},
  {path:'location/ajouter',component:AjouterOfferlocationComponent},
  {path:'reserverConvoiturage/:id',component:ReserverConvoiturageComponent},
  {path:'trajet',component:OfferConvoiturageComponent},
  {path:'voiture',component:AjouterVoitureComponent},
  {path:'',redirectTo:'',pathMatch:'full'},
]}, 


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
