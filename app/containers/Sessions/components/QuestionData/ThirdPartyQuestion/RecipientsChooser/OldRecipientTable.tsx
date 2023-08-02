import React, { FC } from 'react';
import { useIntl } from 'react-intl';

import RedBin from 'assets/svg/bin-red-no-bg.svg';

import { StripedTR, Table, TBody, TD } from 'components/Table';
import Row from 'components/Row';
import Text from 'components/Text';
import { ImageButton } from 'components/Button';

import messages from './messages';

export type Props = {
  recipients: string[];
};

export const OldRecipientTable: FC<Props> = ({ recipients }) => {
  const { formatMessage } = useIntl();

  return (
    <Table width="100%" tableLayout="fixed">
      <TBody>
        {recipients.map((recipient) => (
          <StripedTR height="auto">
            <TD padding="12px 8px">
              <Row justify="between" align="center" gap={8}>
                <Text fontSize={15} lineHeight={1.5} truncate>
                  {recipient}
                </Text>
                <ImageButton
                  src={RedBin}
                  onClick={() => {}}
                  title={formatMessage(messages.deleteRecipient)}
                />
              </Row>
            </TD>
          </StripedTR>
        ))}
      </TBody>
    </Table>
  );
};
