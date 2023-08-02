import React from 'react';
import { useIntl } from 'react-intl';

import RedBin from 'assets/svg/bin-red-no-bg.svg';

import Tabs from 'components/Tabs';
import { ModalContentRenderer } from 'components/Modal';
import { StripedTR, Table, TBody, TD } from 'components/Table';
import Row from 'components/Row';
import Text from 'components/Text';
import { ImageButton } from 'components/Button';

import messages from './messages';
import { Recipients } from './types';

export type Props = {};

export const ManageRecipientsModalContent: ModalContentRenderer<Recipients> = ({
  modalState,
}) => {
  const { formatMessage } = useIntl();

  if (!modalState) return null;
  const { emails } = modalState;

  return (
    // @ts-ignore
    <Tabs
      mt={14}
      withBottomBorder
      emphasizeActiveLink
      containerProps={{ mb: 0, mt: 16 }}
    >
      {/* @ts-ignore */}
      <div label={formatMessage(messages.emailRecipients)}>
        <Table width="100%" tableLayout="fixed">
          <TBody>
            {emails.map((email) => (
              <StripedTR height="auto">
                <TD padding="12px 8px">
                  <Row justify="between" align="center" gap={8}>
                    <Text fontSize={15} lineHeight={1.5} truncate>
                      {email}
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
      </div>
      {/* @ts-ignore */}
      <div label={formatMessage(messages.faxRecipients)}></div>
    </Tabs>
  );
};
