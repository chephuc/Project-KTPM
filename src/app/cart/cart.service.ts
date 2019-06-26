import { Injectable } from '@angular/core';
import { Product, Size } from '../home-page/product/product';
import { BehaviorSubject, Observable, Subject, Subscriber, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class CartService {
  private sizeInCartSubject: BehaviorSubject<Size[]> = new BehaviorSubject([]);
  private itemsInCartSubject: BehaviorSubject<Product[]> = new BehaviorSubject([]);
  private itemsInCart: Product[] = [];
  private sizeInCart: Size[] = [];

  constructor(private http: HttpClient) {
    this.itemsInCartSubject.subscribe(_ => this.itemsInCart = _);
    this.sizeInCartSubject.subscribe(_ => this.sizeInCart = _);
  }

  test(a) {
    return
  }

  public addToCart(item: Product, size: Size) {

    const currentItems = [...this.itemsInCart];
    // const items = currentItems.filter(_ => _.idShoes == item.idShoes);
    if (currentItems.length > 0) {
      for (var i = 0; i < currentItems.length; i++) {
        if (currentItems[i].idShoes === item.idShoes) {
          this.sizeInCart[i] = size;
          break;
        } else {
          if(i == currentItems.length - 1){
          this.sizeInCartSubject.next([...this.sizeInCart, size]);
          this.itemsInCartSubject.next([...this.itemsInCart, item]);
          }
        }
      }
    }
    else {
      this.sizeInCartSubject.next([...this.sizeInCart, size]);
      this.itemsInCartSubject.next([...this.itemsInCart, item]);
    }
  }

  public getItems(): Observable<Product[]> {
    return this.itemsInCartSubject.asObservable();
  }

  public getSize(): Observable<Size[]> {
    // return this.sizeInCart;
    return this.sizeInCartSubject.asObservable();
  }

  public getTotalAmount(): Observable<any> {
    return this.itemsInCartSubject.pipe(map((items: Product[]) => {
      return items.reduce((prev, curr: Product) => {
        return prev + curr.ShoesPrice;
      }, 0);
    }));
  }

  public removeFromCart(item: Product) {
    const currentItems = [...this.itemsInCart];
    const itemsWithoutRemoved = currentItems.filter(_ => _.idShoes !== item.idShoes);
    this.itemsInCartSubject.next(itemsWithoutRemoved);
  }

  public addOrder(order: any): Observable<any>{
    return this.http.post<any>("http://localhost:8000/api/order/add",order);
  }

  public updateDetail(detail: any): Observable<any>{
    return this.http.post<any>("http://localhost:8000/api/detail/update",detail);
  }
  public getsize(size: any): Observable<any>{
    return this.http.post<any>("http://localhost:8000/api/size",size);
  }
}
