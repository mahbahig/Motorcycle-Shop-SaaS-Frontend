import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  transform<T extends object>(
    items: T[] | null | undefined,
    query: string,
    keys: (keyof T)[],
  ): T[] {
    if (!items?.length) return [];
    if (!query?.trim()) return items;

    const lower = query.toLowerCase().trim();

    return items.filter((item) =>
      keys.some((key) => {
        const val = item[key];
        if (val === null || val === undefined) return false;
        return String(val).toLowerCase().includes(lower);
      }),
    );
  }
}