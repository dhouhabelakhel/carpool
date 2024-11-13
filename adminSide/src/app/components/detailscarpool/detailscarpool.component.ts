import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarpoolService } from '../../services/carpool.service';

@Component({
  selector: 'app-detailscarpool',
  templateUrl: './detailscarpool.component.html',
  styleUrls: ['./detailscarpool.component.css']
})
export class DetailscarpoolComponent implements OnInit {
  tripOffer: any;  // Holds the trip offer data

  constructor(
    private router:Router,
    private route: ActivatedRoute,
    private carpoolService: CarpoolService  // Service to fetch trip offer
  ) {}

  ngOnInit(): void {
    const tripOfferId = this.route.snapshot.paramMap.get('id');  // Get the trip offer ID from the route
    if (tripOfferId) {
      this.fetchTripOfferDetails(Number(tripOfferId)); // Ensure tripOfferId is a number
    }
  }

  fetchTripOfferDetails(id: number): void {
    this.carpoolService.getTripbyid(id).subscribe(
      (data) => {
        this.tripOffer = data.data;  // Set the trip offer data
        console.log(this.tripOffer);
        
      },
      (error) => {
        console.error('Error fetching trip offer details', error);
      }
    );
  }
  onReturn(){
    this.router.navigate(['/carpool-offers'])
  }
}
