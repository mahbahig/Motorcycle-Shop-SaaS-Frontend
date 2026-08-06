import { Component, OnInit, inject, signal, computed, WritableSignal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { form, required, minLength, min } from '@angular/forms/signals';
import { ProductsService } from '@core/services/products/products-service';
import { Product } from '@common/interfaces';
import { Button } from '@common/components/button/button';
import { Input } from '@common/components/input/input';
import { Alert } from '@common/components/alert/alert';
import { Table } from '@common/components/table/table';
import { SearchPipe } from '@common/pipes/search-pipe';
import { BtnStyleEnum } from '@shared/enums';

type ViewMode = 'card' | 'table';

@Component({
  selector: 'app-products',
  imports: [
    CurrencyPipe,
    Button,
    Input,
    Alert,
    Table,
    SearchPipe,
  ],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  private readonly productsService = inject(ProductsService);
  // Enum for template usage
  readonly BtnStyleEnum = BtnStyleEnum;

  // State
  readonly products: WritableSignal<Product[]> = signal([]);
  readonly productsWithMargin = computed(() =>
    this.products().map((p) => ({
      ...p,
      profitMargin: Math.round(((p.sellingPrice - p.buyingPrice) / p.buyingPrice) * 100),
    })),
  );
  readonly searchQuery: WritableSignal<string> = signal('');
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

  private readonly emptyProduct: Product = {
    id: '',
    name: '',
    supplier: '',
    description: '',
    buyingPrice: 0,
    sellingPrice: 0,
  };

  readonly productModel = signal<Product>({
    ...this.emptyProduct,
  });

  readonly productForm = form(this.productModel, (path) => {
    required(path.name, { message: 'اسم المنتج مطلوب' });
    minLength(path.name, 3, { message: 'اسم المنتج يجب أن يتكون من 3 أحرف على الأقل' });
    required(path.supplier, { message: 'الموردة مطلوبة' });
    required(path.buyingPrice, { message: 'سعر الشراء مطلوب' });
    min(path.buyingPrice, 0, { message: 'سعر الشراء يجب أن يكون 0 أو أكثر' });
    required(path.sellingPrice, { message: 'سعر البيع مطلوب' });
    min(path.sellingPrice, 0, { message: 'سعر البيع يجب أن يكون 0 أو أكثر' });
  });

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
    this.productModel.set({ ...this.emptyProduct });
    this.showModal.set(true);
  }

  openEditModal(product: Product): void {
    this.modalMode.set('edit');
    this.editingProductId.set(product.id);
    this.productModel.set({
      id: product.id,
      name: product.name,
      supplier: product.supplier,
      description: product.description ?? '',
      buyingPrice: product.buyingPrice,
      sellingPrice: product.sellingPrice,
    });
    this.showModal.set(true);
  }

  closeModal(): void {
    this.showModal.set(false);
    this.productModel.set({ ...this.emptyProduct });
  }

  // ── CRUD Operations ───────────────────────────────────
  saveProduct(): void {
    if (!this.productForm().valid()) {
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

    const newProduct: Product = {
      ...this.productModel(),
      id: crypto.randomUUID(),
    };

    this.productsService.createProduct(newProduct).subscribe({
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
    const updatedProduct = {
      ...this.productModel(),
      id: productId,
    };

    this.productsService.updateProduct(productId, updatedProduct).subscribe({
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
}
