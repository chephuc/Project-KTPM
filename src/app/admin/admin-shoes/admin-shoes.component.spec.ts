import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShoesComponent } from './admin-shoes.component';

describe('AdminShoesComponent', () => {
  let component: AdminShoesComponent;
  let fixture: ComponentFixture<AdminShoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminShoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminShoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
