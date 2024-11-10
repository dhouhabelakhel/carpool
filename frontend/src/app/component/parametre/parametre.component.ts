import { Component, OnInit } from '@angular/core';
import { UserdetailService } from 'src/app/service/userdetail.service';

@Component({
  selector: 'app-parametre',
  templateUrl: './parametre.component.html',
  styleUrls: ['./parametre.component.css']
})
export class ParametreComponent implements OnInit {
  // Current data
  userData: { 
    userId: string, 
    username: string, 
    email: string, 
    first_name: string, 
    lastName: string, 
    gender: string, 
    birthdate: string, 
    phone_number: string, 
    city: string, 
    isSmoker: boolean 
  } | null = null;

  // Updated data
  updatedData: { 
    userId: string;
    email: string;
    gender: string;
    birthdate: string;
    first_name: string, 
    lastName: string, 
    username: string,
    isSmoker: boolean,
    phone_number: string, 
    city: string 
  } = {
    userId: '',
    email: '',
    gender: '',
    birthdate: '',
    first_name: '',
    lastName: '',
    username: '',
    isSmoker: false,
    phone_number: '',
    city: ''
  };

  showSettingsForm = true;

  // Password fields
  oldPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  confirmChangePassword: boolean = false;
  
  constructor(private userdetailService: UserdetailService) {}

  ngOnInit(): void {
    // Replace 'userId' with the actual ID of the user you want to retrieve
    const userId = 'your-user-id-here'; // Use the actual user ID here

    this.userdetailService.getUserDetail(userId).subscribe({
      next: (response) => {
        this.userData = response?.data; // Assuming backend response format `{ message: string, data: user }`
        if (this.userData) {
          this.updatedData = { ...this.userData };
        }
      },
      error: (err) => {
        console.error('Error fetching user data:', err);
      }
    });
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
          console.log('Response:', response);
        },
        error: (error) => {
          alert('Error updating password: ' + error.message);
          console.error('Error:', error);
        }
      });
    } else {
      alert('Please fill in all fields correctly.');
    }
  }
}
