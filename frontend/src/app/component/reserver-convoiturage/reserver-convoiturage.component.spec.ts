import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserverConvoiturageComponent } from './reserver-convoiturage.component';

describe('ReserverConvoiturageComponent', () => {
  let component: ReserverConvoiturageComponent;
  let fixture: ComponentFixture<ReserverConvoiturageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReserverConvoiturageComponent]
    });
    fixture = TestBed.createComponent(ReserverConvoiturageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
