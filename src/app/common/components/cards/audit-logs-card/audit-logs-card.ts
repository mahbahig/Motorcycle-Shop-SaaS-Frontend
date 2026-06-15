import { Component } from '@angular/core';
import { MainCard } from '@common/components/cards/main-card/main-card';
import { btnStyle } from '@shared/enums';
import { Button } from '@common/components/button/button';

@Component({
  selector: 'app-audit-logs-card',
  imports: [MainCard, Button],
  templateUrl: './audit-logs-card.html',
  styleUrl: './audit-logs-card.css',
  standalone: true,
})
export class AuditLogsCard {
  protected readonly btnStyle = btnStyle;
}

