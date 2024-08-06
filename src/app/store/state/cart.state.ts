import { Cart } from '../../models/cart.model';

export interface CartState {
  items: Cart[];
}

export const initialCartState: CartState = {
  items: [],
};
