import { Component, OnInit } from '@angular/core';
import { UserdetailService } from 'src/app/service/userdetail.service';

@Component({
  selector: 'app-profiluser',
  templateUrl: './profiluser.component.html',
  styleUrls: ['./profiluser.component.css']
})
export class ProfiluserComponent implements OnInit {
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
  
  activeSection: string = 'postes';

  constructor(private userdetailService: UserdetailService) {}

  ngOnInit(): void {
    const userId = localStorage.getItem("userId"); 
    if (userId) {
      this.userdetailService.getUserDetail(userId).subscribe({
        next: (data) => {
          this.userData = data?.data; 
          console.log(this.userData);
        },
        error: (err) => {
          console.error('Failed to fetch user details', err);
        }
      });
    } else {
      console.error('User ID not found in localStorage');
    }
  }
  
  setActiveSection(section: string, event: Event): void {
    event.preventDefault();
    this.activeSection = section;
  }
}
