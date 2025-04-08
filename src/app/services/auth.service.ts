import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Adaptez cette URL selon la configuration de votre API
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  // src/app/services/auth.service.ts
register(user: User): Observable<any> {
  console.log('Sending registration request:', user);
  // Utiliser directement l'URL complète pour déboguer
  return this.http.post('http://localhost:8080/api/public/register', user);
}

  login(credentials: { login: string, password: string }): Observable<any> {
    // Utiliser la même approche pour le login
    return this.http.get('/csrf').pipe(
      switchMap((csrfData: any) => {
        const headers = new HttpHeaders({
          [csrfData.headerName]: csrfData.token
        });
        return this.http.post(`${this.apiUrl}/public/login`, credentials, { headers });
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
  }
}