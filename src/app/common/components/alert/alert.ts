import { Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-alert',
  imports: [],
  templateUrl: './alert.html',
  styleUrl: './alert.css',
  standalone: true,
})
export class Alert {
  isSuccess: InputSignal<boolean> = input(false);
  hasError: InputSignal<boolean> = input(false);
  message: InputSignal<string> = input('');
}

