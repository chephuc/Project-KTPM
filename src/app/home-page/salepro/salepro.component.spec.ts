import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleproComponent } from './salepro.component';

describe('SaleproComponent', () => {
  let component: SaleproComponent;
  let fixture: ComponentFixture<SaleproComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleproComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleproComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
