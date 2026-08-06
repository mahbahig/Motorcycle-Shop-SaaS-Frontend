import { Component, input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.html',
})
export class Table {
  headers = input<string[]>([]);
  isEmpty = input<boolean>(false);
  emptyMessage = input<string>('لا توجد بيانات');
  emptyIcon = input<string>('fa-inbox');
}
