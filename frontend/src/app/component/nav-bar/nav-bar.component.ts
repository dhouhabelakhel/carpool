
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
  currentUser!: User | null ;
  dropdownOpen = false;
  constructor(private authService : AuthService,private router : Router){}

  ngOnInit(): void {
   this.authService.getCurrentUser().subscribe((res)=>{
    this.currentUser=res.data;
   });
   console.log(this.currentUser);

  }
  navigateToLogin() {
    this.router.navigate(['/login']);
  }
  logoutUser(){
    this.router.navigate(['/login']);
    this.authService.logout();
  }
  toggleDropdown(event: MouseEvent): void {
    this.dropdownOpen = !this.dropdownOpen; 
    event.stopPropagation(); 
}

}
