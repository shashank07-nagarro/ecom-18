import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { ProductService } from '../services/product.service';
import { addProduct } from '../store/actions/cart.actions';
import { Store } from '@ngrx/store';
import { CartState } from '../store/state/cart.state';
import { Product } from '../models/product.model';
import { Meta } from '@angular/platform-browser';
import { BreadcrumbComponent } from '../shared/breadcrumb/breadcrumb.component';
import { CommonModule, CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { ProductListComponent } from '../product-list/product-list.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
  imports: [
    BreadcrumbComponent,
    RouterModule,
    ProductListComponent,
    CommonModule,
    CurrencyPipe,
    NgOptimizedImage,
  ],
})
export class ProductDetailComponent {
  product$: Observable<any>;
  addedToCart: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private meta: Meta,
    private store: Store<{ cart: CartState }>
  ) {
    this.product$ = this.route.paramMap.pipe(
      switchMap((params) => {
        let id = params.get('id');
        return this.productService.getProductById(id ? +id : null);
      })
    );
  }

  addProduct(item: Product) {
    this.store.dispatch(addProduct({ item }));
    this.addedToCart = true;
  }

  addMeta(product: Product) {
    this.meta.addTags([
      {
        name: 'description',
        content: `${product.title}, Product id: ${product.id}`,
      },
      {
        name: 'keywords',
        content: `${product.title}, ${product.categories[0].title}, ${product.genders[0].title}, ${product.price}`,
      },
    ]);
  }
}
