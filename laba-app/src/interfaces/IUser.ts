import { IIdentifiable } from '../types';

export interface IUser extends IIdentifiable {
  name: string;
  email: string;
  borrowedBooksCount: number;
}