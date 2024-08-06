import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, switchMap, take } from 'rxjs';
import { Meta } from '@angular/platform-browser';
import { BreadcrumbComponent } from '../shared/breadcrumb/breadcrumb.component';
import { ProductListComponent } from '../product-list/product-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filtered-list',
  standalone: true,
  templateUrl: './filtered-list.component.html',
  styleUrl: './filtered-list.component.scss',
  imports: [BreadcrumbComponent, ProductListComponent, CommonModule],
})
export class FilteredListComponent {
  filterData$: Observable<Object>;
  constructor(private route: ActivatedRoute, private meta: Meta) {
    this.filterData$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const filterData = {
          category: params.get('category'),
          gender: params.get('gender'),
        };
        return of(filterData);
      })
    );

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
