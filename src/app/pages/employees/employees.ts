import { Component, OnInit, inject, signal, viewChild } from '@angular/core';
import { EmployeesService } from '@core/services/employees/employees-service';
import { IEmployee } from '@common/interfaces';
import { BtnStyleEnum } from '@shared/enums';
import { Alert } from '@common/components/alert/alert';
import { Button } from '@common/components/button/button';
import { Table } from '@common/components/table/table';
import { SearchPipe } from '@common/pipes/search-pipe.js';
import { EmployeeModal } from '@common/components/modal/employee-modal/employee-modal';
import { EmployeeStatusEnum } from '@shared/enums/employee';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.html',
  standalone: true,
  imports: [Alert, Button, Table, SearchPipe, EmployeeModal],
})
export class Employees implements OnInit {
  private readonly employeesService = inject(EmployeesService);
  private readonly employeeModal = viewChild.required(EmployeeModal);

  protected readonly BtnStyleEnum = BtnStyleEnum;

  readonly isLoading = signal(false);
  readonly searchQuery = signal('');
  readonly alert = signal<{ message: string; type: 'success' | 'error' } | null>(null);
  private readonly editingEmployeeId = signal<string | null>(null);
  protected readonly employees = this.employeesService.employees;
  ngOnInit(): void {
    this.loadEmployees();
  }

  private loadEmployees(): void {
    this.isLoading.set(true);
    setTimeout(() => {
      this.employeesService.load(this.getMockEmployees());
      this.isLoading.set(false);
    }, 500);
  }

  openAddModal(): void {
    this.editingEmployeeId.set(null);
    this.employeeModal().open();
  }

  openEditModal(employee: IEmployee): void {
    this.editingEmployeeId.set(employee.id ?? null);
    this.employeeModal().open(employee);
  }

  handleSaveEmployee(employeeData: IEmployee): void {
    const editId = this.editingEmployeeId();

    if (editId) {
      this.employeesService.update(editId, employeeData);
      this.showAlert('تم تحديث الموظف بنجاح', 'success');
    } else {
      this.employeesService.add({
        ...employeeData,
        id: crypto.randomUUID(),
      });
      this.showAlert('تم إضافة الموظف بنجاح', 'success');
    }

    this.editingEmployeeId.set(null);
  }

  deleteEmployee(id: string): void {
    if (!confirm('هل أنت متأكد من حذف هذا الموظف؟')) return;

    this.employeesService.delete(id);
    this.showAlert('تم حذف الموظف بنجاح', 'success');
  }

  private showAlert(message: string, type: 'success' | 'error'): void {
    this.alert.set({ message, type });
    setTimeout(() => this.alert.set(null), 4000);
  }

  private getMockEmployees(): IEmployee[] {
    return [
      {
        id: '1',
        name: 'أحمد محمد علي',
        email: 'ahmed.ali@motorco.com',
        phone: '01001234567',
        position: 'مدير المبيعات',
        department: 'المبيعات',
        hireDate: '2022-01-15',
        salary: 5000,
        status: EmployeeStatusEnum.Active,
        hasAccount: true,
      },
      {
        id: '2',
        name: 'فاطمة عبدالرحمن',
        email: 'fatima.rahman@motorco.com',
        phone: '01101234567',
        position: 'محاسبة',
        department: 'المالية',
        hireDate: '2021-06-20',
        salary: 4000,
        status: EmployeeStatusEnum.Active,
        hasAccount: true,
      },
      {
        id: '3',
        name: 'محمود سالم إسماعيل',
        email: 'mahmoud.ismail@motorco.com',
        phone: '01201234567',
        position: 'فني ميكانيكا',
        department: 'الصيانة',
        hireDate: '2020-03-10',
        salary: 3500,
        status: EmployeeStatusEnum.Active,
        hasAccount: true,
      },
      {
        id: '4',
        name: 'نور الدين حسن',
        email: 'noor.hasan@motorco.com',
        phone: '01021234567',
        position: 'مسؤول المخزون',
        department: 'المستودع',
        hireDate: '2023-02-01',
        salary: 3200,
        status: EmployeeStatusEnum.Active,
        hasAccount: true,
      },
      {
        id: '5',
        name: 'سارة محمود عطا',
        email: 'sara.atta@motorco.com',
        phone: '01121234567',
        position: 'مشرف الموارد البشرية',
        department: 'الموارد البشرية',
        hireDate: '2021-09-15',
        salary: 4500,
        status: EmployeeStatusEnum.Active,
        hasAccount: true,
      },
      {
        id: '6',
        name: 'علي خالد محمد',
        email: 'ali.khalid@motorco.com',
        phone: '01221234567',
        position: 'فني الكهرباء',
        department: 'الصيانة',
        hireDate: '2022-11-01',
        salary: 3400,
        status: EmployeeStatusEnum.Inactive,
        hasAccount: false,
      },
    ];
  }
}
