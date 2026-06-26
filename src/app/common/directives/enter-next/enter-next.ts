import { Directive, inject, ElementRef } from '@angular/core';

@Directive({
  selector: '[enterNext]',
  host: { '(keydown.enter)': 'onEnter($event)' },
})
export class EnterNextDirective {
  private el = inject(ElementRef);

  onEnter(e: Event): void {
    e.preventDefault();

    const inputs = Array.from(
      document.querySelectorAll<HTMLElement>('input, select, textarea'),
    ).filter((el) => !el.hasAttribute('disabled') && !el.hasAttribute('readonly'));

    const index = inputs.indexOf(this.el.nativeElement);

    if (index !== -1 && index < inputs.length - 1) {
      inputs[index + 1].focus();
    }
  }
}
