import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const   URL="http://localhost:3000/api/tripOffers";
@Injectable({
  providedIn: 'root'
})
export class CarpoolService {
  constructor(private http:HttpClient) { }
  url="";
  getUserOffers(user_id:any):Observable<any>{
   return this.http.get(`${URL}?user_id=${user_id}`)
  }
  postTrajet(data:any):Observable<any>{
    const token = localStorage.getItem('token');
     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      console.log('data from service:', data);
      return this.http.post<any>(URL, data, { headers });
  }
  updateTrajet(id:any,data:any):Observable<any>{
    return this.http.put(`${URL}/${id}`,data)
  }
  getAllTripOffers():Observable<any>{


    return this.http.get(URL)
  }
  getTripbyid(id: any): Observable<any> {
    return this.http.get<any>(`${URL}/${id}`);
  }
  deletebyid(id:any):Observable<any>{
    return this.http.delete(`${URL}/${id}`);
  }
  
}
