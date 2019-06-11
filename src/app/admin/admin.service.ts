import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';

import { HttpClient } from '@angular/common/http';

import { Product } from '../home-page/product/product';


@Injectable()
export class AdminService {

  constructor( private http: HttpClient) {     
    }

    public addShoes(shoes: Product): Observable<any>{
        return this.http.post<any>("http://localhost:8000/api/products/add",shoes);
    }

}