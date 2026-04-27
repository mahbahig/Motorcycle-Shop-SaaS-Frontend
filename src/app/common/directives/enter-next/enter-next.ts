// enter-next.directive.ts
import { Directive, HostListener, inject, ElementRef } from '@angular/core';

@Directive({
  selector: '[enterNext]',
  standalone: true,
})
export class EnterNextDirective {
  private el = inject(ElementRef);

  @HostListener('keydown.enter', ['$event'])
  onEnter(e: Event): void {
    const kEvent = e as KeyboardEvent;
    kEvent.preventDefault();

    const inputs = Array.from(
      document.querySelectorAll<HTMLElement>('input, select, textarea'),
    ).filter((el) => !el.hasAttribute('disabled') && !el.hasAttribute('readonly'));

    const index = inputs.indexOf(this.el.nativeElement);

    if (index !== -1 && index < inputs.length - 1) {
      inputs[index + 1].focus();
    }
  }
}
