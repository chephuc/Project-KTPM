import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';

import { HttpClient, HttpParams } from '@angular/common/http';


import { Bestseller } from './best-seller';


@Injectable()
export class ProductService {

  constructor( private http: HttpClient) {     
    }

  getAllProducts(): Observable<Bestseller[]> {
    return this.http.get<Bestseller[]>('http://nodeserver.hopto.org/api/products/bestseller');
  }
}