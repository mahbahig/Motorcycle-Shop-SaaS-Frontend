import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { productApiEndpoints } from '@common/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly httpClient = inject(HttpClient);

  createProduct(body: {name: string, supplier: string, description?: string, buyingPrice: number, sellingPrice: number}): Observable<any> {
    return this.httpClient.post(productApiEndpoints.createProduct, body);
  }

  getAllProducts(): Observable<any> {
    return this.httpClient.get(productApiEndpoints.getAllProducts);
  }

  getSupplierProducts(supplierId: string): Observable<any> {
    return this.httpClient.get(productApiEndpoints.getSupplierProducts(supplierId));
  }

  getProductById(id: string): Observable<any> {
    return this.httpClient.get(productApiEndpoints.getProductById(id));
  }
  updateProduct(id: string, body: any): Observable<any> {
    return this.httpClient.patch(productApiEndpoints.updateProduct(id), body);
  }

  deleteProduct(id: string): Observable<any> {
    return this.httpClient.delete(productApiEndpoints.deleteProduct(id));
  }



}
