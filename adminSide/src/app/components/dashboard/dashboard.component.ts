import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  isProfileExpanded = false;
  admin:any;
  constructor(private authService:AuthService,private router:Router){

  }
  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(
      res=>{
        this.admin=res.data;
        console.log(this.admin);
        
      }
    )
  }
  // Toggle function for profile
  toggleProfile() {
    this.isProfileExpanded = !this.isProfileExpanded;
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);

  }
}
