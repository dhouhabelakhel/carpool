import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { User } from '../classes/user';
import {jwtDecode} from 'jwt-decode';

const URL = 'http://localhost:3000/api/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(userData: any): Observable<User> {
    console.log('data from backend before save',userData);
    return this.http.post<User>(URL, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${URL}/auth`, credentials)

  }


  getCurrentUser(): Observable<any | null> {
    const token = localStorage.getItem('token');
    if (token) {
        const decodedToken = jwtDecode<{ userId: string, username: string }>(token);
        console.log(decodedToken);
        const userId = decodedToken.userId;
        return this.http.get<User>(`${URL}/${userId}`);
    } else {
        return of(null);
    }
}




  logout(): void {
    localStorage.removeItem('token');
    console.log('User logged out');
  }
 }
