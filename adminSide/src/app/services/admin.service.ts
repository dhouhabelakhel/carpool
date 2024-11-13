import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const URL = 'http://localhost:3000/api/admin';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }
 getalladmins():Observable<any | null>{
  return this.http.get(URL)
 }
 getadminbyid(id:number):Observable<any>{
  return this.http.get(`${URL}/${id}`)
 }
 updateadmin(id:number,admin:any):Observable<any>{
  return this.http.get(`${URL}/${id}`,admin)
 }
}
