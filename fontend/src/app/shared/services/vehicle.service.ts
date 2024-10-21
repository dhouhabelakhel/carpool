import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehcile } from '../classes/vehcile';
const URL='http://localhost:3000/api/vehicles'
@Injectable({
  providedIn: 'root'
})
export class VehicleServiceService {

  constructor(private http:HttpClient) { }
  getVehicles():Observable<Vehcile[]>{
    return this.http.get<Vehcile[]>(URL);
  }
}
