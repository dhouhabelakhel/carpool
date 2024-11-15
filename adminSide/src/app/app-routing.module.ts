import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarpooloffreComponent } from './components/carpooloffre/carpooloffre.component';
import { UsersComponent } from './components/users/users.component';
import { GerercompteComponent } from './components/gerercompte/gerercompte.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { EditcarpoolComponent } from './components/editcarpool/editcarpool.component';
import { DetailscarpoolComponent } from './components/detailscarpool/detailscarpool.component';
import { UserdetailsComponent } from './components/userdetails/userdetails.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  // Login page route
  { path: 'login', component: LoginComponent },

  // Dashboard route (with child routes)
  {
    path: 'dashboard', component: DashboardComponent, children: [
      // User management routes as child routes of dashboard
      { path: 'user-management', component: UsersComponent },
      { path: 'user-management/:id', component: EditUserComponent }, // Edit user
      { path: 'user-management/details/:id', component: UserdetailsComponent },

      // Carpool offers routes as child routes of dashboard
      { path: 'carpool-offers', component: CarpooloffreComponent },
      { path: 'carpool-offers/Edit/:id', component: EditcarpoolComponent },
      { path: 'carpool-offers/Details/:id', component: DetailscarpoolComponent },

      // Account management route as child of dashboard
      { path: 'account-management', component: GerercompteComponent },

      // Default redirect within dashboard to user management
      { path: '', redirectTo: 'user-management', pathMatch: 'full' }
    ]
  },

  // Default redirect to login page if no other route matches
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Wildcard route for handling unknown paths
  { path: '**', redirectTo: '/login' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
