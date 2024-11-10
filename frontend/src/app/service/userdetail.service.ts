import { HttpClient } from '@angular/common/http';
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
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
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
  
        this.actueluser = {
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
        this.actueluser = null;
      }
    }
  }

  //userdetail
  getUserDetail(): { userId: string, username: string,  email: string, firstName: string, lastName: string, 
    gender: string, birthdate: string, phoneNumber: string, city: string, isSmoker: boolean } | null {
    if (!this.actueluser) {
      this.decodeToken(); 
    }
    return this.actueluser;
  }
  //updateuser
  updateUser(updatedData: {firstName?: string, lastName?: string, isSmoker?: boolean, phoneNumber?: string, city?: string }): Observable<any> {
    const userId = this.actueluser?.userId;
    const token = this.getToken();
    if (!userId || !token) {
      throw new Error('User not logged in or token missing');
    }
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    return this.http.put(`${this.baseUrl}/${userId}`, updatedData, { headers });
  }
}
