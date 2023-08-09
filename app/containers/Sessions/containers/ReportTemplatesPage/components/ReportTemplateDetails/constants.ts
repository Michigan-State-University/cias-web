import { themeColors } from 'theme';
import { IntlShape } from 'react-intl';

import DuplicateHereIcon from 'assets/svg/copy.svg';
import DuplicateInternallyIcon from 'assets/svg/duplicate-internally.svg';

import { SelectModalOption } from 'components/SelectModal';

import messages from '../../messages';
import { DuplicateReportTemplateOption } from './types';

export const REPORT_TEMPLATE_ACTION_BUTTONS_COMMON_PROPS = {
  fontWeight: 'bold',
  fontSize: 14,
  buttonProps: {
    color: themeColors.secondary,
    fontWeight: 'bold',
    display: 'flex',
    gap: 5,
  },
  spinnerProps: { size: 30, width: 2 },
};

export const createDuplicateModalOptions = (
  formatMessage: IntlShape['formatMessage'],
): SelectModalOption<DuplicateReportTemplateOption>[] => [
  {
    id: DuplicateReportTemplateOption.DUPLICATE_HERE,
    icon: DuplicateHereIcon,
    title: formatMessage(messages.duplicateHereTitle),
    description: formatMessage(messages.duplicateHereDescription),
  },
  {
    id: DuplicateReportTemplateOption.DUPLICATE_INTERNALLY,
    icon: DuplicateInternallyIcon,
    title: formatMessage(messages.duplicateInternallyTitle),
    description: formatMessage(messages.duplicateInternallyDescription),
  },
];
