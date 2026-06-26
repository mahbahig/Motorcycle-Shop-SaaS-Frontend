import { HttpClient } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Service()
export class EmployeesService {
  private readonly httpClient = inject(HttpClient);
}
