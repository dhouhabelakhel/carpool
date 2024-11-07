import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LocationService } from 'src/app/service/location.service';
import { TrajetService } from 'src/app/service/trajet.service';

@Component({
  selector: 'app-offer-convoiturage',
  templateUrl: './offer-convoiturage.component.html',
  styleUrls: ['./offer-convoiturage.component.css']
})
export class OfferConvoiturageComponent {
  offerLocations:any;
  filtreForm!: FormGroup;

  constructor(private trajetService:TrajetService,private fb: FormBuilder){
    this.filtreForm = this.fb.group({
      price:0,
      date:'',
      start_point:'',
      destination:''
    })
  }
    ngOnInit(): void {
      this.trajetService.getAllTripOffers(this.filtreForm.value).subscribe(res=>{
        console.log("trips",res);
        if(res.data)
          this.offerLocations=res.data;
        else
        this.offerLocations=[]

        console.log(this.offerLocations);

      })
    }
    filtrer(){
      this.trajetService.getAllTripOffers(this.filtreForm.value).subscribe(res=>{
        if(res.data)
        this.offerLocations=res.data;
      else
        this.offerLocations=[]
      })
    }
      public get price(){
        return this.filtreForm.get("price")?.value;
      }
}
