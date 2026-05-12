import { Component, input, InputSignal, signal, WritableSignal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { EnterNextDirective } from '@common/directives/enter-next/enter-next';

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule, EnterNextDirective],
  templateUrl: './input.html',
  styleUrl: './input.css',
  standalone: true,
})
export class Input {
  control: InputSignal<any> = input('');
  nameInput: InputSignal<string> = input('');
  typeInput: InputSignal<string> = input('');
  idInput: InputSignal<string> = input('');
  placeholderInput: InputSignal<string> = input('');
  label: InputSignal<string> = input('');
  element: InputSignal<string> = input('input');
  showPassword: WritableSignal<boolean> = signal(false);
}
