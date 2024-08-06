// cart.actions.ts
import { createAction, props } from '@ngrx/store';
import { Product } from '../../models/product.model';

export const addProduct = createAction(
  '[Cart] Add To Cart',
  props<{ item: Product }>()
);
export const decreaseProduct = createAction(
  '[Cart] Decrease Cart',
  props<{ itemId: number }>()
);
export const removeProduct = createAction(
  '[Cart] Remove Cart',
  props<{ itemId: number }>()
);
export const clearCart = createAction('[Cart] Clear Cart');
