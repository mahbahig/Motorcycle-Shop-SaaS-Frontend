import { Component, InputSignal, input } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  message: InputSignal<string> = input('اضغط هنا');
}
