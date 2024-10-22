import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocationService } from 'src/app/service/location.service';
import { TrajetService } from 'src/app/service/trajet.service';
import { VoitureService } from 'src/app/service/voiture.service';

@Component({
  selector: 'app-ajouter-offerlocation',
  templateUrl: './ajouter-offerlocation.component.html',
  styleUrls: ['./ajouter-offerlocation.component.css']
})
export class AjouterOfferlocationComponent {
  vehicles:any
  rentCarForm!: FormGroup;

  constructor(private fb: FormBuilder,private voitureService:VoitureService,private loctaionService:LocationService) {
   
  }
  ngOnInit(): void {
    this.voitureService.getVoitureByUser(1).subscribe((res) => {      
      this.vehicles = res.data;
      console.log(this.vehicles);
      
      
    })

    this.rentCarForm = this.fb.group({
      rental_date: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(1)]],
      duration: [null, [Validators.required, Validators.min(1)]],
      isAvailable: 1,
      vehicle_id: ['', Validators.required]
    });
  }

  

  isRentalDateVide() {
    return this.rentCarForm.get('rental_date')?.hasError('required') && this.rentCarForm.get('rental_date')?.touched;
  }

  isDescriptionVide() {
    return this.rentCarForm.get('description')?.hasError('required') && this.rentCarForm.get('description')?.touched;
  }

  isValidPrice() {
    return this.rentCarForm.get('price')?.hasError('min') && this.rentCarForm.get('price')?.touched;
  }

  isValidDuration() {
    return this.rentCarForm.get('duration')?.hasError('min') && this.rentCarForm.get('duration')?.touched;
  }

  isVehicleIdVide() {
    return this.rentCarForm.get('vehicle_id')?.hasError('required') && this.rentCarForm.get('vehicle_id')?.touched;
  }

  ajouterLocation() {
    console.log(this.rentCarForm.value);
    
    this.loctaionService.postLocation(this.rentCarForm.value).subscribe(res => {
      alert("rent offer added")
      
    })
  }
}

