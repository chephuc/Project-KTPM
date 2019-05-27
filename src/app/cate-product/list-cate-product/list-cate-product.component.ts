import { Component, OnInit } from '@angular/core';
import { ListCateProductService } from './list-cate-product.service';
import { CateProduct } from './cateproduct';

@Component({
  selector: 'app-list-cate-product',
  templateUrl: './list-cate-product.component.html',
  styleUrls: ['./list-cate-product.component.css'],
  providers:[ListCateProductService]
})
export class ListCateProductComponent implements OnInit {

  constructor(private data: ListCateProductService) { }
  categoryList: CateProduct[];
  ngOnInit() {
    this.data.getCategory().subscribe(data=>{
      this.categoryList=data
      console.log(data);
    });
  }
}