import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { User } from '../classes/user';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000/api/users'; 
  private tokenKey = 'token';
  private AllUser: User | null = null; 
  private currentUser: { userId: string, username: string } | null = null;

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<User> {
    console.log(userData);
    return this.http.post<User>(this.baseUrl, userData);
  }

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

  getAllUser(): Observable<User | null> {
    const token = this.getToken();
    if (!token) {
      return of(null); 
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<User>(`${this.baseUrl}`, { headers }).pipe(
      catchError((error) => {
        console.error('Failed to fetch current user', error);
        return of(null); 
      })
    ).pipe(
      tap(user => {
        this.AllUser = user;
      })
    );
  }

  getAllUserData(): User | null {
    return this.AllUser; 
  }

  private decodeToken(): void {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken = jwtDecode<{ userId: string, username: string }>(token);
        this.currentUser = {
          userId: decodedToken.userId,
          username: decodedToken.username
        };
      } catch (error) {
        console.error('Token decoding failed', error);
        this.currentUser = null;
      }
    }
  }

  // Retrieve currentUser data
  getCurrentUser(): { userId: string, username: string } | null {
    if (!this.currentUser) {
      this.decodeToken(); // Decode token if currentUser is not set
    }
    return this.currentUser;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.currentUser = null;
    console.log('User logged out');
  }
}