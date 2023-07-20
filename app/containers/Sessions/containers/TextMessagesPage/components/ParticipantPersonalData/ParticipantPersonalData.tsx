import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';

import { makeSelectSelectedMessage } from 'global/reducers/textMessages';
import { changeIncludedData } from 'global/reducers/textMessages/settings/actions';

import { TextMessage } from 'models/TextMessage';

import Text from 'components/Text';
import Select from 'components/Select';

import messages from './messages';
import { PersonalDataOption } from './types';

type Props = {
  disabled: boolean;
};

export const ParticipantPersonalData = ({ disabled }: Props): JSX.Element => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();

  const selectOptions: PersonalDataOption[] = useMemo(
    () => [
      {
        value: 'includeFirstName',
        label: formatMessage(messages.firstName),
      },
      {
        value: 'includeLastName',
        label: formatMessage(messages.lastName),
      },
      {
        value: 'includePhoneNumber',
        label: formatMessage(messages.phoneNumber),
      },
      {
        value: 'includeEmail',
        label: formatMessage(messages.email),
      },
    ],
    [],
  );

  const [selectedValues, setSelectedValues] = useState<PersonalDataOption[]>(
    [],
  );

  const textMessage: Nullable<TextMessage> = useSelector(
    makeSelectSelectedMessage(),
  );

  const updateSelectedValues = () => {
    if (!textMessage) {
      setSelectedValues([]);
      return;
    }

    const newSelectedValues: PersonalDataOption[] = selectOptions.filter(
      (option) => textMessage[option.value],
    );
    setSelectedValues(newSelectedValues);
  };

  useEffect(() => {
    updateSelectedValues();
  }, [textMessage]);

  const handleChange = (newSelectedValues: PersonalDataOption[]) => {
    const includedData = selectOptions.map((option) => [
      option.value,
      newSelectedValues.includes(option),
    ]);
    dispatch(changeIncludedData(Object.fromEntries(includedData)));
  };

  return (
    <>
      <Text mt={32} mb={24} fontSize={18} fontWeight="bold">
        {formatMessage(messages.participantPersonalData)}
      </Text>
      <Text mb={10}>{formatMessage(messages.chooseDataType)}</Text>
      <Select
        // @ts-ignore
        disabled={disabled}
        selectProps={{
          options: selectOptions,
          value: selectedValues,
          onChange: handleChange,
          isMulti: true,
          formatLabel: (label: string) => label,
          isDisabled: disabled,
        }}
      />
    </>
  );
};
