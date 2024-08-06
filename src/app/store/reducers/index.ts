// store/reducers/index.ts
import { ActionReducerMap } from '@ngrx/store';
import { cartReducer } from './cart.reducer';
import { CartState } from '../state/cart.state';
import { ProductState } from '../state/product.state';
import { productReducer } from './product.reducers';

export interface AppState {
  cart: CartState;
  products: ProductState;
}

export const reducers: ActionReducerMap<AppState> = {
  cart: cartReducer,
  products: productReducer,
};
