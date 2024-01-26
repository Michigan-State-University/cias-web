import * as Yup from 'yup';
import { IntlShape } from 'react-intl';

import validatorsMessages from 'global/i18n/validatorsMessages';
import { nameRegex } from 'global/constants';

export const nameValidationSchema = (
  formatMessage: IntlShape['formatMessage'],
) => Yup.string().matches(nameRegex, formatMessage(validatorsMessages.name));
