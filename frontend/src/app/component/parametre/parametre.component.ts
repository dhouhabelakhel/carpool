import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/classes/user';
import { AuthService } from 'src/app/service/authentification.service';
import { UsersettingsService } from 'src/app/service/usersettings.service';

@Component({
  selector: 'app-parametre',
  templateUrl: './parametre.component.html',
  styleUrls: ['./parametre.component.css']
})
export class ParametreComponent implements OnInit{
//data actuel
userData: User = {
  name: '',
  first_name: '',
  username: '',
  email: '',
  password: '',
  birthdate: new Date(),
  phone_number: '',
  city: '',
  isSmoker: false,
  id: 0,
  gender: 'f'
};

showSettingsForm = true;

constructor(private authService: AuthService,private userService:UsersettingsService) {}

ngOnInit(): void {
  this.authService.getCurrentUser().subscribe((res)=>{
   this.userData=res.data;
  });
  console.log(this.userData);

 }

showEditForm() {
  this.showSettingsForm = false;
}
saveupdate() {
  if (this.userData && this.userData.id !== undefined) {
    const idup = this.userData.id.toString();

    this.userService.updateUser(idup, this.userData).subscribe({
      next: (res) => {
        console.log('User updated successfully:', res);
        this.showSettingsForm = true;
      },
      error: (err) => {
        console.error('Cannot update user:', err);
      }
    });
  } else {
    console.error('User data or ID is missing');
  }
}
}
