import { Component, OnInit } from '@angular/core';
import { CateProduct } from './list-cate-product/cateproduct';
import { ListCateProductService } from './list-cate-product/list-cate-product.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-cate-product',
  templateUrl: './cate-product.component.html',
  styleUrls: ['./cate-product.component.css'],
  providers:[ListCateProductService]
})

export class CateProductComponent implements OnInit {
  cateproductList: CateProduct[];
  constructor(private data:ListCateProductService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params =>{
      
      this.data.getProductCategory(+params.id).subscribe(data =>{
        this.cateproductList = data;
        console.log(data);
      })
    })
  }
}
