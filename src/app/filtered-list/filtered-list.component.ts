import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, switchMap, take } from 'rxjs';
import { Meta } from '@angular/platform-browser';
import { BreadcrumbComponent } from '../shared/breadcrumb/breadcrumb.component';
import { ProductListComponent } from '../product-list/product-list.component';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-filtered-list',
  standalone: true,
  templateUrl: './filtered-list.component.html',
  styleUrl: './filtered-list.component.scss',
  imports: [
    BreadcrumbComponent,
    ProductListComponent,
    CommonModule,
    MatSliderModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    JsonPipe,
    ReactiveFormsModule,
  ],
})
export class FilteredListComponent {
  filterData$: Observable<Object>;
  min = 99;
  max = 1000;
  step = 100;
  minPrice = 99;
  maxPrice = 1000;
  colorList = ['black', 'white', 'red', 'grey', 'yellow'];
  private readonly _formBuilder = inject(FormBuilder);

  selectedColors;
  color: string[] = [];

  constructor(private route: ActivatedRoute, private meta: Meta) {
    const colorObj = this.colorList.reduce(
      (a, v) => ({ ...a, [v]: false }),
      {}
    );
    this.selectedColors = this._formBuilder.group(colorObj);
    this.filterData$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const filterData = {
          category: params.get('category'),
          gender: params.get('gender'),
          minPrice: this.minPrice,
          maxPrice: this.maxPrice,
          color: [],
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

  ngOnInit() {
    this.selectedColors.valueChanges.subscribe((data: any) => {
      this.color = Object.keys(data).filter((key) => data[key] && key);
      this.modelChangeFn();
    });
  }

  modelChangeFn() {
    this.filterData$ = this.filterData$.pipe(
      switchMap((data: any) => {
        const filterData = {
          category: data.category,
          gender: data.gender,
          minPrice: this.minPrice,
          maxPrice: this.maxPrice,
          color: this.color,
        };
        return of(filterData);
      })
    );
  }
}
