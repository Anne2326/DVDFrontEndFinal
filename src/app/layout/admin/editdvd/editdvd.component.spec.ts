import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditdvdComponent } from './editdvd.component';

describe('EditdvdComponent', () => {
  let component: EditdvdComponent;
  let fixture: ComponentFixture<EditdvdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditdvdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditdvdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
