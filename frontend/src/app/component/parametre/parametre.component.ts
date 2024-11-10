import { Component, OnInit } from '@angular/core';
import { UserdetailService } from 'src/app/service/userdetail.service';

@Component({
  selector: 'app-parametre',
  templateUrl: './parametre.component.html',
  styleUrls: ['./parametre.component.css']
})
export class ParametreComponent implements OnInit {
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
    username: string,
    isSmoker: boolean,
    phoneNumber: string, 
    city: string 
  } = {
    firstName: '',
    lastName: '',
    username: '',
    isSmoker: false,
    phoneNumber: '',
    city: ''
  };
  showSettingsForm = true;

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
      this.userData = this.userdetailService.getUserDetail(); 
      this.showSettingsForm = true;
    },
    error: (error) => {
      console.error('Update error:', error);
    }
  });
}
}
