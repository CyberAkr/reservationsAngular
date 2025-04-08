import { FormGroup } from '@angular/forms';

// Validateur personnalisé pour vérifier que deux champs correspondent
export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
            // retourner si un autre validateur a déjà trouvé une erreur
            return;
        }

        // vérifier si les contrôles correspondent
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}