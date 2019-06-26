import { Component, OnInit } from '@angular/core';
import { Product,Size } from '../home-page/product/product';
import { ProductService } from '../home-page/product/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  providers:[ProductService]
})
export class ProductDetailComponent implements OnInit {
  productList: Product;
  productSize: Size[];
  Selected: number;

  constructor(
    private data:ProductService, 
    private route: ActivatedRoute, 
    private cartService: CartService, 
    private router: Router) { 

    }

  ngOnInit() {

    this.route.params.subscribe(params =>{
      
      this.data.getProduct(+params.id).subscribe(data =>{
        this.productList = data;
        console.log(data);
      })

      this.data.getProductSize(+params.id).subscribe(data =>{
        this.productSize = data;
        console.log(data);
      })
    });
  }

  public addToCart(product: Product, Size: Size) {
    if(!this.Selected){
      alert("Please select size!")
    }else{
      this.cartService.addToCart(product,Size);
      this.router.navigateByUrl('/');
    }
  } 
}
