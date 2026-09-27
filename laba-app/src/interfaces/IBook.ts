import { IIdentifiable } from '../types';

export interface IBook extends IIdentifiable {
  title: string;
  author: string;
  year: number;
  isBorrowed: boolean;
  borrowedByUserId: string | null;
}