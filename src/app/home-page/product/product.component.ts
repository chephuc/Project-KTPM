import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { Product } from './product';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers:[ProductService]
})
export class ProductComponent implements OnInit {

  constructor(private _service: ProductService, private route: ActivatedRoute) { }
  productList: Product[];

  ngOnInit() {
    this._service.getAllProducts().subscribe(data=>this.productList=data);
  }
}
