import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageacceuilcovoiturageComponent } from './pageacceuilcovoiturage.component';

describe('PageacceuilcovoiturageComponent', () => {
  let component: PageacceuilcovoiturageComponent;
  let fixture: ComponentFixture<PageacceuilcovoiturageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageacceuilcovoiturageComponent]
    });
    fixture = TestBed.createComponent(PageacceuilcovoiturageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
