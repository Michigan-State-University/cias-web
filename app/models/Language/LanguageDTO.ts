import { CamelToSnakeOmitId } from 'global/types/camelToSnake';

import { Language } from './Language';

export type LanguageDTO = CamelToSnakeOmitId<Language>;
