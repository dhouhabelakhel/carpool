import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjouterTrajetComponent } from './component/ajouter-trajet/ajouter-trajet.component';
import { AjouterOfferlocationComponent } from './component/ajouter-offerlocation/ajouter-offerlocation.component';
import { AjouterVoitureComponent } from './component/ajouter-voiture/ajouter-voiture.component';
import { PageDacceuilComponent } from './component/page-dacceuil/page-dacceuil.component';

const routes: Routes = [
{  path: '', component: PageDacceuilComponent,children:[
  {path:'trajet',component:AjouterTrajetComponent},
  {path:'location',component:AjouterOfferlocationComponent},
  {path:'voiture',component:AjouterVoitureComponent},
  {path:'',redirectTo:'',pathMatch:'full'},
]}, 


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
