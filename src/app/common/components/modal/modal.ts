import { Component, ElementRef, input, output, viewChild, afterNextRender } from '@angular/core';
import { Button } from '@common/components/button/button';
import { BtnStyleEnum } from '@shared/enums';
import { Modal as FlowbiteModal } from 'flowbite';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [Button],
  templateUrl: './modal.html',
})
export class Modal {
  readonly modalId = input<string>('default-modal');
  readonly title = input<string>('إضافة جديد');
  readonly submitLabel = input<string>('إضافة');
  readonly cancelLabel = input<string>('إلغاء');
  
  // Dynamic width input (default: max-w-md)
  readonly widthClass = input<string>('max-w-md');

  readonly closed = output<void>();
  readonly submitted = output<void>();

  private readonly modalElement = viewChild<ElementRef<HTMLElement>>('modalElement');
  private flowbiteModalInstance?: FlowbiteModal;

  protected readonly BtnStyleEnum = BtnStyleEnum;

  constructor() {
    afterNextRender(() => {
      const el = this.modalElement()?.nativeElement;
      if (el) {
        this.flowbiteModalInstance = new FlowbiteModal(el);
      }
    });
  }

  // Public methods called by EmployeeModal via viewChild
  public open(): void {
    this.flowbiteModalInstance?.show();
  }

  public close(): void {
    this.flowbiteModalInstance?.hide();
    this.closed.emit();
  }

  protected submit(): void {
    this.submitted.emit();
  }
}