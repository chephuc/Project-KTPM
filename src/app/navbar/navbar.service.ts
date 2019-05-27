import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';

import { HttpClient, HttpParams } from '@angular/common/http';


import { Category } from './category';


@Injectable()
export class CategoryService {

  constructor( private http: HttpClient) {     
    }

  getCategory(): Observable<Category[]> {
    return this.http.get<Category[]>('http://localhost:8000/api/category/');
  }
  
  // getProductCategory(id: number): Observable<Category[]> {
  //   return this.http.get<Category[]>('http://localhost:8000/api/category/' + id);
  // }
}