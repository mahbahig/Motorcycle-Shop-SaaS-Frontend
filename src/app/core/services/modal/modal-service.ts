import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ModalService {
  readonly isOpen = signal(false);
  readonly mode = signal<'add' | 'edit'>('add');
  readonly editingId = signal<string | null>(null);
  readonly isEditing = computed(() => this.editingId() !== null);
  readonly title = computed(() => (this.isEditing() ? 'تعديل موظف' : 'إضافة موظف'));
  readonly submitLabel = computed(() => (this.isEditing() ? 'تحديث' : 'إضافة'));

  openAdd(): void {
    this.editingId.set(null);
    this.isOpen.set(true);
  }

  openEdit(id: string): void {
    this.editingId.set(id);
    this.isOpen.set(true);
  }
  
  close(): void {
    this.isOpen.set(false);
    this.editingId.set(null);
  }
}
