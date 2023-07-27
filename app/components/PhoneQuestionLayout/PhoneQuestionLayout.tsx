import React from 'react';
import { Container, Col as GCol, Row as GRow } from 'react-grid-system';
import { useIntl } from 'react-intl';

import { PhoneAttributes } from 'models/Phone';
import { TimeRange } from 'models/TimeRange';
import { ApiError } from 'models/Api';

import PhoneNumberForm from 'components/AccountSettings/PhoneNumberForm';
import { TimeRanges } from 'components/TimeRanges';
import { TimezoneForm } from 'components/TimezoneForm';

export type Props = {
  phone?: PhoneAttributes;
  timezone?: string;
  availableTimeRanges?: TimeRange[];
  selectedTimeRanges?: TimeRange[];
  forceMobileLayout?: boolean;
  disabled?: boolean;
  required?: boolean;
  phoneError?: ApiError;
  phoneLoading?: boolean;
  onPhoneNumberChange?: (phone: PhoneAttributes) => void;
  onTimezoneChange?: (timezone: string) => void;
  onTimeRangesChange?: (timeRanges: TimeRange[]) => void;
};

export const PhoneQuestionLayout: React.FC<Props> = ({
  phone,
  timezone,
  availableTimeRanges,
  selectedTimeRanges,
  forceMobileLayout,
  disabled,
  required,
  phoneError,
  phoneLoading,
  onPhoneNumberChange,
  onTimezoneChange,
  onTimeRangesChange,
}) => {
  const { formatMessage } = useIntl();

  const US_PHONE = { iso: 'US', prefix: '+1' };

  return (
    <Container fluid style={{ marginTop: 24, flex: 1 }}>
      <GRow style={{ rowGap: 24 }}>
        <GCol xs={12}>
          <PhoneNumberForm
            // @ts-ignore
            formatMessage={formatMessage}
            phone={phone?.iso ? phone : { ...phone, ...US_PHONE }}
            changePhoneNumber={onPhoneNumberChange}
            error={phoneError}
            loading={phoneLoading}
            disabled={disabled || phone?.confirmed}
            required={required}
          />
        </GCol>
        <GCol xs={12} md={forceMobileLayout ? 12 : 7}>
          <TimezoneForm
            formatMessage={formatMessage}
            timeZone={timezone}
            onChange={onTimezoneChange}
            disabled={disabled}
          />
        </GCol>
        {availableTimeRanges && (
          <GCol xs={12}>
            <TimeRanges
              availableTimeRanges={availableTimeRanges}
              selectedTimeRanges={selectedTimeRanges}
              onChange={onTimeRangesChange}
              disabled={disabled}
            />
          </GCol>
        )}
      </GRow>
    </Container>
  );
};
