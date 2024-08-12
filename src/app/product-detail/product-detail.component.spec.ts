import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ProductDetailComponent } from './product-detail.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ProductService } from '../services/product.service';
import { Meta } from '@angular/platform-browser';
import { addProduct } from '../store/actions/cart.actions';
import { CartState } from '../store/state/cart.state';
import { Product } from '../models/product.model';
import { CommonModule } from '@angular/common';

import { provideStore, Store } from '@ngrx/store';
import { reducers } from '../store/reducers';
import { metaReducers } from '../meta-reducers';

import { loadState } from '../local-storage';

const isBrowser =
  typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
const initialState = isBrowser ? loadState('ngrx-state') : undefined;
const product: Product = {
  id: 1,
  title: 'Test Product',
  categories: [{ title: 'Category1' }],
  genders: [{ title: 'Male' }],
  price: 100,
  alias: 'test',
  mrp: 200,
  images: [],
};

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let productService: jasmine.SpyObj<ProductService>;
  let store: jasmine.SpyObj<Store<{ cart: CartState }>>;
  let meta: Meta;

  beforeEach(async () => {
    // Create spies for services
    const productServiceSpy = jasmine.createSpyObj('ProductService', [
      'getProductById',
    ]);
    const storeSpy = jasmine.createSpyObj('Store', ['dispatch']);

    await TestBed.configureTestingModule({
      imports: [
        ProductDetailComponent, // Standalone component
        CommonModule,
      ],
      providers: [
        { provide: ProductService, useValue: productServiceSpy },
        { provide: Store, useValue: storeSpy },
        {
          provide: ActivatedRoute,
          useValue: { paramMap: of({ get: () => '1' }) },
        },
        Meta,
        provideStore(reducers, { metaReducers, initialState }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(
      ProductService
    ) as jasmine.SpyObj<ProductService>;
    store = TestBed.inject(Store) as jasmine.SpyObj<Store<{ cart: CartState }>>;
    meta = TestBed.inject(Meta);

    productService.getProductById.and.returnValue(of(product));

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch product by id on initialization', () => {
    component.product$.subscribe((product) => {
      expect(product).toEqual(product);
    });
    expect(productService.getProductById).toHaveBeenCalledWith(1);
  });
});
