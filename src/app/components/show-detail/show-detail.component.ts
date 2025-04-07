import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Show } from '../../models/show';
import { ShowService } from '../../services/show.service';

@Component({
  selector: 'app-show-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './show-detail.component.html',
  styleUrls: ['./show-detail.component.css']
})
export class ShowDetailComponent implements OnInit {
  show: Show | null = null;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private showService: ShowService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadShow(id);
  }

  loadShow(id: number): void {
    this.loading = true;
    this.showService.getShow(id).subscribe({
      next: (data) => {
        console.log('Détails du show :', data);
        this.show = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement du spectacle';
        this.loading = false;
        console.error(err);
      }
    });
  }
}