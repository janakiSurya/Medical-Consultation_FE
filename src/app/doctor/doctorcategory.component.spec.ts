import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorcategoryComponent } from './doctorcategory.component';

describe('DoctorcategoryComponent', () => {
  let component: DoctorcategoryComponent;
  let fixture: ComponentFixture<DoctorcategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorcategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
