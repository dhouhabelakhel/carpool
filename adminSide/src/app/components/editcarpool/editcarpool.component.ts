import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarpoolService } from '../../services/carpool.service';  // Adjust import path if needed
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-editcarpool',
  templateUrl: './editcarpool.component.html',  // Ensure path is correct
  styleUrls: ['./editcarpool.component.css']  // Corrected to styleUrls
})
export class EditcarpoolComponent implements OnInit {
  editTripOfferForm!: FormGroup;
  tripOfferId!: number;

  constructor(
    private snackBar:MatSnackBar,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private carpoolService: CarpoolService  // Service to handle API calls
  ) {}

  ngOnInit(): void {
    // Get trip offer ID from route params
    this.tripOfferId = Number(this.route.snapshot.paramMap.get('id'));
    
    // Initialize the form with default values or empty values
    this.editTripOfferForm = this.fb.group({
      start_point: ['', [Validators.required]],
      destination: ['', [Validators.required]],
      trip_date: ['', [Validators.required]],
      startTime: ['', []],
      price: ['', [Validators.required, Validators.min(0)]],
      places: ['', [Validators.required, Validators.min(1)]],
      isSmokingAllowed: [false, [Validators.required]],
      user_id: ['', [Validators.required]] // Assuming user_id is required
    });

    // Fetch the existing trip offer details and populate the form
    this.fetchTripOffer();
  }

  // Fetch trip offer details from service
  fetchTripOffer(): void {
    this.carpoolService.getTripbyid(this.tripOfferId).subscribe(
      (response) => {
  
        
        if (response.data) {
          
          const tripOffer = response.data;
          this.editTripOfferForm.patchValue({
            start_point: tripOffer.start_point,
            destination: tripOffer.destination,
            trip_date: tripOffer.trip_date,
            startTime: tripOffer.startTime,
            price: tripOffer.price,
            places: tripOffer.places,
            isSmokingAllowed: tripOffer.isSmokingAllowed,
            user_id: tripOffer.user_id
          });
        }
      },
      (error) => {
        console.error('Error fetching trip offer:', error);
      }
    );
  }

  // Submit form data
  onSubmit(): void {
    if (this.editTripOfferForm.valid) {
      this.carpoolService.updateTrajet(this.tripOfferId, this.editTripOfferForm.value).subscribe(
        
          (res) => {
            this.snackBar.open('Trip offer updated successfully!', 'Close', {
              duration: 3000, // Duration in milliseconds
              verticalPosition: 'top', // Position from the top of the screen
              horizontalPosition: 'right', // Position from the left of the screen
              panelClass: ['custom-snackbar'], // Optionally add a custom class for further styling
            });
         
          this.router.navigate(['/dashboard/carpool-offers']); // Navigate to the list of trip offers
        },
        (error) => {
          console.error('Error updating trip offer:', error);
          this.snackBar.open('Failed to update trip offer!', 'Close', {
            duration: 3000, // Duration in milliseconds
            verticalPosition: 'top', // Position from the top of the screen
            horizontalPosition: 'right', // Position from the left of the screen
            panelClass: ['custom-snackbar'], // Optionally add a custom class for further styling
          });
        }
      
      )
    
    } else {
      this.snackBar.open('Please fill in all required fields.', 'Close', {
        duration: 3000, // Duration in milliseconds
        verticalPosition: 'top', // Position from the top of the screen
        horizontalPosition: 'right', // Position from the left of the screen
        panelClass: ['custom-snackbar'], // Optionally add a custom class for further styling
      });
     
    }
  }
}
