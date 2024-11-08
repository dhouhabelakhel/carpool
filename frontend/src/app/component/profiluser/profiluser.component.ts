import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/authentification.service';

@Component({
  selector: 'app-profiluser',
  templateUrl: './profiluser.component.html',
  styleUrls: ['./profiluser.component.css']
})
export class ProfiluserComponent implements OnInit {
  userData: any;
  activeSection: string = 'postes';
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.authService.getAllUser().subscribe(user => {
        this.userData = user;
      });
    }
  }
  setActiveSection(section: string): void {
    this.activeSection = section;
  }
}