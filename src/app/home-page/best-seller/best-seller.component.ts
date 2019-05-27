import { Component, OnInit } from '@angular/core';
import { ProductService } from './best-seller.service';
import { Bestseller } from './best-seller';

@Component({
  selector: 'app-best-seller',
  templateUrl: './best-seller.component.html',
  styleUrls: ['./best-seller.component.css'],
  providers:[ProductService]
})
export class BestSellerComponent implements OnInit {

  constructor(private _service: ProductService) { }
  bestsellerList: Bestseller[];

  ngOnInit() {
    this._service.getAllProducts().subscribe(data=>this.bestsellerList=data);
  }
}
