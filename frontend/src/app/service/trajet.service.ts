import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrajetService {

  constructor(private http:HttpClient) { }
  URL="http://localhost:3000/api/tripOffers";
  url="";
  postTrajet(data:any):Observable<any>{
    return this.http.post(this.URL,data)
  }
  getAllTripOffers(data:any):Observable<any>{
    this.url=this.URL+"?"
    if(data.start_point!=""){
      this.url=this.url+"&start_point="+data.start_point
    }
    if(data.destination!=""){
      this.url=this.url+"&destination="+data.destination
    }
    if(data.date!=""){
      this.url=this.url+"&trip_date="+data.date
    }
    if(data.price!=0){
      this.url=this.url+"&price="+data.price
    }
    console.log(this.url);
    
    return this.http.get(this.url)
  }
}
