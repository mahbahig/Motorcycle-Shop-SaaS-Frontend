import { Component, OnInit, inject, signal, WritableSignal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ProductsService } from '@core/services/products/products-service';
import { Product } from '@common/interfaces';
import { Button } from '@common/components/button/button';
import { Input } from '@common/components/input/input';
import { Alert } from '@common/components/alert/alert';
import { MainCard } from '@common/components/cards/main-card/main-card';
import { btnStyle } from '@shared/enums';

type ViewMode = 'card' | 'table';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CurrencyPipe,
    Button,
    Input,
    Alert,
    MainCard,
  ],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly fb = inject(FormBuilder);

  // Enum for template usage
  readonly btnStyle = btnStyle;

  // State
  readonly products: WritableSignal<Product[]> = signal([]);
  readonly viewMode: WritableSignal<ViewMode> = signal('card');
  readonly isLoading: WritableSignal<boolean> = signal(false);
  readonly showModal: WritableSignal<boolean> = signal(false);
  readonly modalMode: WritableSignal<'add' | 'edit'> = signal('add');
  readonly editingProductId: WritableSignal<string | null> = signal(null);
  readonly alert: WritableSignal<{
    show: boolean;
    message: string;
    type: 'success' | 'error';
  } | null> = signal(null);

  // Form
  productForm: FormGroup;

  constructor() {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      supplier: ['', Validators.required],
      description: [''],
      buyingPrice: ['', [Validators.required, Validators.min(0)]],
      sellingPrice: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  // ── Mock Data (for testing) ────────────────────────────
  private getMockProducts(): Product[] {
    return [
      {
        id: '1',
        name: 'زيت محرك سينثتيكي 5W-40',
        supplier: 'شركة المصريين للتوزيع',
        description: 'زيت محرك أصلي عالي الجودة مناسب لجميع أنواع السيارات',
        buyingPrice: 150,
        sellingPrice: 200,
      },
      {
        id: '2',
        name: 'فلتر الهواء',
        supplier: 'جاتكو',
        description: 'فلتر هواء أصلي يحافظ على محرك السيارة',
        buyingPrice: 80,
        sellingPrice: 120,
      },
      {
        id: '3',
        name: 'بطارية 12V 60Ah',
        supplier: 'إكسيد',
        description: 'بطارية سيارة عالية الأداء بضمان سنتين',
        buyingPrice: 800,
        sellingPrice: 1100,
      },
      {
        id: '4',
        name: 'إطار 165/65/R13',
        supplier: 'ميشلان',
        description: 'إطار سيارة أوروبي الصنع بجودة عالية',
        buyingPrice: 450,
        sellingPrice: 650,
      },
      {
        id: '5',
        name: 'سائل تبريد روبيه',
        supplier: 'شركة المصريين للتوزيع',
        description: 'سائل تبريد مركز يحمي من التجمد والصدأ',
        buyingPrice: 60,
        sellingPrice: 90,
      },
    ];
  }

  // ── Data Loading ───────────────────────────────────────
  loadProducts(): void {
    this.isLoading.set(true);

    // For testing: use mock data
    setTimeout(() => {
      this.products.set(this.getMockProducts());
      this.isLoading.set(false);
    }, 500);

    // Uncomment below to use real API:
    // this.productsService.getAllProducts().subscribe({
    //   next: (res) => {
    //     this.products.set(res.data || []);
    //     this.isLoading.set(false);
    //   },
    //   error: () => {
    //     this.showAlert('فشل في تحميل المنتجات', 'error');
    //     this.isLoading.set(false);
    //   },
    // });
  }

  // ── View Mode ──────────────────────────────────────────
  toggleViewMode(): void {
    this.viewMode.set(this.viewMode() === 'card' ? 'table' : 'card');
  }

  // ── Modal Management ───────────────────────────────────
  openAddModal(): void {
    this.modalMode.set('add');
    this.editingProductId.set(null);
    this.productForm.reset();
    this.showModal.set(true);
  }

  openEditModal(product: Product): void {
    this.modalMode.set('edit');
    this.editingProductId.set(product.id);
    this.productForm.patchValue({
      name: product.name,
      supplier: product.supplier,
      description: product.description || '',
      buyingPrice: product.buyingPrice,
      sellingPrice: product.sellingPrice,
    });
    this.showModal.set(true);
  }

  closeModal(): void {
    this.showModal.set(false);
    this.productForm.reset();
  }

  // ── CRUD Operations ───────────────────────────────────
  saveProduct(): void {
    if (!this.productForm.valid) {
      this.showAlert('يرجى ملء جميع الحقول المطلوبة', 'error');
      return;
    }

    if (this.modalMode() === 'add') {
      this.createProduct();
    } else {
      this.updateProduct();
    }
  }

  private createProduct(): void {
    this.isLoading.set(true);
    const formValue = this.productForm.value;

    this.productsService.createProduct(formValue).subscribe({
      next: () => {
        this.showAlert('تم إضافة المنتج بنجاح', 'success');
        this.closeModal();
        this.loadProducts();
      },
      error: () => {
        this.showAlert('فشل في إضافة المنتج', 'error');
        this.isLoading.set(false);
      },
    });
  }

  private updateProduct(): void {
    const productId = this.editingProductId();
    if (!productId) return;

    this.isLoading.set(true);
    const formValue = this.productForm.value;

    this.productsService.updateProduct(productId, formValue).subscribe({
      next: () => {
        this.showAlert('تم تحديث المنتج بنجاح', 'success');
        this.closeModal();
        this.loadProducts();
      },
      error: () => {
        this.showAlert('فشل في تحديث المنتج', 'error');
        this.isLoading.set(false);
      },
    });
  }

  deleteProduct(productId: string): void {
    if (!confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      return;
    }

    this.isLoading.set(true);
    this.productsService.deleteProduct(productId).subscribe({
      next: () => {
        this.showAlert('تم حذف المنتج بنجاح', 'success');
        this.loadProducts();
      },
      error: () => {
        this.showAlert('فشل في حذف المنتج', 'error');
        this.isLoading.set(false);
      },
    });
  }

  // ── Helpers ────────────────────────────────────────────
  private showAlert(message: string, type: 'success' | 'error'): void {
    this.alert.set({ show: true, message, type });
    setTimeout(() => this.alert.set(null), 4000);
  }

  getProfitMargin(product: Product): number {
    const profit = product.sellingPrice - product.buyingPrice;
    const margin = (profit / product.buyingPrice) * 100;
    return Math.round(margin);
  }
}
