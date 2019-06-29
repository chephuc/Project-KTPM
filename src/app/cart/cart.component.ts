import { Component, OnInit } from '@angular/core';
import { ProductService } from '../home-page/product/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, Size } from '../home-page/product/product';
import { Observable, of } from 'rxjs';
import { CartService } from './cart.service';
import { AuthenticationService } from '../authentication.service';
import { AuthGuardService } from '../auth-guard.service';
import Swal from 'sweetalert2';

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
  totalPrice: number
  size: number

  constructor(private cartService: CartService, private authguard: AuthGuardService, private auth: AuthenticationService, private router: Router) {
    this.shoppingCartItems$ = this
      .cartService
      .getItems();

    this.shoppingCartSize$ = this
      .cartService
      .getSize();

    this.shoppingCartItems$.subscribe(_ => this.shoppingCartItems = _);
    this.shoppingCartSize$.subscribe(_ => this.shoppingCartSize = _);
    console.log(this.shoppingCartSize)
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

  onOpenCheckout() {
    if (!this.auth.isLoggedIn()) {
      alert("Please Login Fisrt!")
      this.router.navigateByUrl("/signin")
    } 
    else if(this.shoppingCartItems.length == 0) {
      alert("Please add shoes into your card first!")
    }
    else {
      $('#modalCheckout').modal('show'); 
      this.total = $("#totalPrice").val()
      this.totalPrice = parseInt(this.total)
    }
  }

  checkout(order: any) {
    this.cartService.addOrder(order).subscribe(
      (res) => {


        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes!'
        }).then((result) => {
          if (result.value) {
            Swal.fire(
              'Done!',
              'Your order will arrive soon',
              'success'
            )
            for (let i of order.shoppingCartItems) {
              for (let a of order.shoppingCartSize) {
                this.size = parseInt(a)
                this.cartService.getsize({
                  Size: this.size
                }).subscribe(
                  (res1) => {
                    this.cartService.updateDetail({
                      idOrder: res.ID,
                      idShoes: i.idShoes,
                      idSize: res1.idSize
                    }).subscribe(
                      (res2) => {
                        window.location.replace("/cart")
                      },
                      err => {
                        console.log(err)
                        alert("Failed!")
                      })
                  },
                  err => {
                    console.log(err)
                    alert("Failed!")
                  })
              }
            }
          }
        })
      },
      err => {
        console.log(err)
        alert("Failed!")
      }
    )
  }
}
