import { Component, OnInit, inject, signal, computed, WritableSignal } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { EmployeesService } from '@core/services/employees/employees-service';
import { Alert } from '@common/components/alert/alert';

export interface Employee {
  id?: string;
  name: string;
  email?: string;
  phone?: string;
  position: string;
  department: string;
  hireDate?: string;
  salary?: number;
  status?: 'active' | 'inactive';
}

@Component({
  selector: 'app-employees',
  imports: [FormsModule, ReactiveFormsModule, Alert],
  templateUrl: './employees.html',
  styleUrl: './employees.css',
})
export class Employees implements OnInit {
  private readonly employeesService = inject(EmployeesService);
  private readonly fb = inject(FormBuilder);

  // State
  readonly employees: WritableSignal<Employee[]> = signal([]);
  readonly isLoading: WritableSignal<boolean> = signal(false);
  readonly showModal: WritableSignal<boolean> = signal(false);
  readonly modalMode: WritableSignal<'add' | 'edit'> = signal('add');
  readonly editingId: WritableSignal<string | null> = signal(null);
  readonly searchQuery: WritableSignal<string> = signal('');
  readonly alert: WritableSignal<{
    show: boolean;
    message: string;
    type: 'success' | 'error';
  } | null> = signal(null);

  readonly employeeForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    position: ['', Validators.required],
    department: ['', Validators.required],
    hireDate: [''],
    salary: ['', [Validators.required, Validators.min(0)]],
    status: ['active'],
  });

  ngOnInit(): void {
    this.loadEmployees();
  }

  // ── Mock Data (for testing) ────────────────────────────
  private getMockEmployees(): Employee[] {
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
        status: 'active',
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
        status: 'active',
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
        status: 'active',
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
        status: 'active',
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
        status: 'active',
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
        status: 'inactive',
      },
    ];
  }

  loadEmployees(): void {
    this.isLoading.set(true);
    // For now, use mock data. Replace with actual service call:
    // this.employeesService.getAllEmployees().subscribe({
    //   next: (data) => {
    //     this.employees.set(data);
    //     this.isLoading.set(false);
    //   },
    //   error: () => {
    //     this.showAlert('خطأ في تحميل البيانات', 'error');
    //     this.isLoading.set(false);
    //   },
    // });

    // Using mock data for demonstration
    setTimeout(() => {
      this.employees.set(this.getMockEmployees());
      this.isLoading.set(false);
    }, 500);
  }

  readonly filteredEmployees = computed(() => {
    const query = this.searchQuery().toLowerCase();
    return this.employees().filter(
      (employee) =>
        employee.name.toLowerCase().includes(query) ||
        employee.email?.toLowerCase().includes(query) ||
        employee.phone?.includes(query) ||
        employee.position.toLowerCase().includes(query) ||
        employee.department.toLowerCase().includes(query),
    );
  });

  openAddModal(): void {
    this.modalMode.set('add');
    this.editingId.set(null);
    this.employeeForm.reset({ status: 'active' });
    this.showModal.set(true);
  }

  openEditModal(employee: Employee): void {
    this.modalMode.set('edit');
    this.editingId.set(employee.id!);
    this.employeeForm.patchValue({ ...employee, salary: employee.salary?.toString() ?? '' });
    this.showModal.set(true);
  }

  closeModal(): void {
    this.showModal.set(false);
    this.employeeForm.reset();
  }

  submitForm(): void {
    if (!this.employeeForm.valid) {
      this.showAlert('الرجاء ملء جميع الحقول المطلوبة بشكل صحيح', 'error');
      return;
    }

    if (this.modalMode() === 'add') {
      this.addEmployee();
    } else {
      this.updateEmployee();
    }
  }

  private addEmployee(): void {
    const v = this.employeeForm.getRawValue();
    const newEmployee: Employee = {
      id: String(Date.now()),
      name: v.name ?? '',
      position: v.position ?? '',
      department: v.department ?? '',
      email: v.email ?? undefined,
      phone: v.phone ?? undefined,
      hireDate: v.hireDate ?? undefined,
      salary: v.salary ? Number(v.salary) : undefined,
      status: (v.status as Employee['status']) ?? 'active',
    };
    this.employees.update((emp) => [...emp, newEmployee]);
    this.showAlert('تم إضافة الموظف بنجاح', 'success');
    this.closeModal();
  }

  private updateEmployee(): void {
    const v = this.employeeForm.getRawValue();
    const id = this.editingId();
    const patch: Partial<Employee> = {
      name: v.name ?? undefined,
      position: v.position ?? undefined,
      department: v.department ?? undefined,
      email: v.email ?? undefined,
      phone: v.phone ?? undefined,
      hireDate: v.hireDate ?? undefined,
      salary: v.salary ? Number(v.salary) : undefined,
      status: (v.status as Employee['status']) ?? undefined,
    };
    this.employees.update((emp) => emp.map((e) => (e.id === id ? { ...e, ...patch } : e)));
    this.showAlert('تم تحديث الموظف بنجاح', 'success');
    this.closeModal();
  }

  deleteEmployee(id: string): void {
    if (confirm('هل أنت متأكد من حذف هذا الموظف؟')) {
      this.employees.update((emp) => emp.filter((e) => e.id !== id));
      this.showAlert('تم حذف الموظف بنجاح', 'success');
    }
  }

  private showAlert(message: string, type: 'success' | 'error'): void {
    this.alert.set({ show: true, message, type });
    setTimeout(() => this.alert.set(null), 4000);
  }
}
