import { Component } from '@angular/core';
import { UserdetailService } from 'src/app/service/userdetail.service';

@Component({
  selector: 'app-parametre',
  templateUrl: './parametre.component.html',
  styleUrls: ['./parametre.component.css']
})
export class ParametreComponent {
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
  constructor(private userdetailService: UserdetailService) {}

  ngOnInit(): void {
    this.userData = this.userdetailService.getUserDetail();
  }
  linkAccount() {
    alert("Lien de compte avec KAYAK en cours.");
}

}
