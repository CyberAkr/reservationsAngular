import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MustMatch } from '../../../helpers/must-match.validator';
import { User } from '../../../models/user';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  error = '';
  form: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      login: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).*$/)
      ]],
      confirmPassword: ['', Validators.required],
      langue: ['fr', Validators.required]
    }, {
      validators: MustMatch('password', 'confirmPassword')
    });
  }

  get f() { return this.registerForm.controls; }
// Dans votre méthode onSubmit()// src/app/components/auth/register/register.component.ts
onSubmit() {
  this.submitted = true;

  if (this.registerForm.invalid) {
    return;
  }

  // Utiliser registerForm au lieu de form
  const user: User = {
    login: this.registerForm.value.login,
    firstname: this.registerForm.value.firstname,
    lastname: this.registerForm.value.lastname,
    email: this.registerForm.value.email,
    password: this.registerForm.value.password,
    langue: this.registerForm.value.langue || 'fr'
  };

  // Ajoutez des logs pour déboguer
  console.log('Sending user data:', user);

  this.authService.register(user).subscribe({
    next: (response) => {
      console.log('Registration success:', response);
      this.router.navigate(['/login'], { queryParams: { registered: 'true' } });
    },
    error: (err) => {
      console.error('Registration error:', err);
      this.error = err.error?.message || 'Une erreur est survenue lors de l\'inscription';
    }
  });
}}