import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';

import { HttpClient, HttpParams } from '@angular/common/http';


import { Product } from './product';


@Injectable()
export class ProductService {

  constructor( private http: HttpClient) {     
    }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:8000/api/products/newreleases');
  }
  
  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>('http://localhost:8000/api/products/' + id);
  }
}