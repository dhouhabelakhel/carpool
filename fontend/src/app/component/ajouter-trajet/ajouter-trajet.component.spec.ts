import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterTrajetComponent } from './ajouter-trajet.component';

describe('AjouterTrajetComponent', () => {
  let component: AjouterTrajetComponent;
  let fixture: ComponentFixture<AjouterTrajetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjouterTrajetComponent]
    });
    fixture = TestBed.createComponent(AjouterTrajetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
