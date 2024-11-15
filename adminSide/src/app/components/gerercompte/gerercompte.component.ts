import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; // Import FormGroup, FormBuilder, and Validators
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-gerercompte',
  templateUrl: './gerercompte.component.html',
  styleUrls: ['./gerercompte.component.css']
})
export class GerercompteComponent implements OnInit {
  adminForm: FormGroup;  // Define the form group to hold form controls
  admin: any = {}; // Store admin data

  constructor(private snackBar:MatSnackBar,private authService:AuthService, private fb: FormBuilder,private adminService:AdminService) {
    // Initialize the form with FormBuilder
    this.adminForm = this.fb.group({
      username: ['', Validators.required],    // Name field with required validation
      email: ['', [Validators.required, Validators.email]],  // Email field with required and email validation
      password: ['', Validators.minLength(6)],  // Password field with a minimum length validator
      confirmPassword: ['', Validators.minLength(6)]  // Confirm password field with a minimum length validator
    });
  }

  ngOnInit(): void {
    // Fetch admin data when component is initialized
    this.authService.getCurrentUser().subscribe(
      (res) => {
        this.admin = res.data;
        console.log(this.admin);
        
        // Populate the form with the fetched admin data
        this.adminForm.patchValue({
          username: this.admin.username,
          email: this.admin.email,
          // Not setting password and confirmPassword here for security reasons
        });
      },
      (err) => {
        console.error('Error fetching admin data', err);
      }
    );
  }

  // Method to handle form submission
  onSubmit(): void {
    if (this.adminForm.valid) {
      // Prepare the updated admin data for submission
      const updatedAdminData = {
        ...this.adminForm.value,  // Get form values
        id: this.admin.id  // Add the admin ID (you can dynamically pass the ID if needed)
      };

      // Call the update method from the AdminService
      this.adminService.updateadmin(this.admin.id, updatedAdminData).subscribe(
        (response) => {
          console.log('Admin account updated successfully!', response);
          this.snackBar.open('Admin updated successfully!', 'Close', {
            duration: 3000, // Duration in milliseconds
            verticalPosition: 'top', // Position from the top of the screen
            horizontalPosition: 'right', // Position from the left of the screen
            panelClass: ['custom-snackbar'], // Optionally add a custom class for further styling
          });
        },
        (error) => {
          console.error('Error updating admin account:', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
