import { Component, InputSignal, input } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css',
  standalone: true,
})
export class Button {
  message: InputSignal<string> = input('اضغط هنا');
  type: InputSignal<string> = input('button');
  isLoading = input(false);
  btn_white = input(false);
}
