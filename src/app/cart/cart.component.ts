import { Component, OnInit } from '@angular/core';
import { ProductService } from '../home-page/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product, Size } from '../home-page/product/product';
import { Observable, of } from 'rxjs';
import { CartService } from './cart.service';
import { AuthenticationService } from '../authentication.service';
import { AuthGuardService } from '../auth-guard.service'
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
  total: any;

  constructor(private cartService: CartService,private authguard: AuthGuardService,private auth: AuthenticationService) { 
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

  public getTotal(): Observable<any> {
    return this.cartService.getTotalAmount();
  }

  public removeItem(item: Product) {
    this.cartService.removeFromCart(item)
  }

  checkout(order: any){
    this.total = $("#totalPrice").val()
    console.log(this.total)
    this.cartService.addOrder(order).subscribe(
      (res) => {
        for(let i of order.shoppingCartItems)
        {
          this.cartService.updateDetail({
            idOrder : res.idOrder,
            idShoes : i.idShoes
            }).subscribe(
            (res1) => {
              alert("Success!")
            },
            err => {
              console.log(err)
              alert("Failed!")
            })
        }
      },
      err => {
        console.log(err)
        alert("Failed!")
      }
    )
  }
}
