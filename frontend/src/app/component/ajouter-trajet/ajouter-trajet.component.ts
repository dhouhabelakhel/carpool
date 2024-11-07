import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TrajetService } from '../../service/trajet.service';
import { VoitureService } from 'src/app/service/voiture.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ajouter-trajet',
  templateUrl: './ajouter-trajet.component.html',
  styleUrls: ['./ajouter-trajet.component.css']
})
export class AjouterTrajetComponent {
  trajetForm!:FormGroup ;
  vehicule:any;
  constructor(private location: Location,private router:Router,private fb:FormBuilder,private trajetService:TrajetService,private voitureService:VoitureService){}
  ngOnInit(): void {
    this.voitureService.getVoitureByUser(1).subscribe((res) => {
      this.vehicule = res.data
    })
    
    this.trajetForm=this.fb.nonNullable.group({
      start:['',Validators.required],
      destination:['',Validators.required],
      price:['0',[Validators.required,Validators.min(0.1)]],
      places:['0',[Validators.required,Validators.min(1),Validators.max(7)]],
      trip_date:['',Validators.required],
      time:['',Validators.required],
      user_id:1,

    })
  }
  ajouterTrajet(){
    console.log(this.trajetForm.value);
     this.trajetService.postTrajet(this.trajetForm.value).subscribe(res=>{
       alert("Offer Convoiturage added")
       this.location.back();
     
     })
    
  }
  public get start(){
    return this.trajetForm.get("start")
  }
  public get destination(){
    return this.trajetForm.get("destination")
  }
  public get prix(){
    return this.trajetForm.get("prix")
  }
  public get nbPlace(){
    return this.trajetForm.get("nbPlace")
  }
  public get date(){
    return this.trajetForm.get("date")
  }
  public get time(){
    return this.trajetForm.get("time")
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
