import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TrajetService } from '../../service/trajet.service';
import { VoitureService } from 'src/app/service/voiture.service';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/service/authentification.service';

@Component({
  selector: 'app-ajouter-trajet',
  templateUrl: './ajouter-trajet.component.html',
  styleUrls: ['./ajouter-trajet.component.css']
})
export class AjouterTrajetComponent implements OnInit {
  trajetForm!:FormGroup ;
  vehicule:any;
  userId!:any
  constructor(private location: Location,private router:Router,
    private fb:FormBuilder,
    private trajetService:TrajetService,
    private voitureService:VoitureService,
  private authService:AuthService){

  }

   ngOnInit(): void {
    this.authService.getCurrentUser().subscribe((res) => {
      this.userId = res?.data?.id || null;
      this.initializeForm(); });
  }
  initializeForm(): void {
    console.log('userid', this.userId);
    this.trajetForm = this.fb.nonNullable.group({
      start_point: ['a', Validators.required],
      destination: ['', Validators.required],
      price: ['0', [Validators.required, Validators.min(0.1)]],
      places: ['0', [Validators.required, Validators.min(1), Validators.max(7)]],
       trip_date: ['', Validators.required],
        isSmokingAllowed: [1],
        starTime: ['', Validators.required], user_id: this.userId, });}
  ajouterTrajet(){
    console.log(this.trajetForm.value);
     this.trajetService.postTrajet(this.trajetForm.value).subscribe(res=>{
      console.log(res);

       alert("Offer Convoiturage added")


       //this.location.back();

     })

  }
  public get start(){
    return this.trajetForm?.get("start_point")
  }
  public get destination(){
    return this.trajetForm?.get("destination")
  }
  public get prix(){
    return this.trajetForm?.get("price")
  }
  public get nbPlace(){
    return this.trajetForm?.get("places")
  }
  public get date(){
    return this.trajetForm?.get("trip_date")
  }
  public get time(){
    return this.trajetForm?.get("starTime")
  }


  isDepartVide(){
    return this.start?.errors?.["required"] && this.start?.touched
  }
  isDestinationVide(){
    return this.destination?.errors?.["required"] && this.destination?.touched
  }
  isDateVide(){
    return this.date?.errors?.["required"] && this.date?.touched
  }
  isTimeVide(){
    return this.time?.errors?.["required"] && this.time?.touched
  }
  isValidprix(){
    return this.prix?.errors?.["min"] && this.prix?.touched
  }
  isValidnbPlace() {
    return (this.nbPlace?.errors?.["min"] || this.nbPlace?.errors?.["max"]) && this.nbPlace?.touched;
  }

}
