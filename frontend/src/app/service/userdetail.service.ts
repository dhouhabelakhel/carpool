import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class UserdetailService {
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
  constructor() { }
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

  // Retrieve currentUser data
  getUserDetail(): { 
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
    if (!this.actueluser) {
      this.decodeToken(); 
    }
    return this.actueluser;
  }
}
