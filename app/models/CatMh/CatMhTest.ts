import { CamelToSnakeOmitId } from 'global/types/camelToSnake';

export interface CatMhTestAttribute {
  id: string;
  name: string;
  range: string;
  variableType: string;
}

export interface CatMhTest {
  name: string;
  id: number;
  shortName: string;
  catMhTestAttributes: CatMhTestAttribute[];
}

export type CatMhTestDTO = CamelToSnakeOmitId<CatMhTest>;
