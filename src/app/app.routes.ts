import { Routes } from '@angular/router';
import { AuthLayout } from './layout/auth-layout/auth-layout';

export const routes: Routes = [
  {
    path: '', component: AuthLayout, children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      // { path: 'login', component: Login, title: 'Login' },
    ]
  },
];
