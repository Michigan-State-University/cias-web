import Loader from 'components/Loader';
import React, { memo, ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';

import share from 'assets/svg/share.svg';

import { colors } from 'theme';
import { canShareWithParticipants } from 'models/Status/statusPermissions';
import { formatMessage } from 'utils/intlOutsideReact';

import CopyToClipboard from 'components/CopyToClipboard';
import CsvFileExport from 'components/CsvFileExport';
import Row from 'components/Row';
import H3 from 'components/H3';

import ParticipantInviter from './Components/ParticipantInviter';
import UserList from './Components/UserList';
import messages from './messages';
import { EmailInvitation, EmailLoadingType, ShareBoxType } from './types';

type Props = {
  sendInvite: (emails: string[]) => void;
  resendInvite: (id: string) => void;
  sendLoading: boolean;
  emailLoading: EmailLoadingType;
  listLoading: boolean;
  interventionStatus: string;
  emails: EmailInvitation[];
  inviteUrl: string;
  exportFilename: string;
  shareBoxType: ShareBoxType;
  children: ReactNode;
};

const Component = ({
  sendInvite,
  resendInvite,
  sendLoading,
  emailLoading,
  listLoading,
  interventionStatus,
  emails,
  inviteUrl,
  exportFilename,
  shareBoxType,
  children,
}: Props): JSX.Element => {
  const sharingPossible = canShareWithParticipants(interventionStatus);

  const buttons = [
    {
      action: resendInvite,
      disabled: !sharingPossible,
      text: <FormattedMessage {...messages.resend} />,
    },
  ];

  const exportCsvButton = () => {
    if (emails && emails.length > 0)
      return (
        <Row mt={22}>
          <CsvFileExport
            filename={formatMessage(messages.filename, {
              interventionName: exportFilename,
            })}
            data={emails.map(({ email }) => ({ email }))}
          >
            {formatMessage(messages.exportCsv)}
          </CsvFileExport>
        </Row>
      );
  };

  return (
    <>
      {children}

      <Row mt={20}>
        <ParticipantInviter
          // @ts-ignore
          disabled={!sharingPossible}
          loading={sendLoading}
          sendInvite={sendInvite}
          shareBoxType={shareBoxType}
        />
      </Row>
      {exportCsvButton()}
      <Row mt={15}>
        <CopyToClipboard
          // @ts-ignore
          textToCopy={inviteUrl}
          icon={share}
          iconAlt={formatMessage(messages.share)}
        >
          <FormattedMessage
            {...messages.copyLabel}
            values={{ type: shareBoxType }}
          />
        </CopyToClipboard>
      </Row>
      {/* @ts-ignore */}
      {listLoading && <Loader type="inline" />}
      {emails && emails.length !== 0 && (
        <>
          <H3
            mt={40}
            mb={15}
            fontSize={13}
            fontWeight="bold"
            color={colors.bluewood}
            textOpacity={0.6}
          >
            <FormattedMessage {...messages.userListLabel} />
          </H3>
          <Row maxHeight={350} overflow="scroll" padding={10}>
            <UserList
              buttons={buttons}
              users={emails}
              userWithLoading={emailLoading}
            />
          </Row>
        </>
      )}
    </>
  );
};

export const NormalShareBox = memo(Component);
