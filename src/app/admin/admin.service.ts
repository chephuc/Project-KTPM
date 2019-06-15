import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';

import { HttpClient } from '@angular/common/http';

import { Product, Type } from '../home-page/product/product';
import { Category } from '../navbar/category'

@Injectable()
export class AdminService {

  constructor( private http: HttpClient) {     
    }

    public addShoes(shoes: Product): Observable<any>{
      return this.http.post<any>("http://localhost:8000/api/products/add",shoes);
    }
    public getType(): Observable<Type[]> {
      return this.http.get<Type[]>('http://localhost:8000/api/type/');
    }
    public getCategory(): Observable<Category[]>{
      return this.http.get<Category[]>('http://localhost:8000/api/category/');
    }
    public deteleProduct(id: number): Observable<Product> {
      return this.http.get<Product>("http://localhost:8000/api/products/delete/" + id);
    }
}