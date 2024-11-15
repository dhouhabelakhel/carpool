import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CarpoolService } from '../../services/carpool.service';
import { ReservationService } from '../../services/reservation.service';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrl: './userdetails.component.css'
})
export class UserdetailsComponent implements OnInit{
  currentTab: string = 'details'; // Default tab
  user:any;
  userId!:number;
  offers!:any[]
  reservations!:any[]
  constructor(private router:Router,private reservationService:ReservationService, private carpoolService:CarpoolService,private userService:UserService, private route:ActivatedRoute){

  }
  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getUserById(this.userId).subscribe(
      res=>{
         this.user=res.data
         console.log(this.user)
      }
    )
    this.carpoolService.getUserOffers(this.userId).subscribe(
      res=>{
        this.offers=res.data
        console.log(this.offers);
        
      }
    )
    this.reservationService.getreservationbyUser(this.userId).subscribe(
      res=>{
        this.reservations=res.data
        console.log(this.reservations);
        
      }
    )
  
    
    
    
  }
 gettripformreservation(id:any){
   const info={
    destination:"",
    start_point:"",
   }
  this.carpoolService.getTripbyid(id).subscribe(
    res=>{
      info.destination= res.data.destination;
      info.start_point=res.data.start_point
    }
  )
  return info
 }

  // Method to change the current tab
  setCurrentTab(tab: string) {
    this.currentTab = tab;
  }
  isOfferComplete(offer: any): boolean {
    const currentDate = new Date();
    const tripDate = new Date(offer.trip_date + 'T' + offer.startTime); // Combining date and time
    
    return tripDate < currentDate; // True if trip date is in the past
  }
  navigateToUserManagement() {
    this.router.navigate(['/dashboard/user-management']);
  }
}
