import { Component, OnInit, WritableSignal, inject, input, signal } from '@angular/core';
import { AuthService, UserService } from '@core/services';
import { IUserProfile } from '@shared/interfaces';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  imports: [RouterLink],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.css',
})
export class SideBar implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly userService = inject(UserService);
  sidebarHidden = input<boolean>();

  userProfile: WritableSignal<IUserProfile | null> = signal(null);

  pages = [
    { name: 'لوحة التحكم', icon: 'fa-solid fa-grip', route: '/dashboard/home' },
    { name: 'المنتجات', icon: 'fa-solid fa-grip', route: '/dashboard/products' },
    { name: 'المخزن', icon: 'fa-solid fa-warehouse', route: '/dashboard/inventory' },
    { name: 'الموردون', icon: 'fa-solid fa-truck', route: '/dashboard/suppliers' },
    { name: 'الموظفون', icon: 'fa-solid fa-user', route: '/dashboard/employees' },
    { name: 'المبيعات', icon: 'fa-solid fa-bag-shopping', route: '/dashboard/sales' },
    { name: 'المشتريات', icon: 'fa-solid fa-cart-shopping', route: '/dashboard/purchases' },
    { name: 'المعاملات', icon: 'fa-solid fa-money-bill-wave', route: '/dashboard/transactions' },
  ];

  ngOnInit() {
    this.getUserProfile();
  }

  getUserProfile(): void {
    this.userService.getProfile().subscribe({
      next: (res) => {
        res.data.role = this.userService.translateRole(res.data.role);
        this.userProfile.set(res.data);
      },
      // error: () => this.authService.logout()
    });
  }

  logout() {
    this.authService.logout();
  }
}

