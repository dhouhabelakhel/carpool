import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/admin';  // Update with your backend API URL

  constructor(private http: HttpClient) {}

  // Method to handle user login
  login(email: string, password: string): Observable<any> {
    const loginData = { email, password };
    return this.http.post<any>(`${this.apiUrl}/auth`, loginData);
  }

  // Method to store the token in localStorage
  storeToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Method to get the stored token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Method to remove the token (log out)
  logout(): void {
    localStorage.removeItem('token');
  }
  getCurrentUser(): Observable<any | null> {
    const token = localStorage.getItem('token');
    if (token) {
        const decodedToken = jwtDecode<{ adminId: string, username: string }>(token);
        console.log(decodedToken);
        const adminId = decodedToken.adminId;        
        return this.http.get<any>(`${this.apiUrl}/${adminId}`);
    } else {
        return of(null);
    }
}

  // Method to check if the user is authenticated
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
}
