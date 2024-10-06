import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormControl} from '@angular/forms';

@Component({
  selector: 'app-rental-offer-form',
  templateUrl: './rental-offer-form.component.html',
  styleUrl: './rental-offer-form.component.css'
})
export class RentalOfferFormComponent implements OnInit {
  addRentalOffer!:FormGroup;
  constructor(private frmbl:FormBuilder){}
  ngOnInit(): void {
    this.addRentalOffer=this.frmbl.group({
      rental_date:['',[Validators.required]],
      description:['',[Validators.required,Validators.maxLength(100),Validators.minLength(10)]],
      price:['',[Validators.min(0),Validators.max(5000)]],
      start_date:['',[Validators.required]],
      duration:['',[Validators.required,Validators.pattern('^(?:100|[1-9][0-9]?)\[A-Za-z]+$')]],
      isAvailable:['',[Validators.required]],
      vehicle_id:['',[Validators.required]]
    })
    console.log(this.isInvalidDescription());
    console.log(this.Description);
    
    
  }
  get Description(){
    return this.addRentalOffer.get('description');
  }
  get price(){
    return this.addRentalOffer.get('price');
  }
  isInvalidDate(){
return true;
  }
  isInvalidDescription():Boolean{
return (this.Description?.errors?.['required']||this.Description?.errors?.['maxlength']||this.Description?.errors?.['minlength'] )&& this.Description?.dirty;
  }
  isInvalidPrice(){
return false
  }
  isInvalidDuration(){
    return true;

  }
  isInvalidStartDate(){
    return true;

  }
  addOffer(){
  
  }
}
