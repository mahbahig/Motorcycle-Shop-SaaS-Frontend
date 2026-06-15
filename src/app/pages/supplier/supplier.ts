import { Component, OnInit, inject, signal, WritableSignal } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SuppliersService } from '@core/services/suppliers/suppliers-service';
import { Button } from '@common/components/button/button';
import { Input } from '@common/components/input/input';
import { Alert } from '@common/components/alert/alert';
import { MainCard } from '@common/components/cards/main-card/main-card';
import { btnStyle } from '@shared/enums';

export interface ISupplier {
  id?: string;
  name: string;
  contact?: string;
  email?: string;
  phone?: string;
  address?: string;
}

@Component({
  selector: 'app-supplier',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, Button, Input, Alert, MainCard],
  templateUrl: './supplier.html',
  styleUrl: './supplier.css',
})
export class Supplier implements OnInit {
  private readonly suppliersService = inject(SuppliersService);
  private readonly fb = inject(FormBuilder);

  // Enum for template usage
  readonly btnStyle = btnStyle;

  // State
  readonly suppliers: WritableSignal<ISupplier[]> = signal([]);
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

  // Form
  supplierForm: FormGroup;

  constructor() {
    this.supplierForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      contact: [''],
      email: ['', Validators.email],
      phone: [''],
      address: [''],
    });
  }

  ngOnInit(): void {
    this.loadSuppliers();
  }

  // ── Mock Data (for testing) ────────────────────────────
  private getMockSuppliers(): ISupplier[] {
    return [
      {
        id: '1',
        name: 'شركة الخليج للتوزيع',
        contact: 'أحمد محمد',
        email: 'contact@khalij.com',
        phone: '01001234567',
        address: 'القاهرة، مصر',
      },
      {
        id: '2',
        name: 'شركة المصريين للتوزيع',
        contact: 'فاطمة علي',
        email: 'info@masri.com',
        phone: '01101234567',
        address: 'الجيزة، مصر',
      },
      {
        id: '3',
        name: 'جاتكو للقطع الغيار',
        contact: 'محمد سالم',
        email: 'sales@gatco.com',
        phone: '01201234567',
        address: 'الإسكندرية، مصر',
      },
      {
        id: '4',
        name: 'إكسيد للبطاريات',
        contact: 'ياسمين محمود',
        email: 'export@exide.com',
        phone: '01021234567',
        address: 'القاهرة، مصر',
      },
      {
        id: '5',
        name: 'ميشلان للإطارات',
        contact: 'خالد عبدالله',
        email: 'b2b@michelin.com',
        phone: '01121234567',
        address: 'الإسمائيلية، مصر',
      },
    ];
  }

  loadSuppliers(): void {
    this.isLoading.set(true);
    // For now, use mock data. Replace with actual service call:
    // this.suppliersService.getAllSuppliers().subscribe({
    //   next: (data) => {
    //     this.suppliers.set(data);
    //     this.isLoading.set(false);
    //   },
    //   error: () => {
    //     this.showAlert('خطأ في تحميل البيانات', 'error');
    //     this.isLoading.set(false);
    //   },
    // });

    // Using mock data for demonstration
    setTimeout(() => {
      this.suppliers.set(this.getMockSuppliers());
      this.isLoading.set(false);
    }, 500);
  }

  get filteredSuppliers(): ISupplier[] {
    const query = this.searchQuery().toLowerCase();
    return this.suppliers().filter(
      (supplier) =>
        supplier.name.toLowerCase().includes(query) ||
        supplier.contact?.toLowerCase().includes(query) ||
        supplier.email?.toLowerCase().includes(query) ||
        supplier.phone?.includes(query),
    );
  }

  openAddModal(): void {
    this.modalMode.set('add');
    this.editingId.set(null);
    this.supplierForm.reset();
    this.showModal.set(true);
  }

  openEditModal(supplier: ISupplier): void {
    this.modalMode.set('edit');
    this.editingId.set(supplier.id!);
    this.supplierForm.patchValue(supplier);
    this.showModal.set(true);
  }

  closeModal(): void {
    this.showModal.set(false);
    this.supplierForm.reset();
  }

  submitForm(): void {
    if (!this.supplierForm.valid) {
      this.showAlert('الرجاء ملء جميع الحقول المطلوبة بشكل صحيح', 'error');
      return;
    }

    if (this.modalMode() === 'add') {
      this.addSupplier();
    } else {
      this.updateSupplier();
    }
  }

  private addSupplier(): void {
    const formValue = this.supplierForm.value;
    this.suppliersService.createSupplier(formValue).subscribe({
      next: () => {
        this.showAlert('تم إضافة المورد بنجاح', 'success');
        this.loadSuppliers();
        this.closeModal();
      },
      error: () => {
        this.showAlert('خطأ في إضافة المورد', 'error');
      },
    });
  }

  private updateSupplier(): void {
    // For demo, just update in local state
    const formValue = this.supplierForm.value;
    const id = this.editingId();
    const updated = this.suppliers().map((s) => (s.id === id ? { ...s, ...formValue } : s));
    this.suppliers.set(updated);
    this.showAlert('تم تحديث المورد بنجاح', 'success');
    this.closeModal();
  }

  deleteSupplier(id: string): void {
    if (confirm('هل أنت متأكد من حذف هذا المورد؟')) {
      this.suppliersService.deleteSupplier(id).subscribe({
        next: () => {
          this.showAlert('تم حذف المورد بنجاح', 'success');
          this.loadSuppliers();
        },
        error: () => {
          this.showAlert('خطأ في حذف المورد', 'error');
        },
      });
    }
  }

  private showAlert(message: string, type: 'success' | 'error'): void {
    this.alert.set({ show: true, message, type });
    setTimeout(() => this.alert.set(null), 4000);
  }
}

