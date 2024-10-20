import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TrajetService } from '../../service/trajet.service';
import { VoitureService } from 'src/app/service/voiture.service';

@Component({
  selector: 'app-ajouter-trajet',
  templateUrl: './ajouter-trajet.component.html',
  styleUrls: ['./ajouter-trajet.component.css']
})
export class AjouterTrajetComponent {
  trajetForm!:FormGroup ;
  vehicule:any;
  constructor(private router:Router,private fb:FormBuilder,private trajetService:TrajetService,private voitureService:VoitureService){}
  ngOnInit(): void {
    this.voitureService.getVoitureByUser(1).subscribe((res) => {
      this.vehicule = res.data
    })
    
    this.trajetForm=this.fb.nonNullable.group({
      start:['',Validators.required],
      destination:['',Validators.required],
      idVoiture:['',Validators.required],
      prix:['0',[Validators.required,Validators.min(0.1)]],
      nbPlace:['0',[Validators.required,Validators.min(1),Validators.max(7)]],
      datetime:['',Validators.required],

    })
  }
  ajouterTrajet(){
    console.log(this.trajetForm.value);
    // this.trajetService.postTrajet(this.trajetForm.value).subscribe(res=>{
    //   alert("trajet Ajouter")
     
    // })
    
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
  public get datetime(){
    return this.trajetForm.get("datetime")
  }
 

  isDepartVide(){
    return this.start?.errors?.["required"] && this.start?.touched
  }
  isDestinationVide(){
    return this.destination?.errors?.["required"] && this.destination?.touched
  }
  isDateVide(){
    return this.datetime?.errors?.["required"] && this.datetime?.touched
  }
  isValidprix(){
    return this.prix?.errors?.["min"] && this.prix?.touched
  }
  isValidnbPlace() {
    return (this.nbPlace?.errors?.["min"] || this.nbPlace?.errors?.["max"]) && this.nbPlace?.touched;
  }
  
}
