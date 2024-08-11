import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-price',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './price.component.html',
  styleUrl: './price.component.css',
})
export class PriceComponent {
  Math = Math;
  @Input()
  product!: Product;

  @Input()
  flexDirection: string = 'row';

  @Input()
  position: string = 'center';
}
