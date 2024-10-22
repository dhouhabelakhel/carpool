import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferConvoiturageComponent } from './offer-convoiturage.component';

describe('OfferConvoiturageComponent', () => {
  let component: OfferConvoiturageComponent;
  let fixture: ComponentFixture<OfferConvoiturageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OfferConvoiturageComponent]
    });
    fixture = TestBed.createComponent(OfferConvoiturageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
