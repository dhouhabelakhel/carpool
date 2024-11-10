import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject, catchError, tap } from 'rxjs';
import { User } from '../classes/user';
import {jwtDecode} from 'jwt-decode';

const URL = 'http://localhost:3000/api/users';

@Injectable({
   providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api/users'; 
  private tokenKey = 'token';
  private AllUser: User[] | null = null;
  private currentUser: { 
    userId: string, 
    username: string, 
    email: string, 
    firstName: string, 
    lastName: string, 
    gender: string, 
    birthdate: string, 
    phoneNumber: string, 
    city: string, 
    isSmoker: boolean 
  } | null = null;

  constructor(private http: HttpClient) {}
  //inscription
  register(userData: any): Observable<User> {
    console.log('data from backend before save',userData);
    return this.http.post<User>(URL, userData);
  }
  //authentification
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth`, credentials).pipe(
      tap((response: any) => {
        if (response && response.token) {
          localStorage.setItem(this.tokenKey, response.token);
          console.log('Login successful, token saved');
          this.decodeToken(); 
        }
      }),
      catchError((error) => {
        console.error('Login error', error);
        return of(error);
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
  //all the users
  getAllUser(): Observable<User[] | null> {
    const token = this.getToken();
    if (!token) {
      return of(null); 
    }
  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<User[]>(`${this.baseUrl}`, { headers }).pipe(
      catchError((error) => {
        console.error('Failed to fetch all users', error);
        return of(null); 
      })
    ).pipe(
      tap(users => {
        this.AllUser = users;
      })
    );
  }
  

  getAllUserData(): User[] | null {
    return this.AllUser; 
  }

  private decodeToken(): void {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken = jwtDecode<{
          userId: string,
          username: string,
          email: string,
          firstName: string,
          lastName: string,
          gender: string,
          birthdate: string,
          phoneNumber: string,
          city: string,
          isSmoker: boolean
        }>(token);
  
        this.currentUser = {
          userId: decodedToken.userId,
          username: decodedToken.username,
          email: decodedToken.email,
          firstName: decodedToken.firstName,
          lastName: decodedToken.lastName,
          gender: decodedToken.gender,
          birthdate: decodedToken.birthdate,
          phoneNumber: decodedToken.phoneNumber,
          city: decodedToken.city,
          isSmoker: decodedToken.isSmoker
        };
      } catch (error) {
        console.error('Token decoding failed', error);
        this.currentUser = null;
      }
    }
  }

  // Retrieve currentUser data
  getCurrentUser(): { 
    userId: string, 
    username: string, 
    email: string, 
    firstName: string, 
    lastName: string, 
    gender: string, 
    birthdate: string, 
    phoneNumber: string, 
    city: string, 
    isSmoker: boolean 
  } | null {
    if (!this.currentUser) {
      this.decodeToken(); 
    }
    return this.currentUser;
  }
//logou
  logout(): void {
    localStorage.removeItem('token');
    console.log('User logged out');
  }
 }
