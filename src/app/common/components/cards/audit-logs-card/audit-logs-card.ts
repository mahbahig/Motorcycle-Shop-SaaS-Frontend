import { Component } from '@angular/core';
import { MainCard } from '@common/components/cards/main-card/main-card';

@Component({
  selector: 'app-audit-logs-card',
  imports: [MainCard],
  templateUrl: './audit-logs-card.html',
  styleUrl: './audit-logs-card.css',
  standalone: true,
})
export class AuditLogsCard {}
