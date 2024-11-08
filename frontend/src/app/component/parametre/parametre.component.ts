import { Component } from '@angular/core';
import { UserdetailService } from 'src/app/service/userdetail.service';

@Component({
  selector: 'app-parametre',
  templateUrl: './parametre.component.html',
  styleUrls: ['./parametre.component.css']
})
export class ParametreComponent {
  userData: { 
    userId: string, 
    username: string, 
    email: string, 
    firstName: string, 
    lastName: string, 
    gender: string, 
    birthdate: string, 
    phoneNumber: string, 
    city: string, 
    isSmoker: boolean 
  } | null = null;

  updatedData: { 
    firstName: string, 
    lastName: string, 
    gender: string, 
    phoneNumber: string, 
    city: string 
  } = {
    firstName: '',
    lastName: '',
    gender: '',
    phoneNumber: '',
    city: ''
  };

  constructor(private userdetailService: UserdetailService) {}

  ngOnInit(): void {
    this.userData = this.userdetailService.getUserDetail();
    if (this.userData) {
      this.updatedData.firstName = this.userData.firstName;
      this.updatedData.lastName = this.userData.lastName;
      this.updatedData.gender = this.userData.gender;
      this.updatedData.phoneNumber = this.userData.phoneNumber;
      this.updatedData.city = this.userData.city;
    }
  }
  //update
  updateProfile() {
    this.userdetailService.updateUser(this.updatedData).subscribe({
      next: (response) => {
        console.log('Utilisateur mis à jour avec succès!', response);
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour:', error);
      }
    });
  }
}
