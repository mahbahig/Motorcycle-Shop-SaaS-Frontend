import { Component, inject, signal, WritableSignal } from '@angular/core';
import { AuthService, UserService } from '@core/services';
import { IUserProfile } from '@shared/interfaces';
import { AuditLogsCard } from '@common/components/cards/audit-logs-card/audit-logs-card';
import { WokFlowCard } from '@common/components/cards/wok-flow-card/wok-flow-card';
import { WorkOrdersCard } from '@common/components/cards/work-orders-card/work-orders-card';
import { StorageAlertCard } from '@common/components/cards/storage-alert-card/storage-alert-card';
import { Button } from '@common/components/button/button';
import { btnStyle } from '@shared/enums';

@Component({
  selector: 'app-home',
  imports: [AuditLogsCard, WokFlowCard, WorkOrdersCard, StorageAlertCard, Button],
  templateUrl: './home.html',
  styleUrl: './home.css',
  standalone: true,
})
export class Home {
  private readonly userService = inject(UserService);
  private readonly authService = inject(AuthService);

  userProfile: WritableSignal<IUserProfile | null> = signal(null);

  ngOnInit() {
    this.getUserProfile();
  }

  getUserProfile(): void {
    this.userService.getProfile().subscribe({
      next: (res) => {
        res.data.role = this.userService.translateRole(res.data.role);
        this.userProfile.set(res.data);
      },
      // error: () => this.authService.logout(),
    });
  }

  protected readonly btnStyle = btnStyle;
}

