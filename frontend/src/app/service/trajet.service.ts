import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const   URL="http://localhost:3000/api/tripOffers";

@Injectable({
  providedIn: 'root'
})
export class TrajetService {

  constructor(private http:HttpClient) { }
  url="";
  postTrajet(data:any):Observable<any>{
    const token = localStorage.getItem('token');
     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      console.log('data from service:', data);
      return this.http.post(URL, data, { headers });
  }
  getAllTripOffers(data:any):Observable<any>{
    console.log(data);
    this.url=URL
if(data.start_point||data.destination||data.date){
  this.url=this.url+"?"

}
    if(data.start_point!=""){
      this.url=this.url+"start_point="+data.start_point;

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
