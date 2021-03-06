import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';

import { HttpClient, HttpParams } from '@angular/common/http';


import { Product,Size } from './product';


@Injectable()
export class ProductService {

  constructor( private http: HttpClient) {     
    }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('http://nodeserver.hopto.org/api/products');
  }
    
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('http://nodeserver.hopto.org/api/products/newreleases');
  }
  
  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>('http://nodeserver.hopto.org/api/products/' + id);
  }

  getProductSize(id: number): Observable<Size[]> {
    return this.http.get<Size[]>('http://nodeserver.hopto.org/api/products/size/' + id);
  }
}