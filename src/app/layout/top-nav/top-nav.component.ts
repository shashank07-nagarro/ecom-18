import { Component } from '@angular/core';
import { ProductState } from '../../store/state/product.state';
import { Store } from '@ngrx/store';
import { selectCartTatalItemCount } from '../../store/selectors/cart.selector';
import { debounceTime, distinctUntilChanged, Observable } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../models/product.model';
import {
  selectProductList,
  selectSearchedProductList,
} from '../../store/selectors/product.selector';
import {
  clearSearchedProducts,
  loadSearchedProducts,
} from '../../store/actions/product.actions';

@Component({
  selector: 'app-top-nav',
  standalone: true,
  templateUrl: './top-nav.component.html',
  styleUrl: './top-nav.component.scss',
  imports: [
    RouterModule,
    AsyncPipe,
    FormsModule,
    ReactiveFormsModule,
    JsonPipe,
  ],
})
export class TopNavComponent {
  selectCartTatalItemCount$: Observable<number>;
  searchValue: FormControl = new FormControl('');
  items$: Observable<Product[]>;

  constructor(
    private store: Store<{ cart: ProductState }>,
    private router: Router
  ) {
    this.selectCartTatalItemCount$ = store.select(selectCartTatalItemCount);
    this.items$ = store.select(selectSearchedProductList);
  }

  ngOnInit() {
    this.searchValue.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((text) => {
        if (text.length > 2) {
          this.store.dispatch(
            loadSearchedProducts({ filter: { text: text.trim() } })
          );
        }
      });
  }
  goToProduct(product: any) {
    this.router.navigate(['/', product.category, product.alias, product.id]);
    this.searchValue.setValue('');
    this.store.dispatch(clearSearchedProducts());
  }

  onInputChange(event: any) {
    const options = event.target.list.options;
    let selectedObject: any = {};
    if (options.length && this.searchValue.value) {
      for (const element of options) {
        if (element.value === this.searchValue.value) {
          selectedObject = JSON.parse(element.getAttribute('data-value'));
          break;
        }
      }
      selectedObject?.id && this.goToProduct(selectedObject);
    }
  }

  ngOnDestroy() {
    this.searchValue.setValue('');
    this.store.dispatch(clearSearchedProducts());
  }
}
