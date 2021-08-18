export interface PatternDto<T> {
  match: string;
  targets: {
    type: T;
    id: string;
    probability: string;
  }[];
}
