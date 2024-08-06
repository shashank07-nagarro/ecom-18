import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { HeaderComponent } from '../layout/header/header.component';
import { ProductListComponent } from '../product-list/product-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [HeaderComponent, ProductListComponent],
})
export class HomeComponent {
  constructor(private meta: Meta) {
    this.meta.addTags([
      {
        name: 'description',
        content: `Online Shopping Site for Fashion & Lifestyle in India. India's Fashion Expert brings you a variety of footwear, Clothing, Accessories and lifestyle products for women & men`,
      },
      {
        name: 'keywords',
        content: `online shopping, online shopping sites, online shopping india, india shopping, Online shopping site`,
      },
    ]);
  }
}
