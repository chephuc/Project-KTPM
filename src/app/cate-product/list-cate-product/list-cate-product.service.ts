import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';

import { HttpClient, HttpParams } from '@angular/common/http';


import { CateProduct } from './cateproduct';


@Injectable()
export class ListCateProductService {

  constructor( private http: HttpClient) {     
    }

  getCategory(): Observable<CateProduct[]> {
    return this.http.get<CateProduct[]>('http://nodeserver.hopto.org/api/category/');
  }
  
  getProductCategory(id: number): Observable<CateProduct[]> {
    return this.http.get<CateProduct[]>('http://nodeserver.hopto.org/api/category/' + id);
  }
}