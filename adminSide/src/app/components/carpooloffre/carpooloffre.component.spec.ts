import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarpooloffreComponent } from './carpooloffre.component';

describe('CarpooloffreComponent', () => {
  let component: CarpooloffreComponent;
  let fixture: ComponentFixture<CarpooloffreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarpooloffreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarpooloffreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
