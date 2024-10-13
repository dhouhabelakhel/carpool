import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehcile } from '../classes/vehicle';
const  URL="http://localhost:3000/api/rentalOffer";

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http:HttpClient) { }
  postLocation(data:Vehcile):Observable<Vehcile>{
    return this.http.post<Vehcile>(URL,data)
  }
}
