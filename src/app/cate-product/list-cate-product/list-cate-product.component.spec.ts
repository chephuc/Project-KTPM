import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCateProductComponent } from './list-cate-product.component';

describe('ListCateProductComponent', () => {
  let component: ListCateProductComponent;
  let fixture: ComponentFixture<ListCateProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCateProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
