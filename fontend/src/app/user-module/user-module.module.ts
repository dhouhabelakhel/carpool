import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserModuleRoutingModule } from './user-module-routing.module';
import { UserMenuComponent } from './user-menu/user-menu.component';


@NgModule({
  declarations: [
    UserMenuComponent
  ],
  imports: [
    CommonModule,
    UserModuleRoutingModule
  ],
  exports:[
    UserMenuComponent
  ]
})
export class UserModuleModule { }
