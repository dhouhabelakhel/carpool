import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcarpoolComponent } from './editcarpool.component';

describe('EditcarpoolComponent', () => {
  let component: EditcarpoolComponent;
  let fixture: ComponentFixture<EditcarpoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditcarpoolComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditcarpoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
