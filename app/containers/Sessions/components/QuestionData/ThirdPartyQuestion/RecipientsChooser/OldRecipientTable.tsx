import React from 'react';
import { useIntl } from 'react-intl';

import RedBin from 'assets/svg/bin-red-no-bg.svg';

import { StripedTR, Table, TBody, TD } from 'components/Table';
import Row from 'components/Row';
import Text from 'components/Text';
import { ImageButton } from 'components/Button';

import messages from './messages';

export type Props<T> = {
  recipients: T[];
  itemFormatter?: (recipient: T) => string;
  onRemove: (index: number) => void;
};

export const OldRecipientTable = <T,>({
  recipients,
  itemFormatter = (recipient) => `${recipient}`,
  onRemove,
}: Props<T>) => {
  const { formatMessage } = useIntl();

  return (
    <Table width="100%" tableLayout="fixed">
      <TBody>
        {recipients.map((recipient, index) => (
          <StripedTR height="auto" key={`${recipient}_${index}`}>
            <TD padding="12px 8px">
              <Row justify="between" align="center" gap={8}>
                <Text fontSize={15} lineHeight={1.5} truncate>
                  {itemFormatter(recipient)}
                </Text>
                <ImageButton
                  src={RedBin}
                  onClick={() => onRemove(index)}
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
