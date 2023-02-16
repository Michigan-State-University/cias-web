import * as Yup from 'yup';

import { formatMessage } from 'utils/intlOutsideReact';

import { unreservedURLCharactersRegex } from 'global/constants';
import globalMessages from 'global/i18n/globalMessages';

const urlSchema = Yup.string().url();

export const urlValidator = (target) => {
  try {
    // this checks if url has valid protocol
    // eslint-disable-next-line no-new
    new URL(target);

    return urlSchema.isValidSync(target);
  } catch {
    return urlSchema.isValidSync(`http://${target}`);
  }
};

export const unreservedURLCharactersSchema = Yup.string().matches(
  unreservedURLCharactersRegex,
  /* @ts-ignore */
  formatMessage(globalMessages.validators.unreservedURLCharacters),
);
