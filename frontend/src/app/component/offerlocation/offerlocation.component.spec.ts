import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferlocationComponent } from './offerlocation.component';

describe('OfferlocationComponent', () => {
  let component: OfferlocationComponent;
  let fixture: ComponentFixture<OfferlocationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OfferlocationComponent]
    });
    fixture = TestBed.createComponent(OfferlocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
