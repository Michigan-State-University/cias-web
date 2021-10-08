import { CamelToSnakeOmitId } from 'global/types/camelToSnake';

import { CatMhTest } from './CatMhTest';

export type CatMhTestDTO = CamelToSnakeOmitId<CatMhTest>;
