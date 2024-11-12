import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarpooloffreComponent } from './components/carpooloffre/carpooloffre.component';
import { UsersComponent } from './components/users/users.component';
import { GerercompteComponent } from './components/gerercompte/gerercompte.component';

const routes: Routes = [
  { path: 'user-management', component: UsersComponent },
  { path: 'carpool-offers', component: CarpooloffreComponent },
  { path: 'account-management', component: GerercompteComponent },
  { path: '', redirectTo: '/user-management', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/user-management' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
