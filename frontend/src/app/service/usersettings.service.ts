import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../classes/user';
const URL = 'http://localhost:3000/api/users';

@Injectable({
  providedIn: 'root'
})

export class UsersettingsService {
  constructor(private http: HttpClient) { }
  updateUser(id: string, userData: User): Observable<any> {
    return this.http.put(`${URL}/${id}`, userData);
  }
}
