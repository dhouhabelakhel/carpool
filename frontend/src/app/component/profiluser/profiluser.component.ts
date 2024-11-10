import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/classes/user';
import { AuthService } from 'src/app/service/authentification.service';

@Component({
  selector: 'app-profiluser',
  templateUrl: './profiluser.component.html',
  styleUrls: ['./profiluser.component.css']
})
export class ProfiluserComponent implements OnInit {
  userData!: User | null ;
  activeSection: string = 'postes';
    constructor(private authService: AuthService) {}

    ngOnInit(): void {
      this.authService.getCurrentUser().subscribe((res)=>{
       this.userData=res.data;
      });
      console.log(this.userData);
   
     }
  setActiveSection(section: string, event: Event): void {
    event.preventDefault();
    this.activeSection = section;
  }
}
