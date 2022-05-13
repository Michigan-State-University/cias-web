import { Target } from './Target';

export interface Pattern<T> {
  match: string;
  target: Target<T>[];
}
