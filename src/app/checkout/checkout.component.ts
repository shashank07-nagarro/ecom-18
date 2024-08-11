import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartState } from '../store/state/cart.state';
import {
  selectCartData,
  selectCartTatalItemCount,
  selectCartTatalPrice,
} from '../store/selectors/cart.selector';
import { Cart } from '../models/cart.model';
import { Product } from '../models/product.model';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { PriceComponent } from '../shared/price/price.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, PriceComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  items$: Observable<Cart[]>;
  selectCartTatalItemCount$: Observable<number>;
  selectCartTatalPrice$: Observable<number>;
  shippingCharge: number = 5;

  constructor(private store: Store<{ cart: CartState }>) {
    this.items$ = store.select(selectCartData);
    this.selectCartTatalItemCount$ = store.select(selectCartTatalItemCount);
    this.selectCartTatalPrice$ = store.select(selectCartTatalPrice);
  }
}
