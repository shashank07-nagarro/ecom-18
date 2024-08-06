import { createSelector } from '@ngrx/store';
import { Cart } from '../../models/cart.model';

export const selectCartState = (state: any) => {
  return state.cart;
};

export const selectCartData = createSelector(selectCartState, (state) => {
  return state.items;
});

export const selectCartTatalItemCount = createSelector(
  selectCartState,
  (state) => {
    return state.items.reduce((accumulator: number, currentValue: Cart) => {
      return accumulator + currentValue.count;
    }, 0);
  }
);

export const selectCartTatalPrice = createSelector(selectCartState, (state) => {
  return state.items.reduce((accumulator: number, currentValue: Cart) => {
    return accumulator + currentValue.price * currentValue.count;
  }, 0);
});
