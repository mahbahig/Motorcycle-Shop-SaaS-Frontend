import { Injectable, signal } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { IEmployee } from '@common/interfaces';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  // Optional: inject HttpClient when ready
  // private readonly http = inject(HttpClient);

  private readonly employeesSignal = signal<IEmployee[]>([]);

  // Components subscribe to this signal safely
  readonly employees = this.employeesSignal.asReadonly();

  /**
   * Load all employees from the server
   * Replace `of(mockData)` with `this.http.get<IEmployee[]>('/api/employees')`
   */
  load(mockEmployees: IEmployee[]): Observable<IEmployee[]> {
    return of(mockEmployees).pipe(
      tap((employees) => this.employeesSignal.set(employees))
    );
  }

  /**
   * Add a new employee to the server
   * Replace with `this.http.post<IEmployee>('/api/employees', employee)`
   */
  add(employee: IEmployee): Observable<IEmployee> {
    return of(employee).pipe(
      tap((newEmp) => this.employeesSignal.update((list) => [...list, newEmp]))
    );
  }

  /**
   * Update an existing employee on the server
   * Replace with `this.http.patch<IEmployee>(`/api/employees/${id}`, employee)`
   */
  update(id: string, employee: Partial<IEmployee>): Observable<void> {
    return of(void 0).pipe(
      tap(() =>
        this.employeesSignal.update((list) =>
          list.map((e) => (e.id === id ? { ...e, ...employee } : e))
        )
      )
    );
  }

  /**
   * Delete an employee from the server
   * Replace with `this.http.delete<void>(`/api/employees/${id}`)`
   */
  delete(id: string): Observable<void> {
    return of(void 0).pipe(
      tap(() =>
        this.employeesSignal.update((list) => list.filter((e) => e.id !== id))
      )
    );
  }
}