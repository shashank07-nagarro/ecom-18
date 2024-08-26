import {
  Component,
  effect,
  input,
  Input,
  Signal,
  SimpleChanges,
  WritableSignal,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductState } from '../store/state/product.state';
import { Store } from '@ngrx/store';
import { selectProductList } from '../store/selectors/product.selector';
import {
  loadFilteredProducts,
  loadProducts,
} from '../store/actions/product.actions';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  imports: [CommonModule, ProductCardComponent],
})
export class ProductListComponent {
  items$: Observable<Product[]>;
  //@Input() filterData: any = {};
  filterData = input<{}>({});
  colsMd = input(3);
  colsSm = input(2);
  colsXl = input(4);

  constructor(private store: Store<{ cart: ProductState }>) {
    this.items$ = store.select(selectProductList);
  }

  private effect = effect(
    () => {
      this.store.dispatch(
        loadFilteredProducts({ filter: { ...this.filterData() } })
      );
    },
    { allowSignalWrites: true }
  );

  ngOnInit() {
    // this.store.dispatch(loadFilteredProducts({ filter: this.filterData }));
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes['filterData'].previousValue) {
  //     this.store.dispatch(loadFilteredProducts({ filter: this.filterData }));
  //   }
  // }
}
