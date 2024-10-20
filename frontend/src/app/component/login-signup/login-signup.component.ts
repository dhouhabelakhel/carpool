import { Component } from '@angular/core';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginSignupComponent {

  isActive = false;

  toggle(isRegister: boolean) {
    this.isActive = isRegister;
  }

}
