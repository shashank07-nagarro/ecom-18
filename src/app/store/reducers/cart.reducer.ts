// cart.reducer.ts
import { createReducer, on } from '@ngrx/store';
import {
  addProduct,
  removeProduct,
  clearCart,
  decreaseProduct,
} from '../actions/cart.actions';
import { initialCartState } from '../state/cart.state';
import { Cart } from '../../models/cart.model';

export const cartReducer = createReducer(
  initialCartState,
  on(addProduct, (state, { item }) => {
    let newItem = { ...item };
    let stateItem = JSON.parse(JSON.stringify(state.items));
    const existingItemIndex = stateItem.findIndex(
      (it: Cart) => it.id === item.id
    );
    if (existingItemIndex > -1) {
      stateItem[existingItemIndex]['count']++;
    } else {
      stateItem = [...stateItem, { ...newItem, count: 1 }];
    }
    return {
      ...state,
      items: [...stateItem],
    };
  }),
  on(decreaseProduct, (state, { itemId }) => {
    let stateItem = JSON.parse(JSON.stringify(state.items));
    const existingItemIndex = stateItem.findIndex(
      (it: Cart) => it.id === itemId
    );
    if (existingItemIndex > -1) {
      stateItem[existingItemIndex]['count']--;
      if (!stateItem[existingItemIndex]['count']) {
        stateItem.splice(existingItemIndex, 1);
      }
    }
    return {
      ...state,
      items: stateItem,
    };
  }),
  on(removeProduct, (state, { itemId }) => ({
    ...state,
    items: state.items.filter((item) => item.id !== +itemId),
  })),
  on(clearCart, (state) => ({
    ...state,
    items: [],
  }))
);
