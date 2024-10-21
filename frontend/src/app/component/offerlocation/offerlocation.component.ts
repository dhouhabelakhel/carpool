import { Component, OnInit } from '@angular/core';
import { LocationService } from 'src/app/service/location.service';

@Component({
  selector: 'app-offerlocation',
  templateUrl: './offerlocation.component.html',
  styleUrls: ['./offerlocation.component.css']
})
export class OfferlocationComponent implements OnInit{
      offerLocations:any;
      price: number = 225;
      constructor(private locationService:LocationService){

      }
        ngOnInit(): void {
          this.locationService.getAllLocation().subscribe(res=>{
            console.log(res);
            this.offerLocations=res.data;
            console.log(this.offerLocations);
            
          })
        }
      recherche() {
        this.locationService.getAllLocation().subscribe(res=>{
          console.log(res);
          this.offerLocations=res.data;
          console.log(this.offerLocations);
          
        })
      } 
     
  }
