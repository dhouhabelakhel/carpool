import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const  URL="http://localhost:3000/api/rentalOffer";

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http:HttpClient) { }
  postLocation(data:any):Observable<any>{
    return this.http.post(URL,data)
  }
}
