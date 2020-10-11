/**
 *
 * InterventionStatusButtons
 *
 */

import React, { useState } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import { colors } from 'theme';

import ConfirmationBox from 'components/ConfirmationBox';
import { LI, UL } from 'components/List';

import messages from './messages';
import { ShareButton } from './styled';

function InterventionStatusButtons({
  intl: { formatMessage },
  status,
  handleChangeStatus,
  handleSendCsv,
}) {
  const CsvButton = () => (
    <ShareButton mr={10} width={200} outlined onClick={handleSendCsv}>
      <FormattedMessage {...messages.csv} />
    </ShareButton>
  );

  const CloseButton = () => (
    <ShareButton
      width={200}
      bg={colors.burntSienna}
      onClick={handleChangeStatus}
    >
      <FormattedMessage {...messages.close} />
    </ShareButton>
  );

  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const openConfirmation = () => setConfirmationOpen(true);
  const closeConfirmation = () => setConfirmationOpen(false);
  const handlePublish = () => {
    handleChangeStatus();
    closeConfirmation();
  };

  const publishConfirmationDesc = () => (
    <UL fontSize={11} textAlign="center">
      <LI>○ {formatMessage(messages.irreversibleInfo)}</LI>
      <LI>○ {formatMessage(messages.dataInfo)}</LI>
      <LI>○ {formatMessage(messages.editInfo)}</LI>
      <LI>○ {formatMessage(messages.accessInfo)}</LI>
    </UL>
  );

  const PublishButton = () => (
    <>
      <ConfirmationBox
        visible={confirmationOpen}
        onClose={closeConfirmation}
        description={<FormattedMessage {...messages.confirmationTile} />}
        confirmAction={handlePublish}
        confirmationButtonColor="primary"
        content={publishConfirmationDesc()}
        contentStyles={{
          padding: '0px',
        }}
      />
      <ShareButton width={200} onClick={openConfirmation}>
        <FormattedMessage {...messages.publish} />
      </ShareButton>
    </>
  );

  const statuses = {
    draft: <PublishButton />,
    published: (
      <>
        <CsvButton />
        <CloseButton />
      </>
    ),
    closed: <CsvButton />,
  };

  const renderButtons = () => get(statuses, status, <></>);

  return renderButtons();
}

InterventionStatusButtons.propTypes = {
  intl: PropTypes.object,
  status: PropTypes.string,
  handleChangeStatus: PropTypes.func,
  handleSendCsv: PropTypes.func,
};

export default injectIntl(InterventionStatusButtons);
