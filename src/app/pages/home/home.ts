import { Component, inject, computed } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { UserService } from '@core/services';
import { UserProfile, UserProfileResponse } from '@shared/interfaces';
import { AuditLogsCard } from '@common/components/cards/audit-logs-card/audit-logs-card';
import { WokFlowCard } from '@common/components/cards/wok-flow-card/wok-flow-card';
import { StorageAlertCard } from '@common/components/cards/storage-alert-card/storage-alert-card';
import { Button } from '@common/components/button/button';
import { BtnStyleEnum } from '@shared/enums';
import { userApiEndpoints } from '@common/environments';

@Component({
  selector: 'app-home',
  imports: [AuditLogsCard, WokFlowCard, StorageAlertCard, Button],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private readonly userService = inject(UserService);

  private readonly profileResource = httpResource<UserProfileResponse>(
    () => userApiEndpoints.getProfile,
  );

  readonly userProfile = computed<UserProfile | null>(() => {
    const res = this.profileResource.value();
    if (!res) return null;
    return { ...res.data, role: this.userService.translateRole(res.data.role) };
  });

  protected readonly BtnStyleEnum = BtnStyleEnum;
}
