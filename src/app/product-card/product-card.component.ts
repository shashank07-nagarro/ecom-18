import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { addProduct } from '../store/actions/cart.actions';
import { Product } from '../models/product.model';
import { CartState } from '../store/state/cart.state';
import { Router, RouterModule } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { PriceComponent } from '../shared/price/price.component';

@Component({
  selector: 'app-product-card',
  standalone: true,
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  imports: [RouterModule, NgOptimizedImage, PriceComponent],
})
export class ProductCardComponent {
  @Input()
  product!: Product;
  addedToCart: boolean = false;

  constructor(
    private store: Store<{ cart: CartState }>,
    private router: Router
  ) {}
  addProduct(item: Product, event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.store.dispatch(addProduct({ item }));
    this.addedToCart = true;
  }

  goToCart(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.router.navigate(['/cart']);
  }
}
