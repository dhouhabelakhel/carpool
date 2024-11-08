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
    firstName: string, 
    lastName: string, 
    gender: string, 
    birthdate: string, 
    phoneNumber: string, 
    city: string, 
    isSmoker: boolean 
  } | null = null;
  activeSection: string = 'postes';

  constructor(private userdetailService: UserdetailService) {}

  ngOnInit(): void {
    this.userData = this.userdetailService.getUserDetail();
  }

  setActiveSection(section: string): void {
    this.activeSection = section;
  }
}
