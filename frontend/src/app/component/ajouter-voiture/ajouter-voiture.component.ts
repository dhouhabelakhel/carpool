
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VoitureService } from 'src/app/service/voiture.service';

@Component({
  selector: 'app-ajouter-voiture',
  templateUrl: './ajouter-voiture.component.html',
  styleUrls: ['./ajouter-voiture.component.css']
})
export class AjouterVoitureComponent {
  vehiculeForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private voitureService: VoitureService) {
    this.vehiculeForm = this.fb.nonNullable.group({
      model: ['', Validators.required],
      registration_number: ['', Validators.required],
      description: ['', Validators.required],
      seats: [0, [Validators.required, Validators.min(1), Validators.max(7)]],
      rent: [0, [Validators.required, Validators.min(0)]],
      user_id: 1 // You might want to retrieve this dynamically
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.vehiculeForm.patchValue({ photo: file.name });
    }
  }

  ajouterVoiture() {
    if (this.vehiculeForm.invalid || !this.selectedFile) {
      alert('Please fill all required fields and select a photo');
      return;
    }

    const formData = new FormData();
    formData.append('model', this.vehiculeForm.get('model')?.value);
    formData.append('registration_number', this.vehiculeForm.get('registration_number')?.value);
    formData.append('description', this.vehiculeForm.get('description')?.value);
    formData.append('seats', this.vehiculeForm.get('seats')?.value);
    formData.append('rent', this.vehiculeForm.get('rent')?.value);
    formData.append('user_id', this.vehiculeForm.get('user_id')?.value);
    formData.append('photo', this.selectedFile);

    this.voitureService.postVoiture(formData).subscribe(
      res => alert('Vehicle added successfully'),
      err => alert('Failed to add vehicle: ' + err.message)
    );
  }

  isModelVide() {
    return this.vehiculeForm.get('model')?.hasError('required') && this.vehiculeForm.get('model')?.touched;
  }
  isMatriculeVide() {
    return this.vehiculeForm.get('matricule')?.hasError('required') && this.vehiculeForm.get('matricule')?.touched;
  }
  isPhotoVide() {
    return this.vehiculeForm.get('photo')?.hasError('required') && this.vehiculeForm.get('photo')?.touched;
  }

  isDescriptionVide() {
    return this.vehiculeForm.get('description')?.hasError('required') && this.vehiculeForm.get('description')?.touched;
  }

  isValidSeats() {
    return (this.vehiculeForm.get('seats')?.hasError('min') || this.vehiculeForm.get('seats')?.hasError('max')) && this.vehiculeForm.get('seats')?.touched;
  }

  isValidRent() {
    return this.vehiculeForm.get('rent')?.hasError('min') && this.vehiculeForm.get('rent')?.touched;
  }
}

