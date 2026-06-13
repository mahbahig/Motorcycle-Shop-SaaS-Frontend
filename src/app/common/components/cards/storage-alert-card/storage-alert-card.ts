import { Component } from '@angular/core';
import { MainCard } from '@common/components/cards/main-card/main-card';

@Component({
  changeDetection: ChangeDetectionStrategy.Eager,
  selector: 'app-storage-alert-card',
  imports: [MainCard],
  templateUrl: './storage-alert-card.html',
  styleUrl: './storage-alert-card.css',
})
export class StorageAlertCard {}

