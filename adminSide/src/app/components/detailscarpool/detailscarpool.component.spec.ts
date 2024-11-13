import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailscarpoolComponent } from './detailscarpool.component';

describe('DetailscarpoolComponent', () => {
  let component: DetailscarpoolComponent;
  let fixture: ComponentFixture<DetailscarpoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailscarpoolComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailscarpoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
