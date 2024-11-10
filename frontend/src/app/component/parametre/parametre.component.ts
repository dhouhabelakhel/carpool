import { Component, OnInit } from '@angular/core';
import { UserdetailService } from 'src/app/service/userdetail.service';

@Component({
  selector: 'app-parametre',
  templateUrl: './parametre.component.html',
  styleUrls: ['./parametre.component.css']
})
export class ParametreComponent implements OnInit {
//data actuel
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

  //data updated
  updatedData: { 
    userId: string;
    email: string;
    gender: string;
    birthdate: string;
    firstName: string, 
    lastName: string, 
    username: string,
    isSmoker: boolean,
    phoneNumber: string, 
    city: string 
  } = {
    userId: '',  // Ajouter la valeur par défaut
    email: '',    // Ajouter la valeur par défaut
    gender: '',   // Ajouter la valeur par défaut
    birthdate: '', // Ajouter la valeur par défaut
    firstName: '',
    lastName: '',
    username: '',
    isSmoker: false,
    phoneNumber: '',
    city: ''
  };

  showSettingsForm = true;
//password
oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  confirmChangePassword: boolean = false;
  
  constructor(private userdetailService: UserdetailService) {}

  ngOnInit(): void {
    this.userData = this.userdetailService.getUserDetail();
    if (this.userData) {
      this.updatedData = { ...this.userData };
    }
  }

  showEditForm() {
    this.showSettingsForm = false;
  }

  saveChanges() {
    this.userdetailService.updateUser(this.updatedData).subscribe({
      next: (response) => {
        console.log('User updated successfully!', response);
        this.userData = { ...this.updatedData };
        this.showSettingsForm = true;
      },
      error: (error) => {
        console.error('Update error:', error);
      }
    });
  }
  formValid(): boolean {
    return this.newPassword === this.confirmPassword && this.newPassword.length > 0 && this.confirmChangePassword;
  }

  resetPassword(): void {
    if (this.formValid()) {
      this.userdetailService.updatePassword({
        oldPassword: this.oldPassword,
        newPassword: this.newPassword
      }).subscribe({
        next: (response) => {
          alert('Password updated successfully!');
          console.log('Response:', response); // Log la réponse pour vérifier la mise à jour
        },
        error: (error) => {
          alert('Error updating password: ' + error.message);
          console.error('Error:', error); // Log l'erreur pour plus de détails
        }
      });
    } else {
      alert('Please fill in all fields correctly.');
    }
  }
}
