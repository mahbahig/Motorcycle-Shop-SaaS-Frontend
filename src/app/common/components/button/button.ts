import { Component, InputSignal, input } from '@angular/core';
import { btnStyle } from '@shared/enums';

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
  isLoading: InputSignal<boolean> = input(false);
  buttonStyle = input(btnStyle.btnNavy);
  protected readonly btnStyle = btnStyle;
}
