import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import {catchError, map, Observable, of, throwError} from 'rxjs';
import { tap } from 'rxjs/operators';


export interface LoggedUserResponse {
  email: string;
  role: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = null;
  private apiUrl = 'http://localhost:8081/api/v1/auth';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<{ accessToken: string }>(`${this.apiUrl}/authenticate`, { email, password }).pipe(
      tap(response => {
        this.setToken(response.accessToken);
      }),
      catchError(this.handleError)  // Handle errors
    );
  }

  register(email: string, password: string, role: string): Observable<any> {
    return this.http.post<{ accessToken: string }>(`${this.apiUrl}/register`, { email, password, role }).pipe(
      tap(response => {
        // Only set the token if the role is not EMPLOYEE
        if (role !== 'EMPLOYEE') {
          this.setToken(response.accessToken);
        }
      }),
      catchError(this.handleError)  // Handle errors
    );
  }


  // Set the token in local storage
  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('accessToken', token);
  }

  // Get the token from local storage
  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('accessToken');
    }
    return this.token;
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Logout method to clear the token
  // Logout method
  // Simplified method to handle logout
  logout(): void {
    this.http.post(`${this.apiUrl}/logout`, {}, {
      headers: this.getAuthHeaders()
    }).subscribe({
      next: () => {
        console.log('Logout successful');
        this.clearToken();  // Clear the token on successful logout
        this.router.navigate(['/login']); // Redirect to sign-in page
      },
      error: (err) => {
        console.error('Logout failed:', err);
        this.clearToken();  // Ensure token is cleared on error as well
        this.router.navigate(['/login']); // Redirect to sign-in page
      }
    });
  }


  // Clear the token from local storage
  clearToken(): void {
    this.token = null;
    localStorage.removeItem('accessToken');
  }

  // Get authenticated headers for making secure requests
  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    console.log("heelooooo")
    if (error.error && error.error.detail) {
      errorMessage = error.error.detail;
    } else if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Error: ${error.error.message}`;
      console.log("heloo:" + errorMessage)
    } else {
      // Backend error
      errorMessage = `Error ${error.status}: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  // Check if the user is authenticated
  isAuthenticated(): Observable<boolean> {
    return this.http.get<{ isAuthenticated: boolean }>(`${this.apiUrl}/isAuthenticated`).pipe(
      tap(response => {
        console.log("Authentication check response:", response.isAuthenticated); // Log the response for debugging
      }),
      catchError(error => {
        // Handle errors
        console.error('Authentication check failed:', error);
        return of({ isAuthenticated: false }); // Return false on error
      }),
      map(response => {
        // Ensure response.isAuthenticated is a boolean
        if (typeof response.isAuthenticated === 'boolean') {
          return response.isAuthenticated;
        } else {
          console.error('Unexpected response format:', response);
          return false;
        }
      })
    );
  }



  // Get the logged-in user's information
  getLoggedInUser(): Observable<LoggedUserResponse> {
    return this.http.get<LoggedUserResponse>(`${this.apiUrl}/user`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)  // Handle errors
    );
  }
}
