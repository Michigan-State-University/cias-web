import { IntlShape } from 'react-intl';

import PdfIcon from 'assets/svg/pdf-grey.svg';
import UserIcon from 'assets/svg/user-neutral.svg';

import { colors } from 'theme';

import {
  ManageCollectedDataOption,
  ManageCollectedDataOptionId,
} from './types';
import messages from './messages';

export const createSelectModalOptions = (
  formatMessage: IntlShape['formatMessage'],
): ManageCollectedDataOption[] => [
  {
    id: ManageCollectedDataOptionId.CLEAR_DATA,
    icon: UserIcon,
    title: formatMessage(messages.clearDataTitle),
    description: formatMessage(messages.clearDataDescription),
  },
  {
    id: ManageCollectedDataOptionId.DELETE_REPORTS,
    icon: PdfIcon,
    iconFill: colors.greyishBlue,
    title: formatMessage(messages.deleteReportsTitle),
    description: formatMessage(messages.deleteReportsDescription),
  },
];
