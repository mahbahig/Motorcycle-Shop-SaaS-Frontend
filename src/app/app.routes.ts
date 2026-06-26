import { Routes } from '@angular/router';
import { authGuard } from '@common/guards/auth-guard/auth-guard';
import { mainGuard } from '@common/guards/main-guard/main-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@layout/auth-layout/auth-layout').then((c) => c.AuthLayout),
    canActivate: [mainGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        loadComponent: () => import('@pages/login/login').then((c) => c.Login),
        title: 'Login',
      },
    ],
  },
  {
    path: 'dashboard',
    loadComponent: () => import('@layout/main-layout/main-layout').then((c) => c.MainLayout),
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () => import('@pages/home/home').then((c) => c.Home),
        title: 'لوحة التحكم',
      },

      // ── المخزون والمنتجات ──────────────────────────────────────────
      {
        path: 'inventory',
        loadComponent: () => import('@pages/inventory/inventory').then((c) => c.Inventory),
        title: 'المخزون',
      },
      {
        path: 'products',
        loadComponent: () => import('@pages/products/products').then((c) => c.Products),
        title: 'قطع الغيار',
      },
      {
        path: 'services',
        loadComponent: () => import('@pages/services/services').then((c) => c.Services),
        title: 'الخدمات والصيانة',
      },

      // ── المالية ────────────────────────────────────────────────────
      {
        path: 'sales',
        loadComponent: () => import('@pages/sales/sales').then((c) => c.Sales),
        title: 'المبيعات',
      },
      {
        path: 'purchases',
        loadComponent: () => import('@pages/purchases/purchases').then((c) => c.Purchases),
        title: 'المشتريات',
      },
      {
        path: 'invoices',
        loadComponent: () => import('@pages/invoices/invoices').then((c) => c.Invoices),
        title: 'الفواتير',
      },
      {
        path: 'customer-return',
        loadComponent: () =>
          import('@pages/customers/customer-return').then((c) => c.CustomerReturn),
        title: 'مرتجع عميل',
      },
      {
        path: 'suppliers',
        loadComponent: () => import('@pages/supplier/supplier').then((c) => c.Supplier),
        title: 'الموردون',
      },
      {
        path: 'expenses',
        loadComponent: () => import('@pages/expenses/expenses').then((c) => c.Expenses),
        title: 'المصروفات',
      },
      {
        path: 'transactions',
        loadComponent: () => import('@pages/transactions/transactions').then((c) => c.Transactions),
        title: 'المعاملات',
      },
      {
        path: 'salaries',
        loadComponent: () => import('@pages/salaries/salaries').then((c) => c.Salaries),
        title: 'الرواتب',
      },

      // ── العملاء والموظفون ──────────────────────────────────────────
      {
        path: 'customers',
        loadComponent: () => import('@pages/customers/customers').then((c) => c.Customers),
        title: 'العملاء',
      },
      {
        path: 'employees',
        loadComponent: () => import('@pages/employees/employees').then((c) => c.Employees),
        title: 'الموظفون',
      },
    ],
  },
  {
    path: '**',
    loadComponent: () => import('@pages/not-found/not-found').then((c) => c.NotFound),
    title: '404',
  },
];
