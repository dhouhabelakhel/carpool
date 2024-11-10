
import { Component,OnInit } from '@angular/core';
import { User } from 'src/app/classes/user';
import { AuthService } from 'src/app/service/authentification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  currentUser: { 
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

  dropdownOpen = false;
  constructor(private authService : AuthService,private router : Router){}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    console.log(this.currentUser); 
  }

    toggleDropdown(event: MouseEvent): void {
        this.dropdownOpen = !this.dropdownOpen; 
        event.stopPropagation(); 
    }
  navigateToLogin() {
    this.router.navigate(['/login']);
  }
  logoutUser(){
    this.router.navigate(['/login']);
    this.authService.logout();
  }


}
