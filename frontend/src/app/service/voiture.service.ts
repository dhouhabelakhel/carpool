import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoitureService {

  constructor(private http:HttpClient) { }
  URL="http://localhost:3000/voiture";
  postVoiture(data:any):Observable<any>{
    return this.http.post(this.URL,data)
  }
  getVoitureByUser(id:number):Observable<any>{
    return this.http.get(this.URL+"/"+id)
  }
}
