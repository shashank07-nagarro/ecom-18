// cart.component.ts
import { ChangeDetectorRef, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartState } from '../store/state/cart.state';
import {
  addProduct,
  removeProduct,
  clearCart,
  decreaseProduct,
} from '../store/actions/cart.actions';
import {
  selectCartData,
  selectCartTatalItemCount,
  selectCartTatalPrice,
} from '../store/selectors/cart.selector';
import { Cart } from '../models/cart.model';
import { Product } from '../models/product.model';
import { UtilityService } from '../services/utility.service';
import { AsyncPipe, CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductListComponent } from '../product-list/product-list.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    CurrencyPipe,
    AsyncPipe,
    ProductListComponent,
  ],
})
export class CartComponent {
  items$: Observable<Cart[]>;
  selectCartTatalItemCount$: Observable<number>;
  selectCartTatalPrice$: Observable<number>;
  shippingCharge: number = 5;
  recommendedItem = '';

  constructor(
    private store: Store<{ cart: CartState }>,
    public util: UtilityService,
    private cdr: ChangeDetectorRef
  ) {
    this.items$ = store.select(selectCartData);
    this.selectCartTatalItemCount$ = store.select(selectCartTatalItemCount);
    this.selectCartTatalPrice$ = store.select(selectCartTatalPrice);
  }

  addProduct(item: Product) {
    this.store.dispatch(addProduct({ item }));
  }

  decreaseProduct(itemId: number) {
    this.store.dispatch(decreaseProduct({ itemId }));
  }

  removeProduct(itemId: number) {
    this.store.dispatch(removeProduct({ itemId }));
  }

  setRecom(product: Product, last: boolean) {
    if (last) {
      this.cdr.markForCheck();
      this.recommendedItem = product.categories[0].alias;
    }
  }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
  }

  clearCart() {
    this.store.dispatch(clearCart());
  }
}
