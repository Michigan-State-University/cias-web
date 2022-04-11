import { TextMessageIncludeOptions } from 'models/TextMessage';

import { SelectOption } from 'components/Select/types';

export type PersonalDataOption = SelectOption<keyof TextMessageIncludeOptions>;
