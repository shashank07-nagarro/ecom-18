import { createSelector } from '@ngrx/store';

export const selectProductState = (state: any) => {
  return state.products;
};

export const selectProductList = createSelector(selectProductState, (state) => {
  return state.products;
});

export const selectSearchedProductList = createSelector(
  selectProductState,
  (state) => {
    return state.searchedProducts;
  }
);
