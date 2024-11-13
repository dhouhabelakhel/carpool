import { Component, OnInit } from '@angular/core';
import { CarpoolService } from '../../services/carpool.service';

@Component({
  selector: 'app-carpooloffre',
  templateUrl: './carpooloffre.component.html',
  styleUrls: ['./carpooloffre.component.css']
})
export class CarpooloffreComponent implements OnInit {
  carpool!: any[];

  constructor(private carpoolService: CarpoolService) {}

  ngOnInit(): void {
    this.carpoolService.getAllTripOffers().subscribe(
      res => {
        this.carpool = res.data;
        console.log(this.carpool);
      }
    );
  }

  upComingTripsnb() {
    let nb = 0;
    const now = new Date();
    const nowTime = now.getTime();

    for (let c of this.carpool) {
      const tripDate = new Date(c.trip_date);
      const formattedStartTime = c.startTime.length === 5 ? `${c.startTime}:00` : c.startTime;
      const combinedDateTimeString = `${c.trip_date}T${formattedStartTime}`;
      const combinedDateTime = new Date(combinedDateTimeString);

      if (combinedDateTime.getTime() > nowTime) {
        nb++;
      }
    }

    return nb;
  }

  competedtrip() {
    let nb = 0;
    const now = new Date();
    const nowTime = now.getTime();

    for (let c of this.carpool) {
      const tripDate = new Date(c.trip_date);
      const formattedStartTime = c.startTime.length === 5 ? `${c.startTime}:00` : c.startTime;
      const combinedDateTimeString = `${c.trip_date}T${formattedStartTime}`;
      const combinedDateTime = new Date(combinedDateTimeString);

      if (combinedDateTime.getTime() <= nowTime) {
        nb++;
      }
    }

    return nb;
  }

  avgprix() {
    let sum = 0;
    for (let car of this.carpool) {
      sum = sum + car.price;
    }
    return sum / this.carpool.length;
  }

  isUpcomingTrip(car: any): boolean {
    const now = new Date();
    const tripDate = new Date(car.trip_date);
    const formattedStartTime = car.startTime.length === 5 ? `${car.startTime}:00` : car.startTime;
    const combinedDateTimeString = `${car.trip_date}T${formattedStartTime}`;
    const combinedDateTime = new Date(combinedDateTimeString);

    return combinedDateTime.getTime() > now.getTime();
  }

  deletecarpool(id: number) {
    this.carpoolService.deletebyid(id).subscribe(
      (res) => {
        console.log('User deleted successfully');
        this.carpool = this.carpool.filter(car => car.id !== id);
      },
      (err) => {
        console.log('Error deleting user', err);
      }
    );
  }
}
