import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocationService } from 'src/app/service/location.service';
import { TrajetService } from 'src/app/service/trajet.service';

@Component({
  selector: 'app-ajouter-offerlocation',
  templateUrl: './ajouter-offerlocation.component.html',
  styleUrls: ['./ajouter-offerlocation.component.css']
})
export class AjouterOfferlocationComponent {
  locationForm!:FormGroup ;
  constructor(private router:Router,private fb:FormBuilder,private locationService:LocationService){}
  ngOnInit(): void {
    
    this.locationForm=this.fb.nonNullable.group({
      start:['',Validators.required],
      destination:['',Validators.required],
      datetime:['',Validators.required],
    })
  }
  ajouterOffer(){
    console.log(this.locationForm.value);
    // this.locationService.postLocation(this.trajetForm.value).subscribe(res=>{
    //   alert("trajet Ajouter")
     
    // })
    
  }
}
