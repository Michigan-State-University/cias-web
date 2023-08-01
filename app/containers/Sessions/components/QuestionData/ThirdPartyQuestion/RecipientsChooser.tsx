import React, { FC } from 'react';
import { useIntl } from 'react-intl';

import { themeColors } from 'theme';

import { ThirdPartyReportQuestionData } from 'models/Question';

import Row from 'components/Row';
import Column from 'components/Column';
import { TextButton } from 'components/Button';

import messages from './messages';

export type Props = {
  hidden: boolean;
  disabled: boolean;
  value: ThirdPartyReportQuestionData['value'];
};

export const RecipientsChooser: FC<Props> = ({ hidden, disabled }) => {
  const { formatMessage } = useIntl();

  return (
    <Column mb={10} ml={40} hidden={hidden}>
      <Row></Row>
      <Row mt={8}></Row>
      <Row mt={12}>
        <TextButton
          disabled={disabled}
          outlined
          buttonProps={{
            color: themeColors.secondary,
          }}
        >
          {formatMessage(messages.manageRecipients)}
        </TextButton>
      </Row>
    </Column>
  );
};
