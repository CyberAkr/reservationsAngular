import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api';
  
  // Nouveau BehaviorSubject pour suivre l'état de connexion
  private loggedIn = new BehaviorSubject<boolean>(this.isLoggedIn());
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) { }

  register(user: User): Observable<any> {
    return this.http.post('http://localhost:8080/api/public/register', user);
  }

  login(credentials: { login: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/public/login`, credentials)
      .pipe(
        tap((response: any) => {
          if (response && response.token) {
            this.saveToken(response.token);
            
            if (response.user) {
              localStorage.setItem('user', JSON.stringify(response.user));
            } else {
              localStorage.setItem('user', JSON.stringify({login: credentials.login}));
            }
            
            // Mettre à jour l'état de connexion
            this.loggedIn.next(true);
          }
        })
      );
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Mettre à jour l'état de connexion
    this.loggedIn.next(false);
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/profile`);
  }
}