import { Component, OnInit } from '@angular/core';
import { CategoryService } from './navbar.service';
import { Category } from './category';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {CartService} from '../cart/cart.service';
import {Observable} from 'rxjs';
import {Product} from '../home-page/product/product';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers:[CategoryService]
})
export class NavbarComponent implements OnInit {

  public shoppingCartItems$: Observable<Product[]>;

  constructor(
    private data: CategoryService,
    public location: Location,
    private cartService: CartService
  ) {  
    this.shoppingCartItems$ = this
      .cartService
      .getItems();

    this.shoppingCartItems$.subscribe(_ => _);
  }
  categoryList: Category[];
  ngOnInit() {
    //this.run();
    this.data.getCategory().subscribe(data=>{
      this.categoryList=data
      console.log(data);
    });
  }

  // run = () => {
  //   var modal1 = document.getElementById('id01');
  //   var modal2 = document.getElementById('id02');
  
  //   // When the user clicks anywhere outside of the modal, close it
  //   window.onclick = function(event) {
  //     if (event.target == modal1 || event.target == modal2) {
  //         modal1.style.display = "none";
  //         modal2.style.display = "none";
  //     }
  //   }
  // }

}
