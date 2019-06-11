import { Component, OnInit } from '@angular/core';
import { ProductService } from '../home-page/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product, Size } from '../home-page/product/product';
import { Observable, of } from 'rxjs';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  public shoppingCartSize$: Observable<Size[]> = of([]);
  public shoppingCartItems$: Observable<Product[]> = of([]);
  public shoppingCartItems: Product[] = [];
  public shoppingCartSize: Size[] = [];
  Selected: Number;

  constructor(private cartService: CartService) { 
    this.shoppingCartItems$ = this
    .cartService
    .getItems();

    this.shoppingCartSize$ = this
    .cartService
    .getSize();

    this.shoppingCartItems$.subscribe(_ => this.shoppingCartItems = _);
    this.shoppingCartSize$.subscribe(_ => this.shoppingCartSize = _);
    // console.log(this.shoppingCartSize)
    // console.log(this.shoppingCartItems)
  }

  ngOnInit() {

  }

  // public getSize(): Number{
  //   return this.cartService.getSize();
  // }

  public getTotal(): Observable<number> {
    return this.cartService.getTotalAmount();
  }

  public removeItem(item: Product) {
    this.cartService.removeFromCart(item)
  }
}
