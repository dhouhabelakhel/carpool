import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ajouter-voiture',
  templateUrl: './ajouter-voiture.component.html',
  styleUrls: ['./ajouter-voiture.component.css']
})
export class AjouterVoitureComponent {
  voitureForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.voitureForm = this.fb.nonNullable.group({
      model: ['', Validators.required],
      photo: ['', Validators.required],
      description: ['', Validators.required],
      seats: [0, [Validators.required, Validators.min(1), Validators.max(7)]],
      rent: [0, [Validators.required, Validators.min(1)]]
    });
  }

  isModelVide() {
    return this.voitureForm.get('model')?.hasError('required') && this.voitureForm.get('model')?.touched;
  }

  isPhotoVide() {
    return this.voitureForm.get('photo')?.hasError('required') && this.voitureForm.get('photo')?.touched;
  }

  isDescriptionVide() {
    return this.voitureForm.get('description')?.hasError('required') && this.voitureForm.get('description')?.touched;
  }

  isValidSeats() {
    return (this.voitureForm.get('seats')?.hasError('min') || this.voitureForm.get('seats')?.hasError('max')) && this.voitureForm.get('seats')?.touched;
  }

  isValidRent() {
    return this.voitureForm.get('rent')?.hasError('min') && this.voitureForm.get('rent')?.touched;
  }

  ajouterVoiture() {
    if (this.voitureForm.valid) {
      console.log('Formulaire valide, ajout de la voiture...');
      // Logique pour ajouter la voiture
    } else {
      console.log('Formulaire invalide');
    }
  }

}
