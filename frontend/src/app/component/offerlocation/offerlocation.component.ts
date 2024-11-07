import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LocationService } from 'src/app/service/location.service';

@Component({
  selector: 'app-offerlocation',
  templateUrl: './offerlocation.component.html',
  styleUrls: ['./offerlocation.component.css']
})
export class OfferlocationComponent implements OnInit{
      offerLocations:any;
   
      filtreForm!: FormGroup;

      constructor(private locationService:LocationService,private fb: FormBuilder){
        this.filtreForm = this.fb.nonNullable.group({
          price:0,
          rental_date:'',
          model:''


          
        })

      }
        ngOnInit(): void {
          this.locationService.getAllLocation(this.filtreForm.value).subscribe(res=>{
            console.log(res);
            this.offerLocations=res.data;
            console.log(this.offerLocations);
            
          })
        }
      filtrer() {
        this.locationService.getAllLocation(this.filtreForm.value).subscribe(res=>{
          console.log(this.filtreForm.value);
          this.offerLocations=res.data;
          console.log(this.offerLocations);
          
        })
      } 
      public get price(){
        return this.filtreForm.get("price")?.value;
      }
  }
