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

  constructor(private fb: FormBuilder,private voitureService:VoitureService) {
    this.vehiculeForm = this.fb.nonNullable.group({
      model: ['', Validators.required],
      registration_number	: ['', Validators.required],
      photo: ['', Validators.required],
      description: ['', Validators.required],
      seats: [0, [Validators.required, Validators.min(1), Validators.max(7)]],
      rent: [0, [Validators.required, Validators.min(0),Validators.max(1)]],
      user_id:1
    });
  }

  photoPreview: string | ArrayBuffer | null = null; 

  onFileSelected(event: any) {
    const file = event.target.files[0];
  
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  
      if (allowedTypes.includes(file.type)) {
        const reader = new FileReader();
  
        reader.readAsDataURL(file);
  
        reader.onload = () => {
          this.photoPreview = reader.result; 
          this.vehiculeForm.patchValue({
            photo: this.photoPreview
          });
        };
  
        reader.onerror = (error) => {
          console.log('Error: ', error);
        };
      } else {
        console.log('Only JPEG, PNG or GIF images are allowed.');
      }
    }
  }
  
  ajouterVoiture() {

    this.voitureService.postVoiture(this.vehiculeForm.value).subscribe(res => {
      alert("vehicule added")
     
    })
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
