import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserdetailService {
  private baseUrl = 'http://localhost:3000/api/users';
  private tokenKey = 'token';
  private actueluser: { 
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

  private getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
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

        this.actueluser = decodedToken;
      } catch (error) {
        console.error('Token decoding failed', error);
        this.actueluser = null;
      }
    }
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUserDetail(): { userId: string, username: string, email: string, firstName: string, lastName: string, 
    gender: string, birthdate: string, phoneNumber: string, city: string, isSmoker: boolean } | null {
    if (!this.actueluser) {
      this.decodeToken(); 
    }
    return this.actueluser;
  }

  updateUser(updatedData: {firstName?: string, lastName?: string, isSmoker?: boolean, phoneNumber?: string, city?: string, username?: string}): Observable<any> {
    const userId = this.actueluser?.userId;
    const token = this.getToken();
    if (!userId || !token) {
      throw new Error('User not logged in or token missing');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.put(`${this.baseUrl}/${userId}`, updatedData, { headers });
  }

  updatePassword(data: { oldPassword: string, newPassword: string }): Observable<any> {
    const token = this.getToken();
    const userId = this.getUserDetail()?.userId;
    if (!userId || !token) {
      throw new Error('User not logged in or token missing');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.put(`${this.baseUrl}/${userId}`, data, { headers });
  }
}
