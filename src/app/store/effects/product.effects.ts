import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductActions from '../actions/product.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProductService } from '../../services/product.service';

@Injectable()
export class ProductEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadFilteredProducts),
      mergeMap((action) => {
        return this.productService.getProducts(action.filter).pipe(
          map((products) => ProductActions.loadProductsSuccess({ products })),
          catchError((error) =>
            of(ProductActions.loadProductsFailure({ error }))
          )
        );
      })
    )
  );

  loadSearchedProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.loadSearchedProducts),
      mergeMap((action) => {
        return this.productService.getSearchedProducts(action.filter).pipe(
          map((searchedProducts) =>
            ProductActions.loadSearchedProductsSuccess({ searchedProducts })
          ),
          catchError((error) =>
            of(ProductActions.loadProductsFailure({ error }))
          )
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}
}
