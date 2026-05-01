import { Routes } from '@angular/router';
import { AuthLayout } from '@layout/auth-layout/auth-layout';
import { MainLayout } from '@layout/main-layout/main-layout';
import { Home } from '@pages/home/home';

export const routes: Routes = [
  // ── Auth ──────────────────────────────────────────────
  {
    path: '',
    component: AuthLayout,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: AuthLayout, title: 'Login' },
    ],
  },

  // ── Main ──────────────────────────────────────────────
  {
    path: 'dashboard',
    component: MainLayout,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: Home, title: 'لوحة التحكم' },

      // Dashboard
      //     // المخزون
      //     {
      //       path: 'inventory',
      //       loadComponent: () =>
      //         import('./pages/inventory/inventory.component').then((c) => c.InventoryComponent),
      //       title: 'المخزون',
      //     },
      //
      // المنتجات
      {
        path: 'products',
        loadComponent: () => import('@pages/products/products').then((c) => c.Products),
        title: 'المنتجات',
      },

      //         {
      //           path: 'prices',
      //           loadComponent: () =>
      //             import('./pages/products/prices/prices.component').then((c) => c.PricesComponent),
      //           title: 'الأسعار',
      //         },
      //
      //     // المحاسبة
      //     {
      //       path: 'accounting',
      //       loadComponent: () =>
      //         import('./pages/accounting/accounting.component').then((c) => c.AccountingComponent),
      //       title: 'المحاسبة',
      //     },
      //
      //     // المبيعات
      //     {
      //       path: 'sales',
      //       children: [
      //         {
      //           path: '',
      //           loadComponent: () =>
      //             import('./pages/sales/sales.component').then((c) => c.SalesComponent),
      //           title: 'المبيعات',
      //         },
      //         {
      //           path: 'invoices',
      //           loadComponent: () =>
      //             import('./pages/sales/invoices/invoices.component').then((c) => c.InvoicesComponent),
      //           title: 'الفواتير القديمة',
      //         },
      //         {
      //           path: 'customer-return',
      //           loadComponent: () =>
      //             import('./pages/sales/customer-return/customer-return.component').then(
      //               (c) => c.CustomerReturnComponent,
      //             ),
      //           title: 'مرتجع عميل',
      //         },
      //       ],
      //     },
      //
      //     // المشتريات
      //     {
      //       path: 'purchases',
      //       children: [
      //         {
      //           path: '',
      //           loadComponent: () =>
      //             import('./pages/purchases/purchases.component').then((c) => c.PurchasesComponent),
      //           title: 'المشتريات',
      //         },
      //         {
      //           path: 'supplier-return',
      //           loadComponent: () =>
      //             import('./pages/purchases/supplier-return/supplier-return.component').then(
      //               (c) => c.SupplierReturnComponent,
      //             ),
      //           title: 'مرتجع مورد',
      //         },
      //       ],
      //     },
      //
      //     // الرواتب
      //     {
      //       path: 'salaries',
      //       loadComponent: () =>
      //         import('./pages/salaries/salaries.component').then((c) => c.SalariesComponent),
      //       title: 'الرواتب',
      //     },
      //
      // // ── Fallback ──────────────────────────────────────────
      // {
      //   path: '**',
      //   loadComponent: () =>
      //     import('./pages/not-found/not-found.component').then((c) => c.NotFoundComponent),
      //   title: '404',
      // },
    ],
  },
];
