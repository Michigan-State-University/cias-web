import { Pattern } from './Pattern';

export interface Formula<T> {
  payload: string;
  patterns: Pattern<T>[];
}
