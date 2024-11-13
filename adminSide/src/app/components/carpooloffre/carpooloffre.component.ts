import { Component, OnInit } from '@angular/core';
import { CarpoolService } from '../../services/carpool.service';

@Component({
  selector: 'app-carpooloffre',
  templateUrl: './carpooloffre.component.html',
  styleUrl: './carpooloffre.component.css'
})
export class CarpooloffreComponent implements OnInit{
  carpool!:any[]
  constructor(private carpoolService:CarpoolService){}
  ngOnInit(): void {
    this.carpoolService.getAllTripOffers().subscribe(
      res=>{
      this.carpool=res.data
      console.log(this.carpool);
      
      }
    )
  
    
  }
  upComingTripsnb() {
    let nb = 0;
    const now = new Date();  // Get the current date and time
    const nowTime = now.getTime(); // Current time in milliseconds (for comparison)
  
    for (let c of this.carpool) {
      // Assuming trip_date is a full date string (e.g., "2024-11-14") and startTime is in "HH:mm" format (e.g., "09:22")
      const tripDate = new Date(c.trip_date);  // Convert trip_date to a Date object
      
      // Ensure startTime is in "HH:mm" format and append ":00" for seconds if missing
      const formattedStartTime = c.startTime.length === 5 ? `${c.startTime}:00` : c.startTime; // Ensure we have HH:mm:ss format
  
      // Combine trip_date and formattedStartTime into a single Date object
      const combinedDateTimeString = `${c.trip_date}T${formattedStartTime}`;  // Combine date and time
      const combinedDateTime = new Date(combinedDateTimeString); // Create Date object
  
      // Check if the combined Date object is valid
      if (isNaN(combinedDateTime.getTime())) {
        console.error("Invalid Date:", combinedDateTimeString);
        continue; // Skip this entry if the date is invalid
      }
  
      // Log for debugging
      console.log('Current Time:', nowTime);
      console.log('Combined DateTime String:', combinedDateTimeString);
      console.log('Combined DateTime:', combinedDateTime.getTime( ));
  
      // Check if the trip's date and time is before or equal to the current time
      if (combinedDateTime.getTime() > nowTime) {
        nb++;  // Increment the count for upcoming trips
      }
    }
  
    return nb;  // Return the number of upcoming trips
  }
    
  
  competedtrip() {
    let nb = 0;
    const now = new Date();  // Get the current date and time
    const nowTime = now.getTime(); // Current time in milliseconds (for comparison)
  
    for (let c of this.carpool) {
      // Assuming trip_date is a full date string (e.g., "2024-11-14") and startTime is in "HH:mm" format (e.g., "09:22")
      const tripDate = new Date(c.trip_date);  // Convert trip_date to a Date object
      
      // Ensure startTime is in "HH:mm" format and append ":00" for seconds if missing
      const formattedStartTime = c.startTime.length === 5 ? `${c.startTime}:00` : c.startTime; // Ensure we have HH:mm:ss format
  
      // Combine trip_date and formattedStartTime into a single Date object
      const combinedDateTimeString = `${c.trip_date}T${formattedStartTime}`;  // Combine date and time
      const combinedDateTime = new Date(combinedDateTimeString); // Create Date object
  
      // Check if the combined Date object is valid
      if (isNaN(combinedDateTime.getTime())) {
        console.error("Invalid Date:", combinedDateTimeString);
        continue; // Skip this entry if the date is invalid
      }
  
      // Log for debugging
      console.log('Current Time:', nowTime);
      console.log('Combined DateTime String:', combinedDateTimeString);
      console.log('Combined DateTime:', combinedDateTime.getTime( ));
  
      // Check if the trip's date and time is before or equal to the current time
      if (combinedDateTime.getTime() <= nowTime) {
        nb++;  // Increment the count for upcoming trips
      }

    }
    return nb
  }
  avgprix(){
    let sum=0;
    for(let car of this.carpool){
     sum=sum+car.price
    }
    return sum/this.carpool.length
  }
  deletecarpool(id:number){
this.carpoolService.deletebyid(id).subscribe(
  (res) => {
    console.log('User deleted successfully');
    // Update the users list by removing the deleted user
    this.carpool = this.carpool.filter(car => car.id !== id);
  },
  (err) => {
    console.log('Error deleting user', err);
  }
)
  }  
  

}
