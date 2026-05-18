import { Routes } from '@angular/router';
import { authGuard } from '@common/guards/auth-guard/auth-guard';
import { mainGuard } from '@common/guards/main-guard/main-guard';
import { AuthLayout } from '@layout/auth-layout/auth-layout';
import { MainLayout } from '@layout/main-layout/main-layout';
import { Home } from '@pages/home/home';
import { NotFound } from '@pages/not-found/not-found';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayout,
    canActivate: [mainGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: AuthLayout, title: 'Login' },
    ],
  },
  {
    path: 'dashboard',
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: Home, title: 'لوحة التحكم' },
      {
        path: 'inventory',
        loadComponent: () => import('@pages/inventory/inventory').then((c) => c.Inventory),
        title: 'المخزون',
      },
      {
        path: 'products',
        loadComponent: () => import('@pages/products/products').then((c) => c.Products),
        title: 'المنتجات',
      },
      {
        path: 'sales',
        loadComponent: () => import('@pages/sales/sales').then((c) => c.Sales),
        title: 'المبيعات',
      },
      {
        path: 'expenses',
        loadComponent: () => import('@pages/expenses/expenses').then((c) => c.Expenses),
        title: 'المصروفات',
      },
      {
        path: 'invoices',
        loadComponent: () => import('@pages/invoices/invoices').then((c) => c.Invoices),
        title: 'الفواتير القديمة',
      },
      {
        path: 'customer-return',
        loadComponent: () =>
          import('@pages/customer-return/customer-return').then((c) => c.CustomerReturn),
        title: 'مرتجع عميل',
      },
      {
        path: 'purchases',
        loadComponent: () => import('@pages/purchases/purchases').then((c) => c.Purchases),
        title: 'المشتريات',
      },
      {
        path: 'supplier-return',
        loadComponent: () => import('@pages/supplier/supplier').then((c) => c.Supplier),
        title: 'مرتجع مورد',
      },
      {
        path: 'salaries',
        loadComponent: () => import('@pages/salaries/salaries').then((c) => c.Salaries),
        title: 'الرواتب',
      },
      {
        path: 'transactions',
        loadComponent: () => import('@pages/transactions/transactions').then((c) => c.Transactions),
        title: 'المعاملات',
      },
      {
        path: 'performance-reports',
        loadComponent: () =>
          import('@pages/performance-reports/performance-reports').then(
            (c) => c.PerformanceReports,
          ),
        title: 'تقارير الأداء',
      },
      {
        path: 'statistics',
        loadComponent: () => import('@pages/statistics/statistics').then((c) => c.Statistics),
        title: 'إحصائيات',
      },
    ],
  },
  {
    path: '**',
    component: NotFound,
    title: '404',
  },
];
