import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Show } from '../models/show';

@Injectable({
  providedIn: 'root'
})
export class ShowService {
  private apiUrl = 'http://localhost:8080/api/shows';

  constructor(private http: HttpClient) { }

  getShows(): Observable<Show[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      tap(response => console.log('Réponse complète :', response)),
      map(response => {
        console.log('Structure de la réponse :', Object.keys(response));
        
        if (response._embedded && response._embedded.showList) {
          return response._embedded.showList;
        } else if (Array.isArray(response)) {
          return response;
        } else {
          console.warn('Format de réponse non reconnu', response);
          return [];
        }
      }),
      catchError(error => {
        console.error('Erreur lors de la récupération des shows', error);
        return of([]); 
      })
    );
  }
  getShow(id: number): Observable<Show> {
    return this.http.get<Show>(`${this.apiUrl}/${id}`).pipe(
      tap(show => console.log(`Show ${id}:`, show)),
      catchError(error => {
        console.error(`Erreur lors de la récupération du show ${id}`, error);
        throw error;
      })
    );
  }

  createShow(show: Show): Observable<Show> {
    return this.http.post<Show>(this.apiUrl, show).pipe(
      tap(createdShow => console.log('Show créé :', createdShow)),
      catchError(error => {
        console.error('Erreur lors de la création du show', error);
        throw error;
      })
    );
  }

  updateShow(id: number, show: Show): Observable<Show> {
    return this.http.put<Show>(`${this.apiUrl}/${id}`, show).pipe(
      tap(updatedShow => console.log(`Show ${id} mis à jour :`, updatedShow)),
      catchError(error => {
        console.error(`Erreur lors de la mise à jour du show ${id}`, error);
        throw error;
      })
    );
  }

  deleteShow(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => console.log(`Show ${id} supprimé`)),
      catchError(error => {
        console.error(`Erreur lors de la suppression du show ${id}`, error);
        throw error;
      })
    );
  }
}