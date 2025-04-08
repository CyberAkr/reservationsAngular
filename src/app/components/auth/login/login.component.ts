import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  error = '';
  registered = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });

    // Vérifier si l'utilisateur vient juste de s'inscrire
    this.route.queryParams.subscribe(params => {
      this.registered = params['registered'] === 'true';
    });
  }

  get f() { return this.loginForm.controls; }

// src/app/components/auth/login/login.component.ts (méthode onSubmit)
onSubmit() {
  this.submitted = true;

  if (this.loginForm.invalid) {
    return;
  }

  this.authService.login({
    login: this.f['login'].value,
    password: this.f['password'].value
  }).subscribe({
    next: (response) => {
      // Rediriger vers la page d'accueil ou une page protégée
      this.router.navigate(['/']); // ou '/shows' si c'est votre page principale
    },
    error: (err) => {
      this.error = err.error?.message || 'Erreur de connexion';
    }
  });
}}