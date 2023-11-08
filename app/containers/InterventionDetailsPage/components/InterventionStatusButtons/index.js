/**
 *
 * InterventionStatusButtons
 *
 */
import React, { useMemo, useState } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';

import { themeColors } from 'theme';

import PublishIcon from 'assets/svg/publish.svg';
import PauseIcon from 'assets/svg/pause.svg';
import ReactivateIcon from 'assets/svg/reactivate.svg';
import CloseIcon from 'assets/svg/close.svg';
import ArchiveIcon from 'assets/svg/archive.svg';

import { ConfirmationModal, ModalType, useModal } from 'components/Modal';
import { LI, UL } from 'components/List';
import Column from 'components/Column';
import Divider from 'components/Divider';
import Row from 'components/Row';
import Text from 'components/Text';
import Dropdown from 'components/Dropdown';

import { InterventionStatus } from 'models/Intervention';

import CsvButtons from './CsvButtons';
import messages from './messages';

function InterventionStatusButtons({
  intl: { formatMessage },
  status,
  handleChangeStatus,
  handleSendCsv,
  csvGeneratedAt,
  csvFilename,
  interventionId,
  canAccessCsv,
  canCurrentUserMakeChanges,
}) {
  const [closeConfirmationOpen, setCloseConfirmationOpen] = useState(false);
  const openCloseConfirmation = () => setCloseConfirmationOpen(true);
  const closeCloseConfirmation = () => setCloseConfirmationOpen(false);
  const handleClose = () => {
    handleChangeStatus(InterventionStatus.CLOSED);
    closeCloseConfirmation();
  };

  const [publishConfirmationOpen, setPublishConfirmationOpen] = useState(false);
  const openPublishConfirmation = () => setPublishConfirmationOpen(true);
  const closePublishConfirmation = () => setPublishConfirmationOpen(false);
  const handlePublish = () => {
    handleChangeStatus(InterventionStatus.PUBLISHED);
    closePublishConfirmation();
  };

  const handleArchiveIntervention = () =>
    handleChangeStatus(InterventionStatus.ARCHIVED);

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

  const { openModal: openArchiveModal, Modal: ArchiveModal } = useModal({
    type: ModalType.ConfirmationModal,
    props: {
      description: formatMessage(messages.interventionArchiveHeader),
      content: formatMessage(messages.interventionArchiveMessage),
      confirmAction: handleArchiveIntervention,
    },
  });

  const dropdownOptions = useMemo(() => {
    if (status === InterventionStatus.ARCHIVED) return [];

    return [
      status === InterventionStatus.DRAFT && {
        id: 'publish',
        label: formatMessage(messages.publish),
        action: openPublishConfirmation,
        icon: PublishIcon,
      },
      status !== InterventionStatus.DRAFT && {
        id: 'close',
        label: formatMessage(messages.close),
        action: openCloseConfirmation,
        disabled: status === InterventionStatus.CLOSED,
        icon: CloseIcon,
      },
      status !== InterventionStatus.PAUSED && {
        id: 'pause',
        label: formatMessage(messages.pause),
        // TODO implement pausing
        action: () => {},
        disabled: status !== InterventionStatus.PUBLISHED,
        icon: PauseIcon,
      },
      status === InterventionStatus.PAUSED && {
        id: 'reactivate',
        label: formatMessage(messages.reactivate),
        // TODO implement reactivating
        action: () => {},
        icon: ReactivateIcon,
      },
      {
        id: 'archive',
        label: formatMessage(messages.archive),
        action: openArchiveModal,
        disabled:
          status === InterventionStatus.PUBLISHED ||
          status === InterventionStatus.PAUSED,
        icon: ArchiveIcon,
      },
    ].filter(Boolean);
  }, [status]);

  const showStatusDropdown = status !== InterventionStatus.ARCHIVED;

  return (
    <>
      <ConfirmationModal
        visible={publishConfirmationOpen}
        onClose={closePublishConfirmation}
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
      <ArchiveModal />
      {showStatusDropdown && (
        <Dropdown
          id="intervention-status-dropdown"
          trigger="primary-button"
          buttonTriggerTitle={formatMessage(
            messages.interventionStatusButtonTitle,
          )}
          options={dropdownOptions}
          disabled={!canCurrentUserMakeChanges}
        />
      )}
      {canAccessCsv && (
        <CsvButtons
          handleSendCsv={handleSendCsv}
          csvGeneratedAt={csvGeneratedAt}
          csvFilename={csvFilename}
          interventionId={interventionId}
        />
      )}
    </>
  );
}

InterventionStatusButtons.propTypes = {
  intl: PropTypes.object,
  status: PropTypes.string,
  handleChangeStatus: PropTypes.func,
  handleSendCsv: PropTypes.func,
  csvGeneratedAt: PropTypes.string,
  csvFilename: PropTypes.string,
  canAccessCsv: PropTypes.bool,
  canCurrentUserMakeChanges: PropTypes.bool,
  interventionId: PropTypes.string,
};

export default injectIntl(InterventionStatusButtons);
