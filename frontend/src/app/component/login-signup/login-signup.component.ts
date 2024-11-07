
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/authentification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginSignupComponent {
  registerForm: FormGroup;
  loginForm: FormGroup;
  isActive = false;
  currentUser: { userId: string, username: string } | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router 
  ) {
    this.registerForm = this.fb.nonNullable.group({
      name: ['', Validators.required],
      first_name: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      city: ['', Validators.required],
      birthdate: ['', Validators.required],
      photo: [''],
      gender: ['', Validators.required],
      isSmoker: [false],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  toggle(isRegister: boolean) {
    this.isActive = isRegister;
  }

  onRegister() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value; 
      console.log('Register form data:', formData); 
      
      this.authService.register(formData).subscribe(
        (res) => {
          alert('Registration successful');
          console.log('User registered:', res);
        },
        (err) => {
          console.error('Registration error:', err);
          alert('Registration failed: ' + (err.error?.message || 'Unknown error occurred'));
        }
      );
    } else {
      alert('Please fill out the form correctly.');
    }
  }
  
  onLogin() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (response) => {
          if (response && response.token) { 
            console.log('Login successful', response);
            
            this.currentUser = this.authService.getCurrentUser();

            console.log('Current User Information:', this.currentUser);
            
            this.router.navigate(['']); 
          } else {
            alert('Invalid credentials, please try again.');
          }
        },
        (error) => {
          console.error('Login error', error);
          alert('Login failed: ' + (error.error?.message || 'Unknown error occurred'));
        }
      );
    } else {
      alert('Please fill out the form correctly.');
    }
  }
  

  // Validation helper methods
  isNameEmpty() {
    return this.registerForm.get('name')?.hasError('required') && this.registerForm.get('name')?.touched;
  }

  isFirstNameEmpty() {
    return this.registerForm.get('first_name')?.hasError('required') && this.registerForm.get('first_name')?.touched;
  }

  isUsernameInvalid() {
    const username = this.registerForm.get('username');
    return (username?.hasError('required') || username?.hasError('minlength')) && username?.touched;
  }

  isEmailInvalid(formType: 'register' | 'login') {
    const form = formType === 'register' ? this.registerForm : this.loginForm;
    const email = form.get('email');
    return (email?.hasError('required') || email?.hasError('email')) && email?.touched;
  }

  isPhoneNumberInvalid() {
    const phone = this.registerForm.get('phone_number');
    return (phone?.hasError('required') || phone?.hasError('pattern')) && phone?.touched;
  }

  isPasswordInvalid(formType: 'register' | 'login') {
    const form = formType === 'register' ? this.registerForm : this.loginForm;
    const password = form.get('password');
    return (password?.hasError('required') || password?.hasError('minlength')) && password?.touched;
  }
}
