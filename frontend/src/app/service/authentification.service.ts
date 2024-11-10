import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { User } from '../classes/user';
const URL = 'http://localhost:3000/api/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'token';
  private currentUser: User | null = null;


  constructor(private http: HttpClient) {}

  register(userData: any): Observable<User> {
    console.log(userData)
    return this.http.post<User>(URL,userData)
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${URL}/auth`, credentials).pipe(
      tap((response: any) => {
        if (response && response.token) {
          localStorage.setItem(this.tokenKey, response.token);
          console.log('Login successful, token saved');
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
  getCurrentUser(): Observable<User | null> {
    const token = this.getToken();
    if (!token) {
      return of(null);
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<User>(`${URL}`, { headers }).pipe(
      catchError((error) => {
        console.error('Failed to fetch current user', error);
        return of(null);
      })
    ).pipe(
      tap(user => {
        this.currentUser = user;
      })
    );
  }

  getCurrentUserData(): User | null {
    return this.currentUser;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    console.log('User logged out');
  }

}
