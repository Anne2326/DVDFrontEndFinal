import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagefavouriteComponent } from './managefavourite.component';

describe('ManagefavouriteComponent', () => {
  let component: ManagefavouriteComponent;
  let fixture: ComponentFixture<ManagefavouriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagefavouriteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagefavouriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
