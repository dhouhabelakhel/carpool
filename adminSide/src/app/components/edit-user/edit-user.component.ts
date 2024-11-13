import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../classes/user';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  isEditing: boolean = true;
  editUserForm: FormGroup;
  user: User | undefined;
  loading = true; // To show a loading spinner until user data is loaded
  errorMessage: string | null = null; // To handle errors when the user is not found
  successMessage: string | null = null; // Success message after updating user

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.editUserForm = this.fb.group({
      first_name: ['', Validators.required],
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', Validators.required],
      city: [''],
      birthdate: ['', Validators.required],
      Gender: ['', Validators.required],
      isSmoker: [false]
    });
  }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.userService.getUserById(Number(userId)).subscribe(
        (response) => {
          this.loading = false;
          if (response && response.data) {
            this.user = response.data;
            const formattedBirthdate = this.user?.birthdate
              ? new Date(this.user?.birthdate).toISOString().split('T')[0] // Formatting for the form
              : null;
  
            this.editUserForm.patchValue({
              first_name: this.user?.first_name,
              name: this.user?.name,
              username: this.user?.username,
              email: this.user?.email,
              phone_number: this.user?.phone_number,
              city: this.user?.city,
              birthdate: formattedBirthdate,
              Gender: this.user?.Gender,
              isSmoker: this.user?.isSmoker,
            });
          } else {
            this.errorMessage = "User not found";
          }
        },
        (error) => {
          this.loading = false;
          this.errorMessage = "Failed to load user data";
          console.error('Error fetching user:', error);
        }
      );
    } else {
      this.loading = false;
      this.errorMessage = "Invalid User ID";
    }
  }

  onSubmit(): void {
    if (this.editUserForm.invalid) {
      return; // Prevent form submission if invalid
    }

    // Prepare user data excluding password
    const updatedUser = {
      id: this.user?.id ?? 0,
      first_name: this.editUserForm.value.first_name,
      name: this.editUserForm.value.name,
      username: this.editUserForm.value.username,
      email: this.editUserForm.value.email,
      phone_number: this.editUserForm.value.phone_number,
      city: this.editUserForm.value.city,
      birthdate: this.editUserForm.value.birthdate,
      Gender: this.editUserForm.value.Gender,
      isSmoker: this.editUserForm.value.isSmoker,
    };

    // Update user data through the service
    this.userService.updateUser(this.user?.id as number, updatedUser).subscribe(
      (response) => {
        this.successMessage = "User updated successfully!";
        console.log('User updated successfully', response);
        this.router.navigate(['/user-list']);
      },
      (error) => {
        this.errorMessage = error.message || "Failed to update user";
        console.error('Error updating user:', error);
      }
    );
  }
}
