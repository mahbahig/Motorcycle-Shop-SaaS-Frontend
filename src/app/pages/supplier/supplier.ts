import { Component, OnInit, inject, signal, WritableSignal } from '@angular/core';
import { form, required, minLength, email } from '@angular/forms/signals';
import { SuppliersService } from '@core/services/suppliers/suppliers-service';
import { Button } from '@common/components/button/button';
import { Input } from '@common/components/input/input';
import { Alert } from '@common/components/alert/alert';
import { Table } from '@common/components/table/table';
import { SearchPipe } from '@common/pipes/search-pipe';
import { BtnStyleEnum } from '@shared/enums';
import { Supplier as ISupplier } from '@shared/interfaces/supplier/supplier.interface';
import { FormsModule } from '@angular/forms';
import { SearchInput } from "@common/components/search-input/search-input";

@Component({
  selector: 'app-supplier',
  imports: [Button, Input, Alert, Table, SearchPipe, FormsModule, SearchInput],
  templateUrl: './supplier.html',
  styleUrl: './supplier.css',
})
export class Supplier implements OnInit {
  private readonly suppliersService = inject(SuppliersService);

  // Enum for template usage
  readonly BtnStyleEnum = BtnStyleEnum;

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

  private readonly emptySupplier: ISupplier = {
    id: undefined,
    name: '',
    contact: '',
    email: '',
    phone: '',
    address: '',
  };

  readonly Isupplier = signal<ISupplier>({
    ...this.emptySupplier,
  });

  readonly supplierForm = form(this.Isupplier, (path) => {
    required(path.name, { message: 'اسم المورد مطلوب' });
    minLength(path.name, 3, { message: 'اسم المورد يجب أن يكون 3 أحرف على الأقل' });
    email(path.email, { message: 'البريد الإلكتروني غير صالح' });
  });

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

  openAddModal(): void {
    this.modalMode.set('add');
    this.editingId.set(null);
    this.Isupplier.set({ ...this.emptySupplier });
    this.showModal.set(true);
  }

  openEditModal(supplier: ISupplier): void {
    this.modalMode.set('edit');
    this.editingId.set(supplier.id ?? null);
    this.Isupplier.set({
      id: supplier.id,
      name: supplier.name,
      contact: supplier.contact ?? '',
      email: supplier.email ?? '',
      phone: supplier.phone ?? '',
      address: supplier.address ?? '',
    });
    this.showModal.set(true);
  }

  closeModal(): void {
    this.showModal.set(false);
    this.Isupplier.set({ ...this.emptySupplier });
  }

  submitForm(): void {
    if (!this.supplierForm().valid()) {
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
    const newSupplier = {
      ...this.Isupplier(),
      id: crypto.randomUUID(),
    };

    this.suppliersService.createSupplier(newSupplier).subscribe({
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
    const id = this.editingId();
    const updatedSupplier = {
      ...this.Isupplier(),
      id: id ?? this.Isupplier().id,
    };

    this.suppliers.update((list) =>
      list.map((s) => (s.id === updatedSupplier.id ? { ...s, ...updatedSupplier } : s)),
    );
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
