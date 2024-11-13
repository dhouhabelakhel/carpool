import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  isProfileExpanded = false;
  admin:any;
  constructor( private adminService:AdminService){

  }
  ngOnInit(): void {
    this.adminService.getadminbyid(3).subscribe(
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
}
