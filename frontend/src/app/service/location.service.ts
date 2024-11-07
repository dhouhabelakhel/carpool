import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehcile } from '../classes/vehicle';
const  URL="http://localhost:3000/api/rentalOffers";

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  url="";
  constructor(private http:HttpClient) { }
  postLocation(data:any):Observable<any>{
    return this.http.post<any>(URL,data)
  }
  getAllLocation(data:any):Observable<any>{
    this.url=URL+"?";
    if(data.price!=0)
     this.url=this.url+"&price="+data.price
     if(data.rental_date!=0)
     this.url=this.url+"&rental_date="+data.rental_date
     if(data.model!=0)
     this.url=this.url+"&model="+data.model
     
    console.log(this.url);
    
    return this.http.get(this.url);
  }
}
