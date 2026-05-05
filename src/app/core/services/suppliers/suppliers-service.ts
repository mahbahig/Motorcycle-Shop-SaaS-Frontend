import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { supplierApiEndpoints } from '@common/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SuppliersService {
  private readonly httpClient = inject(HttpClient);

  createSupplier(body: { name: string }): Observable<any> {
    return this.httpClient.post(supplierApiEndpoints.createSupplier, body);
  }

  getAllSuppliers(): Observable<any> {
    return this.httpClient.get(supplierApiEndpoints.getAllSuppliers);
  }

  deleteSupplier(id: string): Observable<any> {
    return this.httpClient.delete(supplierApiEndpoints.deleteSupplier(id));
  }
}
