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
