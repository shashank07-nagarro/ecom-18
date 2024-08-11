import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { FilteredListComponent } from './filtered-list/filtered-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'cart',
    loadComponent: () =>
      import('./cart/cart.component').then((m) => m.CartComponent),
  },
  {
    path: 'checkout',
    loadComponent: () =>
      import('./checkout/checkout.component').then((m) => m.CheckoutComponent),
  },
  {
    path: ':category/:title/:id',
    loadComponent: () =>
      import('./product-detail/product-detail.component').then(
        (m) => m.ProductDetailComponent
      ),
  },
  {
    path: ':category/:gender',
    loadComponent: () =>
      import('./filtered-list/filtered-list.component').then(
        (m) => m.FilteredListComponent
      ),
  },
  {
    path: ':category',
    loadComponent: () =>
      import('./filtered-list/filtered-list.component').then(
        (m) => m.FilteredListComponent
      ),
  },
];
