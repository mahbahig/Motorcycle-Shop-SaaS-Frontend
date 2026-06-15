import { Component, input } from '@angular/core';
import { MainCard } from '@common/components/cards/main-card/main-card';

@Component({
  selector: 'app-wok-flow-card',
  imports: [MainCard],
  templateUrl: './wok-flow-card.html',
  styleUrl: './wok-flow-card.css',
})
export class WokFlowCard {
  faClass = input('screwdriver-wrench');
  number = input('24');
  description = input('أوامر الشغل هذا الشهر');
  price = input(false);
}

