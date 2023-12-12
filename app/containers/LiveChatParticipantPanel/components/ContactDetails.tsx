import React from 'react';

import { PhoneAttributes } from 'models/Phone';
import { colors, themeColors } from 'theme';

import greenPhone from 'assets/svg/green-phone.svg';
import greenEmail from 'assets/svg/green-email.svg';
import messagePhoneIcon from 'assets/svg/message-phone.svg';

import Text from 'components/Text';
import Row from 'components/Row';
import Icon from 'components/Icon';
import { AnchorNoUnderline } from 'components/AnchorNoUnderline';

type Props = {
  phone: Nullable<PhoneAttributes>;
  messagePhone: Nullable<PhoneAttributes>;
  contactEmail: Nullable<string>;
  contactMessage: Nullable<string>;
};

const ContactDetails = ({
  contactEmail,
  phone,
  messagePhone,
  contactMessage,
}: Props) => (
  <>
    <Text
      color={colors.bluewood}
      textOpacity={0.7}
      mt={16}
      mb={24}
      lineHeight="22px"
      textAlign="center"
    >
      {contactMessage}
    </Text>
    {phone && (
      <Row mb={8} align="center">
        {/* @ts-ignore */}
        <Icon mr={8} src={greenPhone} alt="phone" />
        <AnchorNoUnderline href={`tel:${phone.prefix}${phone.number}`}>
          <Text fontSize="14px" color={themeColors.primary} fontWeight="medium">
            {`${phone.prefix}${phone.number}`}
          </Text>
        </AnchorNoUnderline>
      </Row>
    )}
    {messagePhone && (
      <Row mb={8} align="center">
        {/* @ts-ignore */}
        <Icon mr={8} src={messagePhoneIcon} alt="sms" />
        <AnchorNoUnderline
          href={`sms:${messagePhone.prefix}${messagePhone.number}`}
        >
          <Text fontSize="14px" color={themeColors.primary} fontWeight="medium">
            {`${messagePhone.prefix}${messagePhone.number}`}
          </Text>
        </AnchorNoUnderline>
      </Row>
    )}
    {contactEmail && (
      <Row mb={8} align="center">
        {/* @ts-ignore */}
        <Icon mr={8} src={greenEmail} alt="email" />
        <AnchorNoUnderline target="_blank" href={`mailto:${contactEmail}`}>
          <Text fontSize="14px" color={themeColors.primary} fontWeight="medium">
            {contactEmail}
          </Text>
        </AnchorNoUnderline>
      </Row>
    )}
  </>
);

export default ContactDetails;
