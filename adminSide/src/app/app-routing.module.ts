import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarpooloffreComponent } from './components/carpooloffre/carpooloffre.component';
import { UsersComponent } from './components/users/users.component';
import { GerercompteComponent } from './components/gerercompte/gerercompte.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { EditcarpoolComponent } from './components/editcarpool/editcarpool.component';

const routes: Routes = [

  { path: 'user-management', component: UsersComponent },
  { path: 'user-management/:id', component: EditUserComponent },  // The route for editing user
  { path: 'carpool-offers', component: CarpooloffreComponent },
  { path: 'carpool-offers/:id', component: EditcarpoolComponent },
  { path: 'account-management', component: GerercompteComponent },
  { path: '', redirectTo: '/user-management', pathMatch: 'full' },
  { path: '**', redirectTo: '/user-management' }
];
  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
