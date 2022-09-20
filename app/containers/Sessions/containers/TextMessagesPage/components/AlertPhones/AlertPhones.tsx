import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import BinIcon from 'assets/svg/bin-no-bg.svg';

import {
  makeSelectPhones,
  removePhoneRequest,
  addPhoneRequest,
  updatePhoneRequest,
  makeSelectLoaders,
} from 'global/reducers/textMessages';

import { Phone } from 'models/Phone';

import { themeColors } from 'theme';

import Text from 'components/Text';
import PhoneNumberForm from 'components/AccountSettings/PhoneNumberForm';
import {
  PhoneAttributes,
  PhoneNumberFormCalculatedValue,
} from 'components/AccountSettings/types';
import { ImageButton } from 'components/Button';
import Row from 'components/Row';
import TextButton from 'components/Button/TextButton';
import Loader from 'components/Loader';

import messages from './messages';

type Props = {
  disabled: boolean;
};

export const AlertPhones = ({ disabled }: Props): JSX.Element => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();

  const phones: Phone[] = useSelector(makeSelectPhones());
  const { fetchVariantsAndPhonesLoading, addPhoneLoading, removePhoneLoading } =
    useSelector(makeSelectLoaders());

  const [removedPhoneId, setRemovedPhoneId] = useState<Nullable<string>>(null);

  const handleRemove = (phoneId: string) => {
    setRemovedPhoneId(phoneId);
    dispatch(removePhoneRequest(phoneId));
  };

  const handleChange = (
    phoneId: string,
    { phoneAttributes }: { phoneAttributes: PhoneAttributes },
  ) => {
    dispatch(updatePhoneRequest(phoneId, phoneAttributes));
  };

  const handleAdd = () => {
    dispatch(addPhoneRequest());
  };

  // @ts-ignore
  if (fetchVariantsAndPhonesLoading) return <Loader type="inline" />;

  return (
    <>
      <Text mt={32} mb={24} fontSize={18} fontWeight="bold">
        {formatMessage(messages.SMSAlertRecipients)}
      </Text>
      {phones.map((phone) => (
        <Row align="center" mb={16} key={`text-message-phone-${phone.id}`}>
          <PhoneNumberForm
            // @ts-ignore
            formatMessage={formatMessage}
            phone={phone}
            changePhoneNumber={(payload: PhoneNumberFormCalculatedValue) =>
              handleChange(phone.id, payload)
            }
            confirmationDisabled
            disabled={disabled}
          />
          <ImageButton
            ml={16}
            mt={21}
            width={24}
            title={formatMessage(messages.removeRecipient)}
            src={BinIcon}
            onClick={() => handleRemove(phone.id)}
            disabled={disabled}
            loading={removePhoneLoading && removedPhoneId === phone.id}
          />
        </Row>
      ))}
      <Row>
        <TextButton
          onClick={handleAdd}
          buttonProps={{ color: themeColors.secondary }}
          loading={addPhoneLoading}
          disabled={disabled}
        >
          {formatMessage(messages.addAnotherRecipient)}
        </TextButton>
      </Row>
    </>
  );
};
