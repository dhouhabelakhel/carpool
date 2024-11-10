import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TrajetService } from '../../service/trajet.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ajouter-trajet',
  templateUrl: './ajouter-trajet.component.html',
  styleUrls: ['./ajouter-trajet.component.css']
})
export class AjouterTrajetComponent implements OnInit {
  trajetForm!: FormGroup;
  vehicule: any;

  constructor(
    private location: Location,
    private router: Router,
    private fb: FormBuilder,
    private trajetService: TrajetService
  ) {}

  ngOnInit(): void {
    this.trajetForm = this.fb.nonNullable.group({
      start_point: ['', Validators.required],
      destination: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0.1)]],
      places: [0, [Validators.required, Validators.min(1), Validators.max(7)]],
      trip_date: ['', Validators.required],
      start_time: ['', Validators.required],
      user_id: 1  
    });
  }

  ajouterTrajet() {
    console.log(this.trajetForm.value);  
    this.trajetService.postTrajet(this.trajetForm.value).subscribe(
      res => {
        alert("Offer Convoiturage added");
        this.location.back();
      },
      error => {
        console.error("Erreur lors de l'ajout de l'offre:", error);
        alert("Erreur lors de l'ajout de l'offre.");
      }
    );
  }
  

  // Méthodes de validation
  isDepartVide() {
    return this.trajetForm.get('start_point')?.errors?.['required'] && this.trajetForm.get('start_point')?.touched;
  }
  isDestinationVide() {
    return this.trajetForm.get('destination')?.errors?.['required'] && this.trajetForm.get('destination')?.touched;
  }
  isDateVide() {
    return this.trajetForm.get('trip_date')?.errors?.['required'] && this.trajetForm.get('trip_date')?.touched;
  }
  isTimeVide() {
    return this.trajetForm.get('start_time')?.errors?.['required'] && this.trajetForm.get('start_time')?.touched;
  }
  isValidprix() {
    return this.trajetForm.get('price')?.errors?.['min'] && this.trajetForm.get('price')?.touched;
  }
  isValidnbPlace() {
    return (
      (this.trajetForm.get('places')?.errors?.['min'] || this.trajetForm.get('places')?.errors?.['max']) &&
      this.trajetForm.get('places')?.touched
    );
  }
}
