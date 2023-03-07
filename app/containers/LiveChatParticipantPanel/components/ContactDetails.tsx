import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';

import { PhoneAttributes } from 'models/Phone';
import { colors, themeColors } from 'theme';

import greenPhone from 'assets/svg/green-phone.svg';
import greenEmail from 'assets/svg/green-email.svg';
import messagePhoneIcon from 'assets/svg/message-phone.svg';

import Text from 'components/Text';
import Row from 'components/Row';
import Icon from 'components/Icon';

import { LinkNoUnderline } from './styled';
import messages from '../messages';

type Props = {
  phone: Nullable<PhoneAttributes>;
  messagePhone: Nullable<PhoneAttributes>;
  contactEmail: Nullable<string>;
};

const ContactDetails = ({ contactEmail, phone, messagePhone }: Props) => {
  const { formatMessage } = useIntl();

  const contactDetailsText = useMemo(() => {
    if (!!contactEmail && phone)
      return formatMessage(messages.phoneEmailContact);
    if (contactEmail) return formatMessage(messages.emailContact);
    if (phone) return formatMessage(messages.phoneContact);
    return null;
  }, [contactEmail, phone]);

  if (!contactDetailsText) return <></>;

  return (
    <>
      <Text
        color={colors.bluewood}
        textOpacity={0.7}
        mt={16}
        mb={24}
        lineHeight="22px"
        textAlign="center"
      >
        {contactDetailsText}
      </Text>
      {phone && (
        <Row mb={8} align="center">
          {/* @ts-ignore */}
          <Icon mr={8} src={greenPhone} alt="phone" />
          <LinkNoUnderline href={`tel:${phone.prefix}${phone.number}`}>
            <Text
              fontSize="14px"
              color={themeColors.primary}
              fontWeight="medium"
            >
              {`${phone.prefix}${phone.number}`}
            </Text>
          </LinkNoUnderline>
        </Row>
      )}
      {messagePhone && (
        <Row mb={8} align="center">
          {/* @ts-ignore */}
          <Icon mr={8} src={messagePhoneIcon} alt="sms" />
          <LinkNoUnderline
            href={`sms:${messagePhone.prefix}${messagePhone.number}`}
          >
            <Text
              fontSize="14px"
              color={themeColors.primary}
              fontWeight="medium"
            >
              {`${messagePhone.prefix}${messagePhone.number}`}
            </Text>
          </LinkNoUnderline>
        </Row>
      )}
      {contactEmail && (
        <Row mb={8} align="center">
          {/* @ts-ignore */}
          <Icon mr={8} src={greenEmail} alt="email" />
          <LinkNoUnderline target="_blank" href={`mailto:${contactEmail}`}>
            <Text
              fontSize="14px"
              color={themeColors.primary}
              fontWeight="medium"
            >
              {contactEmail}
            </Text>
          </LinkNoUnderline>
        </Row>
      )}
    </>
  );
};

export default ContactDetails;
