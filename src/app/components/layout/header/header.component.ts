import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  username: string = '';
  private authSubscription: Subscription | undefined;
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    // S'abonner aux changements d'état de connexion
    this.authSubscription = this.authService.isLoggedIn$
      .subscribe(loggedIn => {
        this.isLoggedIn = loggedIn;
        this.updateUsername();
      });
  }

  updateUsername(): void {
    if (this.isLoggedIn) {
      const userJson = localStorage.getItem('user');
      if (userJson) {
        const user = JSON.parse(userJson);
        this.username = user.firstname || user.login || 'utilisateur';
      } else {
        this.username = 'utilisateur';
      }
    } else {
      this.username = '';
    }
  }
  
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    // Se désabonner pour éviter les fuites de mémoire
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}