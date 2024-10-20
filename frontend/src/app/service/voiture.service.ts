import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehcile } from '../classes/vehicle';
const   URL="http://localhost:3000/api/vehicles";

@Injectable({
  providedIn: 'root'
})
export class VoitureService {

  constructor(private http:HttpClient) { }
  postVoiture(data:FormData):Observable<Vehcile>{
    return this.http.post<Vehcile>(URL,data)
  }
  getVoitureByUser(id:number):Observable<any>{
    return this.http.get(URL+"/user/"+id)
  }
}
