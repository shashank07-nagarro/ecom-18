import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { Product } from '../models/product.model';

const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Product 1',
    categories: [],
    genders: [],
    price: 100,
    mrp: 200,
    alias: 'pro1',
    images: [],
  },
  {
    id: 2,
    title: 'Product 2',
    categories: [],
    genders: [],
    price: 200,
    mrp: 300,
    alias: 'pro2',
    images: [],
  },
];

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:3000/products';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });

    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch products with filter', () => {
    const filterData = { category: 'Clothing', gender: 'Male' };

    service.getProducts(filterData).subscribe((products) => {
      expect(products.length).toBe(2);
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne(`${apiUrl}/filter`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(filterData);
    req.flush(mockProducts);
  });

  it('should fetch searched products', () => {
    const mockProducts: Product[] = [
      {
        id: 3,
        title: 'Product 3',
        categories: [],
        genders: [],
        price: 150,
        mrp: 200,
        alias: 'pro1',
        images: [],
      },
    ];

    const searchFilterData = { query: 'Shoes' };

    service.getSearchedProducts(searchFilterData).subscribe((products) => {
      expect(products.length).toBe(1);
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne(`${apiUrl}/search`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(searchFilterData);
    req.flush(mockProducts);
  });

  it('should fetch product by id', () => {
    const mockProduct: Product = mockProducts[0];

    service.getProductById(1).subscribe((product) => {
      expect(product).toEqual(mockProduct);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProduct);
  });

  it('should handle null id in getProductById gracefully', () => {
    service.getProductById(null).subscribe((product) => {
      expect(product).toBeNull();
    });

    const req = httpMock.expectOne(`${apiUrl}/null`);
    expect(req.request.method).toBe('GET');
    req.flush(null);
  });
});
