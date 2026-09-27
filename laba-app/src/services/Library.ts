import { IIdentifiable } from '../types';

export class Library<T extends IIdentifiable> {
  private items: T[] = [];

  constructor(initialItems: T[] = []) {
    this.items = initialItems;
  }

  public add(item: T): void {
    this.items.push(item);
  }

  public remove(id: string): boolean {
    const initialLen = this.items.length;
    this.items = this.items.filter((item) => item.id !== id);
    return this.items.length < initialLen;
  }

  public findById(id: string): T | undefined {
    return this.items.find((item) => item.id === id);
  }

  public getAll(): T[] {
    return [...this.items];
  }

  public search(predicate: (item: T) => boolean): T[] {
    return this.items.filter(predicate);
  }

  public getPaginated(
    page: number,
    pageSize: number,
    items: T[] = this.items,
  ): { data: T[]; totalPages: number } {
    const totalPages = Math.ceil(items.length / pageSize) || 1;
    const safePage = Math.min(Math.max(1, page), totalPages);
    const start = (safePage - 1) * pageSize;
    return {
      data: items.slice(start, start + pageSize),
      totalPages,
    };
  }
}