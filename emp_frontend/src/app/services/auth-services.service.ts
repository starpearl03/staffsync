// auth-services.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import {Employee} from "../models/employee";

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
  private userRoleSubject = new BehaviorSubject<string | null>(null); // Observable to share user role

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<{ accessToken: string }>(`${this.apiUrl}/authenticate`, { email, password }).pipe(
      tap(response => {
        this.setToken(response.accessToken);
        this.fetchUserRole(); // Fetch role after login
      }),
      catchError(this.handleError)
    );
  }

  register(email: string, password: string, role: string): Observable<any> {
    return this.http.post<{ accessToken: string }>(`${this.apiUrl}/register`, { email, password, role }).pipe(
      tap(response => {
        if (role !== 'EMPLOYEE') {
          this.setToken(response.accessToken);
        }
        this.fetchUserRole(); // Fetch role after registration
      }),
      catchError(this.handleError)
    );
  }

  // Fetch user role and update the BehaviorSubject
  private fetchUserRole(): void {
    this.getLoggedInUser().subscribe(
      (response: LoggedUserResponse) => {
        this.userRoleSubject.next(response.role);
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }

  // Expose the user role as an observable
  get userRole$(): Observable<string | null> {
    return this.userRoleSubject.asObservable();
  }

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('accessToken', token);
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('accessToken');
    }
    return this.token;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    this.http.post(`${this.apiUrl}/logout`, {}, {
      headers: this.getAuthHeaders()
    }).subscribe({
      next: () => {
        console.log('Logout successful');
        this.clearToken();
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Logout failed:', err);
        this.clearToken();
        this.router.navigate(['/login']);
      }
    });
  }

  clearToken(): void {
    this.token = null;
    localStorage.removeItem('accessToken');
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error && error.error.detail) {
      errorMessage = error.error.detail;
    } else if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error ${error.status}: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  isAuthenticated(): Observable<boolean> {
    return this.http.get<{ isAuthenticated: boolean }>(`${this.apiUrl}/isAuthenticated`).pipe(
      tap(response => {
        console.log("Authentication check response:", response.isAuthenticated);
      }),
      catchError(error => {
        console.error('Authentication check failed:', error);
        return of({ isAuthenticated: false });
      }),
      map(response => {
        if (typeof response.isAuthenticated === 'boolean') {
          return response.isAuthenticated;
        } else {
          console.error('Unexpected response format:', response);
          return false;
        }
      })
    );
  }

  getLoggedInUser(): Observable<LoggedUserResponse> {
    return this.http.get<LoggedUserResponse>(`${this.apiUrl}/user`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }

  getLoggedInEmployee(): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/getLoggedInEmployee`, {
      headers: this.getAuthHeaders()
    }).pipe(
      catchError(this.handleError)
    );
  }
}
