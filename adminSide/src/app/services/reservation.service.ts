import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const URL = 'http://localhost:3000/api/TripReservation';
@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http:HttpClient) { }
  getreservationbyUser(id:Number):Observable<any>{
    return this.http.get<any>(`${URL}/userReservation/${id}`)
  }
}
