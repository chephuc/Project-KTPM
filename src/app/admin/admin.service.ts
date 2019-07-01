import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';

import { HttpClient } from '@angular/common/http';

import { Product, Type, Detail, Size } from '../home-page/product/product';
import { User, Order } from '../admin/admin-user/User'
import { Category } from '../navbar/category'
import { UploadEntity } from '../upload-entity';

@Injectable()
export class AdminService {

  constructor( private http: HttpClient) {     
    }
    //SHOES
    public addShoes(shoes: Product): Observable<any>{
      return this.http.post<any>("http://nodeserver.hopto.org/api/products/add",shoes);
    }

    public updateShoes(shoes: Product): Observable<any>{
      return this.http.post<any>("http://nodeserver.hopto.org/api/products/update",shoes);
    }

    public deteleProduct(id: number): Observable<Product> {
      return this.http.get<Product>("http://nodeserver.hopto.org/api/products/delete/" + id);
    }
    //TYPE
    public getType(): Observable<Type[]> {
      return this.http.get<Type[]>('http://nodeserver.hopto.org/api/type/');
    }
    public addType(type: Type): Observable<any>{
      return this.http.post<any>("http://nodeserver.hopto.org/api/type/add",type);
    }
    public deleteType(id: number): Observable<Type> {
      return this.http.get<Type>("http://nodeserver.hopto.org/api/type/delete/" + id);
    }
    public updateType(type: Type): Observable<any>{
      return this.http.post<any>("http://nodeserver.hopto.org/api/type/update",type);
    }
    //CATEGORY
    public getCategory(): Observable<Category[]>{
      return this.http.get<Category[]>('http://nodeserver.hopto.org/api/category/');
    }
    public addCategory(category :Category): Observable<any>{
      return this.http.post<any>("http://nodeserver.hopto.org/api/category/add", category)
    }
    public deleteCategory(id: number): Observable<Category> {
      return this.http.get<Category>("http://nodeserver.hopto.org/api/category/delete/" + id);
    }
    public updateCategory(category: Category): Observable<any>{
      return this.http.post<any>("http://nodeserver.hopto.org/api/category/update",category);
    }
    //DETAIL
    public getDetail(): Observable<Detail[]>{
      return this.http.get<Detail[]>('http://nodeserver.hopto.org/api/size/detail');
    }
    public addDetail(detail :Detail): Observable<any>{
      return this.http.post<any>("http://nodeserver.hopto.org/api/detail/add", detail)
    }
    //SIZE
    public getAllSize(): Observable<Size[]>{
      return this.http.get<Size[]>('http://nodeserver.hopto.org/api/size/all');
    }

    //USER
    public getUser(): Observable<User[]>{
      return this.http.get<User[]>('http://nodeserver.hopto.org/api/getusers');
    }
    //ORDER
    public getOrder(): Observable<Order[]>{
      return this.http.get<Order[]>('http://nodeserver.hopto.org/api/getorders');
    }
    public uploadAvatarImage(file : FormData) : Observable<UploadEntity>{
      return this.http.post<UploadEntity>(`http://nodeserver.hopto.org/upload`,file);
    }
    
}