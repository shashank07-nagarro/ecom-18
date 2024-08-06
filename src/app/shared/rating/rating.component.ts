import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss',
})
export class RatingComponent {
  @Input()
  product: Product | undefined;
  @Input() showFull: boolean = false;

  ratingClassArr: string[] = ['1', '2', '3', '4', '5'];

  constructor() {}

  ngOnChanges() {
    this.ratingClassArr = ['1', '2', '3', '4', '5'];
    this.setRating();
  }

  setRating() {
    this.ratingClassArr = this.ratingClassArr.map((num) => {
      let cls = 'bi-star';
      const rate = this.product?.rating?.rate;
      if (rate && +num <= rate) {
        cls += '-fill';
      } else if (rate && +num > rate && +num - 1 < rate) {
        cls += '-half';
      }
      return cls;
    }, this);
  }

  ngOnDestroy() {
    this.product = undefined;
  }
}
