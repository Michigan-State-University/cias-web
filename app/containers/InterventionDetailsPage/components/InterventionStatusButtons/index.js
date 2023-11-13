/**
 *
 * InterventionStatusButtons
 *
 */
import React, { useState } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import { themeColors } from 'theme';

import { ConfirmationModal } from 'components/Modal';
import { LI, UL } from 'components/List';
import Column from 'components/Column';
import Divider from 'components/Divider';
import Row from 'components/Row';
import Text from 'components/Text';

import {
  draft,
  published,
  closed,
  archived,
  statusTypeToColorMap,
} from 'models/Status/StatusTypes';

import CsvButtons from './CsvButtons';
import messages from './messages';
import { ShareButton } from './styled';

function InterventionStatusButtons({
  intl: { formatMessage },
  status,
  handleChangeStatus,
  handleSendCsv,
  csv,
  interventionId,
  canAccessCsv,
  canCurrentUserMakeChanges,
}) {
  const CloseButton = () => (
    <>
      <ConfirmationModal
        visible={closeConfirmationOpen}
        onClose={closeCloseConfirmation}
        description={<FormattedMessage {...messages.closeConfirmationHeader} />}
        confirmAction={handleClose}
        confirmationButtonColor="primary"
        content={closeConfirmationDesc()}
        contentStyles={{
          padding: '0px',
        }}
        contentContainerStyles={{
          px: 20,
          my: 20,
        }}
      />
      <ShareButton
        bg={statusTypeToColorMap[closed]}
        onClick={openCloseConfirmation}
        disabled={!canCurrentUserMakeChanges}
      >
        <FormattedMessage {...messages.close} />
      </ShareButton>
    </>
  );

  const [closeConfirmationOpen, setCloseConfirmationOpen] = useState(false);
  const openCloseConfirmation = () => setCloseConfirmationOpen(true);
  const closeCloseConfirmation = () => setCloseConfirmationOpen(false);
  const handleClose = () => {
    handleChangeStatus();
    closeCloseConfirmation();
  };

  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const openConfirmation = () => setConfirmationOpen(true);
  const closeConfirmation = () => setConfirmationOpen(false);
  const handlePublish = () => {
    handleChangeStatus();
    closeConfirmation();
  };

  const publishConfirmationDesc = () => (
    <>
      <Text
        mt={10}
        fontSize={18}
        color={themeColors.warning}
        textAlign="center"
      >
        {formatMessage(messages.irreversibleInfo)}
      </Text>
      <Row justify="center" mt={10}>
        <Column ml={18} mr={5}>
          <UL fontSize={12} color={themeColors.primary}>
            <LI>{formatMessage(messages.dataCollectedInfo)}</LI>
            <LI>{formatMessage(messages.editParticipantsInfo)}</LI>
            <LI>{formatMessage(messages.duplicateInfo)}</LI>
          </UL>
        </Column>
        <Column width="1px">
          <Divider />
        </Column>
        <Column ml={25}>
          <UL fontSize={12}>
            <LI>{formatMessage(messages.dataDeletedInfo)}</LI>
            <LI>{formatMessage(messages.editInfo)}</LI>
          </UL>
        </Column>
      </Row>
    </>
  );

  const closeConfirmationDesc = () => (
    <>
      <Text
        mt={10}
        fontSize={18}
        color={themeColors.warning}
        textAlign="center"
      >
        {formatMessage(messages.irreversibleInfo)}
      </Text>
      <Row justify="center" mt={10}>
        <Column ml={18} mr={5}>
          <FormattedMessage {...messages.closeConfirmationMessage} />
        </Column>
      </Row>
    </>
  );

  const PublishButton = () => (
    <>
      <ConfirmationModal
        visible={confirmationOpen}
        onClose={closeConfirmation}
        description={<FormattedMessage {...messages.confirmationTile} />}
        confirmAction={handlePublish}
        confirmationButtonColor="primary"
        content={publishConfirmationDesc()}
        contentStyles={{
          padding: '0px',
        }}
        contentContainerStyles={{
          px: 20,
          my: 20,
        }}
      />
      <ShareButton
        data-cy="publish-session-button"
        onClick={openConfirmation}
        bg={statusTypeToColorMap[published]}
        disabled={!canCurrentUserMakeChanges}
      >
        <FormattedMessage {...messages.publish} />
      </ShareButton>
    </>
  );

  const csvButtons = !canAccessCsv ? null : (
    <CsvButtons
      handleSendCsv={handleSendCsv}
      csv={csv}
      interventionId={interventionId}
    />
  );

  const statuses = {
    [draft]: (
      <>
        {csvButtons}
        <PublishButton />
      </>
    ),
    [published]: (
      <>
        {csvButtons}
        <CloseButton />
      </>
    ),
    [closed]: <>{csvButtons}</>,
    [archived]: <>{csvButtons}</>,
  };

  const renderButtons = () => get(statuses, status, <></>);

  return renderButtons();
}

InterventionStatusButtons.propTypes = {
  intl: PropTypes.object,
  status: PropTypes.string,
  handleChangeStatus: PropTypes.func,
  handleSendCsv: PropTypes.func,
  csv: PropTypes.object,
  canAccessCsv: PropTypes.bool,
  canCurrentUserMakeChanges: PropTypes.bool,
};

export default injectIntl(InterventionStatusButtons);
