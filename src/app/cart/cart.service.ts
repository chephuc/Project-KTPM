import {Injectable} from '@angular/core';
import {Product} from '../home-page/product/product';
import {BehaviorSubject, Observable, Subject, Subscriber, of} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class CartService {
  private itemsInCartSubject: BehaviorSubject<Product[]> = new BehaviorSubject([]);
  private itemsInCart: Product[] = [];

  constructor() {
    this.itemsInCartSubject.subscribe(_ => this.itemsInCart = _);
  }

  public addToCart(item: Product) {
    this.itemsInCartSubject.next([...this.itemsInCart, item]);
  }

  public getItems(): Observable<Product[]> {
    return this.itemsInCartSubject.asObservable();
  }

  public getTotalAmount(): Observable<number> {
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
}
