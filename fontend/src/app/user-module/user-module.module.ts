import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserModuleRoutingModule } from './user-module-routing.module';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { RentalOfferFormComponent } from './rental-offer-form/rental-offer-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UserMenuComponent,
    RentalOfferFormComponent
  ],
  imports: [
    CommonModule,
    UserModuleRoutingModule,
    ReactiveFormsModule
  ],
  exports:[
    UserMenuComponent,
    RentalOfferFormComponent
  ]
})
export class UserModuleModule { }
