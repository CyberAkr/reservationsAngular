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
}