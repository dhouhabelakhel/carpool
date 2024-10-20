import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../classes/user';

const URL = "http://localhost:3000/api/users"; // Base URL for the API

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(private http: HttpClient) { }

  // Register a new user
  register(user: User): Observable<User> {
    return this.http.post<User>(`${URL}/register`, user);
  }

  // Log in a user, expecting email and password
  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${URL}/login`, { email, password });
  }

  // Fetch the authenticated user's profile (relies on session or cookies for authentication)
  getProfile(): Observable<User> {
    return this.http.get<User>(`${URL}/me`);
  }

  // Log out the user (session-based logout)
  logout(): Observable<void> {
    return this.http.post<void>(`${URL}/logout`, {});
  }

  // Check if the user is authenticated
  isAuthenticated(): Observable<boolean> {
    // Assuming a backend route that checks session validity or similar
    return this.http.get<boolean>(`${URL}/isAuthenticated`);
  }
}
