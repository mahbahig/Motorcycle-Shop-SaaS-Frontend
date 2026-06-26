import { Component, OnInit, inject, signal, computed, WritableSignal } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { SuppliersService } from '@core/services/suppliers/suppliers-service';
import { Button } from '@common/components/button/button';
import { Input } from '@common/components/input/input';
import { Alert } from '@common/components/alert/alert';
import { BtnStyleEnum } from '@shared/enums';
import { Supplier as SupplierModel } from '@shared/interfaces/supplier/supplier.model';

@Component({
  selector: 'app-supplier',
  imports: [FormsModule, ReactiveFormsModule, Button, Input, Alert],
  templateUrl: './supplier.html',
  styleUrl: './supplier.css',
})
export class Supplier implements OnInit {
  private readonly suppliersService = inject(SuppliersService);
  private readonly fb = inject(FormBuilder);

  // Enum for template usage
  readonly BtnStyleEnum = BtnStyleEnum;

  // State
  readonly suppliers: WritableSignal<SupplierModel[]> = signal([]);
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
  readonly supplierForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    contact: [''],
    email: ['', Validators.email],
    phone: [''],
    address: [''],
  });

  ngOnInit(): void {
    this.loadSuppliers();
  }

  // ── Mock Data (for testing) ────────────────────────────
  private getMockSuppliers(): SupplierModel[] {
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

  readonly filteredSuppliers = computed(() => {
    const query = this.searchQuery().toLowerCase();
    return this.suppliers().filter(
      (supplier) =>
        supplier.name.toLowerCase().includes(query) ||
        supplier.contact?.toLowerCase().includes(query) ||
        supplier.email?.toLowerCase().includes(query) ||
        supplier.phone?.includes(query),
    );
  });

  openAddModal(): void {
    this.modalMode.set('add');
    this.editingId.set(null);
    this.supplierForm.reset();
    this.showModal.set(true);
  }

  openEditModal(supplier: SupplierModel): void {
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
    const v = this.supplierForm.getRawValue();
    this.suppliersService.createSupplier({ name: v.name ?? '' }).subscribe({
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
    const v = this.supplierForm.getRawValue();
    const id = this.editingId();
    const patch: Partial<SupplierModel> = {
      name: v.name ?? undefined,
      contact: v.contact ?? undefined,
      email: v.email ?? undefined,
      phone: v.phone ?? undefined,
      address: v.address ?? undefined,
    };
    this.suppliers.update((list) => list.map((s) => (s.id === id ? { ...s, ...patch } : s)));
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

