import { ComponentProps, useMemo } from 'react';
import { useIntl } from 'react-intl';

import { TIMEZONES } from 'utils/timezones';

import FormikSelect from 'components/FormikSelect';

import messages from './messages';
import { getTimezoneLabel } from './utils';

export type Props = Omit<ComponentProps<typeof FormikSelect>, 'options'>;

export const FormikTimezoneSelect = ({ label, ...props }: Props) => {
  const { formatMessage } = useIntl();

  const timezoneOptions = useMemo(
    () =>
      TIMEZONES.map((elem) => ({
        value: elem,
        label: getTimezoneLabel(elem),
      })),
    [TIMEZONES],
  );

  return (
    <FormikSelect
      label={label ?? formatMessage(messages.timeZoneLabel)}
      options={timezoneOptions}
      {...props}
    />
  );
};
