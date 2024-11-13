import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  isProfileExpanded = false;

  // Toggle function for profile
  toggleProfile() {
    this.isProfileExpanded = !this.isProfileExpanded;
  }
}
