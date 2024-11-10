import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserdetailService {
  private baseUrl = 'http://localhost:3000/api/users';
  private tokenKey = 'token';
  private actuelUser: any = null;

  constructor(private http: HttpClient) {}

  private getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUserDetail(id: string): Observable<any> {
    const token = this.getToken();
    if (!token) {
      throw new Error('User not logged in or token missing');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get(`${this.baseUrl}/${id}`, { headers });
  }

  updateUser(updatedData: { firstName?: string, lastName?: string, isSmoker?: boolean, phoneNumber?: string, city?: string, username?: string }): Observable<any> {
    const userId = this.actuelUser?.userId;
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
    const userId = this.actuelUser?.userId;
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
