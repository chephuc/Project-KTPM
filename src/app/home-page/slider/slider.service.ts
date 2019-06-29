import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';

import { HttpClient, HttpParams } from '@angular/common/http';


import { Slider } from './slider';


@Injectable()
export class ProductService {
  [x: string]: any;

  constructor( private http: HttpClient) {     
    }

  getAllProducts(): Observable<Slider[]> {
    return this.http.get<Slider[]>('http://nodeserver.hopto.org/api/slider/');
  }
}