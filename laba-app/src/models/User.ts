import { IUser } from '../interfaces/IUser';

export class User implements IUser {
  private _id: string;
  private _name: string;
  private _email: string;
  private _borrowedBooksCount: number;

  constructor(id: string, name: string, email: string, borrowedBooksCount = 0) {
    this._id = id;
    this._name = name;
    this._email = email;
    this._borrowedBooksCount = borrowedBooksCount;
  }

  get id(): string {
    return this._id;
  }
  get name(): string {
    return this._name;
  }
  get email(): string {
    return this._email;
  }
  get borrowedBooksCount(): number {
    return this._borrowedBooksCount;
  }

  public incrementBorrowed(): void {
    this._borrowedBooksCount++;
  }

  public decrementBorrowed(): void {
    if (this._borrowedBooksCount > 0) {
      this._borrowedBooksCount--;
    }
  }

  public toJSON(): IUser {
    return {
      id: this._id,
      name: this._name,
      email: this._email,
      borrowedBooksCount: this._borrowedBooksCount,
    };
  }
}