import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private authService:AuthService,private router:Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // Get the form data
      const formData = this.loginForm.value;
  
      // Send login data to the backend via the authentication service
      this.authService.login(formData.email, formData.password).subscribe(
        (response: any) => {
          // On successful login, you can store the JWT token or redirect the user
          console.log('Login successful', response);
          localStorage.setItem('token', response.token); // Store token in localStorage for later use
          this.router.navigate(['/dashboard']); // Redirect to the admin dashboard (adjust as necessary)
        },
        (error: any) => {
          // On error, show the error message
          console.error('Login failed', error);
          alert('Login failed! Please check your credentials.');
        }
      );
    } else {
      console.log('Form is not valid');
      alert('Please fill in all fields correctly!');
    }
  }
  
}
