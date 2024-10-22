import { Component } from '@angular/core';
import { LocationService } from 'src/app/service/location.service';
import { TrajetService } from 'src/app/service/trajet.service';

@Component({
  selector: 'app-offer-convoiturage',
  templateUrl: './offer-convoiturage.component.html',
  styleUrls: ['./offer-convoiturage.component.css']
})
export class OfferConvoiturageComponent {
  offerLocations:any;
  price: number = 225;

  constructor(private trajetService:TrajetService){

  }
    ngOnInit(): void {
      this.trajetService.getAllTripOffers().subscribe(res=>{
        console.log(res);
        this.offerLocations=res.data;
        this
        console.log(this.offerLocations);
        
      })
    }
    
}
