import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserModuleModule } from './user-module/user-module.module';
import { Vehcile } from './shared/classes/vehcile';
import { VehicleServiceService } from './shared/services/vehicle.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,UserModuleModule,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',

})
export class AppComponent {

  title = 'carpool';

}
