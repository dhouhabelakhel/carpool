import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';  // Import catchError
import { User } from '../classes/user';

const URL = 'http://localhost:3000/api/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  // Refactor updateUser to return Observable for handling response and errors in the component
  updateUser(userId: number, userData: any): Observable<any> {
    const url = `${URL}/${userId}`;
    return this.http.put(url, userData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      catchError(this.handleError)  // Use catchError for handling errors in this method
    );
  }

  // Get user by ID with error handling
  getUserById(id: number): Observable<any> {
    return this.http.get(`${URL}/${id}`).pipe(
      catchError(this.handleError)  // Handle error
    );
  }

  // Get all users with error handling
  getAllUsers(): Observable<any | null> {
    return this.http.get(URL).pipe(
      catchError(this.handleError)  // Handle error
    );
  }

  // Delete user with error handling
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${URL}/${id}`).pipe(
      catchError(this.handleError)  // Handle error
    );
  }

  // A method to handle HTTP errors
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // Optionally log to an external logging service
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));  // Return an observable with an error message
  }
}
