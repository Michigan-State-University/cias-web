import { CamelToSnake } from 'global/types/camelToSnake';

export type Editor = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
};

export type EditorDTO = CamelToSnake<Editor>;
