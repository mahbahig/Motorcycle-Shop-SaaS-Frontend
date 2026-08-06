import { Component, input, signal } from '@angular/core';
import { FormField } from '@angular/forms/signals';
import { EnterNextDirective } from '@common/directives/enter-next/enter-next';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [EnterNextDirective, FormField],
  templateUrl: './input.html',
  styleUrl: './input.css',
})
export class Input {
  readonly field = input.required<any>();

  readonly label = input('');

  readonly idInput = input('');

  readonly placeholderInput = input('');

  readonly typeInput = input('text');

  readonly element = input<'input' | 'textArea'>('input');

  readonly showPassword = signal(false);

  protected readonly isPassword = () => this.typeInput() === 'password';
}
