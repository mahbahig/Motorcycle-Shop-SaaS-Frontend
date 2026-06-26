import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { supplierApiEndpoints } from '@common/environments';
import { Observable } from 'rxjs';

@Service()
export class SuppliersService {
  private readonly httpClient = inject(HttpClient);

  createSupplier(body: { name: string }): Observable<unknown> {
    return this.httpClient.post(supplierApiEndpoints.createSupplier, body);
  }

  getAllSuppliers(): Observable<unknown> {
    return this.httpClient.get(supplierApiEndpoints.getAllSuppliers);
  }

  deleteSupplier(id: string): Observable<unknown> {
    return this.httpClient.delete(supplierApiEndpoints.deleteSupplier(id));
  }
}
