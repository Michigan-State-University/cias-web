import React, { FC, useMemo } from 'react';
import { useIntl } from 'react-intl';

import { themeColors } from 'theme';

import { ThirdPartyReportQuestionData } from 'models/Question';

import Row from 'components/Row';
import Column from 'components/Column';
import { TextButton } from 'components/Button';

import messages from './messages';
import { divideRecipients } from './utils';
import { RecipientList } from './RecipientList';

export type Props = {
  hidden: boolean;
  disabled: boolean;
  recipientsString: ThirdPartyReportQuestionData['value'];
};

export const RecipientsChooser: FC<Props> = ({
  hidden,
  disabled,
  recipientsString,
}) => {
  const { formatMessage } = useIntl();

  const { emails, faxes } = useMemo(
    () => divideRecipients(recipientsString),
    [recipientsString],
  );

  return (
    <Column mb={10} ml={40} width="auto" hidden={hidden}>
      <RecipientList
        label={formatMessage(messages.emailRecipients)}
        noItemsLabel={formatMessage(messages.noEmailRecipients)}
        recipients={emails}
      />
      <RecipientList
        label={formatMessage(messages.faxRecipients)}
        noItemsLabel={formatMessage(messages.noFaxRecipients)}
        recipients={faxes}
        mt={8}
      />
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
