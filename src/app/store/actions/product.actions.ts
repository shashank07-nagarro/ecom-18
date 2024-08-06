import { createAction, props } from '@ngrx/store';
import { Product } from '../../models/product.model';

export const loadProducts = createAction('[Product List] Load Products');

export const loadFilteredProducts = createAction(
  '[Product List] Load Filtered Products',
  props<{ filter: any }>()
);

export const loadSearchedProducts = createAction(
  '[Product List] Load Search Products',
  props<{ filter: any }>()
);
export const clearSearchedProducts = createAction(
  '[Product List] Clear Search Products'
);
export const loadProductsSuccess = createAction(
  '[Product List] Load Products Success',
  props<{ products: Product[] }>()
);
export const loadSearchedProductsSuccess = createAction(
  '[Product List] Load Searched Products Success',
  props<{ searchedProducts: Product[] }>()
);
export const loadProductsFailure = createAction(
  '[Product List] Load Products Failure',
  props<{ error: any }>()
);
