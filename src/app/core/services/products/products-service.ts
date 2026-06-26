import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { productApiEndpoints } from '@common/environments';
import { Product } from '@common/interfaces';
import { Observable } from 'rxjs';

@Service()
export class ProductsService {
  private readonly httpClient = inject(HttpClient);

  createProduct(body: {
    name: string;
    supplier: string;
    description?: string;
    buyingPrice: number;
    sellingPrice: number;
  }): Observable<unknown> {
    return this.httpClient.post(productApiEndpoints.createProduct, body);
  }

  getAllProducts(): Observable<unknown> {
    return this.httpClient.get(productApiEndpoints.getAllProducts);
  }

  getSupplierProducts(supplierId: string): Observable<unknown> {
    return this.httpClient.get(productApiEndpoints.getSupplierProducts(supplierId));
  }

  getProductById(id: string): Observable<unknown> {
    return this.httpClient.get(productApiEndpoints.getProductById(id));
  }

  updateProduct(id: string, body: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>): Observable<unknown> {
    return this.httpClient.patch(productApiEndpoints.updateProduct(id), body);
  }

  deleteProduct(id: string): Observable<unknown> {
    return this.httpClient.delete(productApiEndpoints.deleteProduct(id));
  }
}
