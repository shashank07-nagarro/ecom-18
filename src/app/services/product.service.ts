import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  getProducts(filterData: {}): Observable<Product[]> {
    return this.http.post<Product[]>(`${this.apiUrl}/filter`, filterData);
  }

  getSearchedProducts(filterData: {}): Observable<Product[]> {
    return this.http.post<Product[]>(`${this.apiUrl}/search`, filterData);
  }

  getProductById(id: number | null): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
}
