import { IBook } from '../interfaces/IBook';

export class Book implements IBook {
  private _id: string;
  private _title: string;
  private _author: string;
  private _year: number;
  private _isBorrowed: boolean;
  private _borrowedByUserId: string | null;

  constructor(
    id: string,
    title: string,
    author: string,
    year: number,
    isBorrowed = false,
    borrowedByUserId: string | null = null,
  ) {
    this._id = id;
    this._title = title;
    this._author = author;
    this._year = year;
    this._isBorrowed = isBorrowed;
    this._borrowedByUserId = borrowedByUserId;
  }

  get id(): string {
    return this._id;
  }
  get title(): string {
    return this._title;
  }
  get author(): string {
    return this._author;
  }
  get year(): number {
    return this._year;
  }
  get isBorrowed(): boolean {
    return this._isBorrowed;
  }
  get borrowedByUserId(): string | null {
    return this._borrowedByUserId;
  }

  public borrowBook(userId: string): void {
    this._isBorrowed = true;
    this._borrowedByUserId = userId;
  }

  public returnBook(): void {
    this._isBorrowed = false;
    this._borrowedByUserId = null;
  }

  public toJSON(): IBook {
    return {
      id: this._id,
      title: this._title,
      author: this._author,
      year: this._year,
      isBorrowed: this._isBorrowed,
      borrowedByUserId: this._borrowedByUserId,
    };
  }
}