import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';

import { HttpClient } from '@angular/common/http';

import { Product, Type } from '../home-page/product/product';
import { Category } from '../navbar/category'
import { UploadEntity } from '../upload-entity';

@Injectable()
export class AdminService {

  constructor( private http: HttpClient) {     
    }
    //SHOES
    public addShoes(shoes: Product): Observable<any>{
      return this.http.post<any>("http://localhost:8000/api/products/add",shoes);
    }

    public updateShoes(shoes: Product): Observable<any>{
      return this.http.post<any>("http://localhost:8000/api/products/update",shoes);
    }

    public deteleProduct(id: number): Observable<Product> {
      return this.http.get<Product>("http://localhost:8000/api/products/delete/" + id);
    }
    //TYPE
    public getType(): Observable<Type[]> {
      return this.http.get<Type[]>('http://localhost:8000/api/type/');
    }
    public addType(type: Type): Observable<any>{
      return this.http.post<any>("http://localhost:8000/api/type/add",type);
    }
    public deleteType(id: number): Observable<Type> {
      return this.http.get<Type>("http://localhost:8000/api/type/delete/" + id);
    }
    public updateType(type: Type): Observable<any>{
      return this.http.post<any>("http://localhost:8000/api/type/update",type);
    }
    //CATEGORY
    public getCategory(): Observable<Category[]>{
      return this.http.get<Category[]>('http://localhost:8000/api/category/');
    }
    public addCategory(category :Category): Observable<any>{
      return this.http.post<any>("http://localhost:8000/api/category/add", category)
    }
    public deleteCategory(id: number): Observable<Category> {
      return this.http.get<Category>("http://localhost:8000/api/category/delete/" + id);
    }
    public updateCategory(category: Category): Observable<any>{
      return this.http.post<any>("http://localhost:8000/api/category/update",category);
    }

    public uploadAvatarImage(file : FormData) : Observable<UploadEntity>{
      return this.http.post<UploadEntity>(`http://localhost:8000/upload`,file);
    }
    
}