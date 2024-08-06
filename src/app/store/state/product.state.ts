// cart.state.ts
import { Product } from '../../models/product.model';

export interface ProductState {
  products: Product[];
  searchedProducts: Product[];
}

export const initialProductsState: ProductState = {
  products: [],
  searchedProducts: [],
};
