import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Show } from '../../models/show';
import { ShowService } from '../../services/show.service';

@Component({
  selector: 'app-show-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.css']
})
export class ShowListComponent implements OnInit {
  shows: Show[] = [];
  loading = true;
  error = '';

  constructor(private showService: ShowService) { }

  ngOnInit(): void {
    this.loadShows();
  }

  loadShows(): void {
    this.loading = true;
    this.showService.getShows().subscribe({
      next: (data) => {
        console.log('Type de données:', typeof data);
        console.log('Est-ce un tableau ?', Array.isArray(data));
        console.log('Nombre de shows:', data.length);
        console.log('Contenu des shows:', JSON.stringify(data));
        
        this.shows = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erreur complète:', err);
        this.error = 'Erreur lors du chargement des spectacles';
        this.loading = false;
      }
    });
  
  }
}