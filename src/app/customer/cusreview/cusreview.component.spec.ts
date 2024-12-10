import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CusreviewComponent } from './cusreview.component';

describe('CusreviewComponent', () => {
  let component: CusreviewComponent;
  let fixture: ComponentFixture<CusreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CusreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CusreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
