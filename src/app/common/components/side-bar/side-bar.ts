import { Component, WritableSignal, inject, input, signal } from '@angular/core';
import { AuthService, UserService } from '@core/services';
import { IUserProfile } from '@shared/interfaces';

@Component({
  selector: 'app-side-bar',
  imports: [],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.css',
})
export class SideBar {
  private readonly authService = inject(AuthService);
  private readonly userService = inject(UserService);
  sidebarHidden = input<boolean>();

  userProfile: WritableSignal<IUserProfile | null> = signal(null);

  pages = [
    { name: 'لوحة التحكم', icon: 'fa-solid fa-grip', route: '/home' },
    { name: 'المخزن', icon: 'fa-solid fa-warehouse', route: '/inventory' },
    { name: 'المبيعات', icon: 'fa-solid fa-bag-shopping', route: '/sales' },
    { name: 'المشتريات', icon: 'fa-solid fa-cart-shopping', route: '/purchases' },
    { name: 'المعاملات', icon: 'fa-solid fa-money-bill-wave', route: '/transactions' },
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
