import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrajetService {

  constructor(private http:HttpClient) { }
  URL="http://localhost:3000/trajet";
  postTrajet(data:any):Observable<any>{
    return this.http.post(this.URL,data)
  }
}
