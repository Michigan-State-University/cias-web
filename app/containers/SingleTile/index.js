/**
 *
 * SingleTile
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { injectSaga } from 'redux-injectors';
import { connect } from 'react-redux';
import { compose } from 'redux';

import BinNoBgIcon from 'assets/svg/bin-no-bg.svg';
import CsvIcon from 'assets/svg/csv-icon.svg';
import FileShareIcon from 'assets/svg/file-share.svg';
import CopyIcon from 'assets/svg/copy.svg';
import AddAppIcon from 'assets/svg/app-add.svg';
import TranslateIcon from 'assets/svg/translate.svg';

import { colors } from 'theme';

import globalMessages from 'global/i18n/globalMessages';
import { makeSelectUserId, makeSelectUserRoles } from 'global/reducers/auth';
import { interventionOptionsSaga } from 'global/sagas/interventionOptionsSaga';
import { sendInterventionCsvRequest } from 'global/reducers/intervention';
import {
  copyInterventionRequest,
  archiveInterventionRequest,
} from 'global/reducers/interventions';

import { canArchive, canEdit } from 'models/Status/statusPermissions';
import { RolePermissions } from 'models/User/RolePermissions';

import isNullOrUndefined from 'utils/isNullOrUndefined';

import { InterventionAssignOrganizationModal } from 'containers/InterventionDetailsPage/components/Modals';
import SelectResearchers from 'containers/SelectResearchers';

import EllipsisText from 'components/Text/EllipsisText';
import Text from 'components/Text';
import Tooltip from 'components/Tooltip';
import Dropdown from 'components/Dropdown';
import Modal from 'components/Modal';
import Row from 'components/Row';
import Badge from 'components/Badge';
import Loader from 'components/Loader';
import TranslateInterventionModal from 'containers/TranslateInterventionModal';

import InterventionDetails from './InterventionDetails';
import messages from './messages';
import {
  TileContainer,
  StyledLink,
  Heading,
  StatusIndicator,
  TileInfo,
} from './styled';

const SingleTile = ({
  tileData,
  participantView,
  link,
  sendCsv,
  copyIntervention,
  archiveIntervention,
  intl: { formatMessage },
  userId,
  userRoles,
  isLoading,
}) => {
  const [
    shareWithResearchersModalVisible,
    setShareWithResearchersModalVisible,
  ] = useState(false);

  const [assignOrganizationModalVisible, setAssignOrganizationModalVisible] =
    useState(false);

  const [translateModalVisible, setTranslateModalVisible] = useState(false);

  const closeShareWithResearchersModal = () =>
    setShareWithResearchersModalVisible(false);
  const openShareWithResearchersModal = () =>
    setShareWithResearchersModalVisible(true);

  const closeAssignOrganizationModal = () =>
    setAssignOrganizationModalVisible(false);
  const openAssignOrganizationModal = () =>
    setAssignOrganizationModalVisible(true);

  const closeTranslateModal = () => setTranslateModalVisible(false);
  const openTranslateModal = () => setTranslateModalVisible(true);

  const handleArchiveIntervention = () => archiveIntervention(id);

  const {
    name,
    status,
    sessionsSize,
    id,
    organizationId,
    user,
    createdAt,
    updatedAt,
    googleLanguageId,
  } = tileData || {};

  const handleCsvRequest = () => sendCsv(id);

  const canExportCSV = userId === user?.id;
  const { canAssignOrganizationToIntervention } = RolePermissions(userRoles);

  const handleClone = () =>
    copyIntervention({ interventionId: id, withoutRedirect: true });

  const options = [
    {
      icon: TranslateIcon,
      action: openTranslateModal,
      label: formatMessage(messages.translate),
      id: 'translate',
    },
    ...(canExportCSV
      ? [
          {
            icon: CsvIcon,
            action: handleCsvRequest,
            label: formatMessage(messages.exportCSV),
            id: 'Export CSV',
          },
        ]
      : []),
    {
      icon: FileShareIcon,
      action: openShareWithResearchersModal,
      label: formatMessage(messages.sendCopy),
      id: 'Send copy to researcher',
    },
    ...((canArchive(status) && [
      {
        icon: BinNoBgIcon,
        action: handleArchiveIntervention,
        label: formatMessage(messages.archive),
        id: 'Archive e-session',
      },
    ]) ||
      []),
    {
      id: 'duplicate',
      label: formatMessage(messages.duplicate),
      icon: CopyIcon,
      action: handleClone,
    },
    ...(canAssignOrganizationToIntervention
      ? [
          {
            icon: AddAppIcon,
            action: openAssignOrganizationModal,
            label: formatMessage(messages.assignOrganization),
            id: 'assignOrganization',
            disabled: !canEdit(status),
          },
        ]
      : []),
  ];

  const preventDefault = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const copyInterventionToResearchers = (users) =>
    copyIntervention({ interventionId: id, users });

  if (isLoading)
    return (
      <TileContainer>
        <Loader type="inline" />
      </TileContainer>
    );

  return (
    <>
      <Modal
        title={formatMessage(messages.sendCopyModalTitle)}
        onClose={closeShareWithResearchersModal}
        visible={shareWithResearchersModalVisible}
      >
        <SelectResearchers
          onClose={closeShareWithResearchersModal}
          onResearchersSelected={copyInterventionToResearchers}
        />
      </Modal>
      <Modal onClose={closeTranslateModal} visible={translateModalVisible}>
        <TranslateInterventionModal
          id={id}
          name={name}
          googleLanguageId={googleLanguageId}
          onTranslated={closeTranslateModal}
        />
      </Modal>

      <Modal
        title={formatMessage(messages.assignOrganization)}
        onClose={closeAssignOrganizationModal}
        visible={assignOrganizationModalVisible}
      >
        <InterventionAssignOrganizationModal
          interventionId={id}
          organizationId={organizationId}
          onClose={closeAssignOrganizationModal}
        />
      </Modal>

      <StyledLink to={link}>
        <TileContainer>
          <Heading>
            <div>
              {status && (
                <>
                  <FormattedMessage {...globalMessages.statuses[status]} />
                  <StatusIndicator status={status} />
                </>
              )}
            </div>
            {!participantView && (
              <div onClick={preventDefault}>
                <Dropdown options={options} />
              </div>
            )}
          </Heading>

          <EllipsisText text={name} fontSize={18} fontWeight="bold" />

          <Row justify="between">
            <Tooltip
              id={`${id}-tile-tooltip`}
              content={
                <InterventionDetails
                  formatMessage={formatMessage}
                  user={user}
                  createdAt={createdAt}
                  updatedAt={updatedAt}
                />
              }
            >
              <TileInfo>
                {!isNullOrUndefined(sessionsSize) && (
                  <div>
                    <Text>
                      {formatMessage(messages.sessions, {
                        sessionCount: sessionsSize,
                      })}
                    </Text>
                  </div>
                )}
              </TileInfo>
            </Tooltip>

            {organizationId && (
              <Badge bg={colors.orange}>
                {formatMessage(messages.isFromOrganization)}
              </Badge>
            )}
          </Row>
        </TileContainer>
      </StyledLink>
    </>
  );
};

SingleTile.propTypes = {
  tileData: PropTypes.object,
  intl: PropTypes.object,
  participantView: PropTypes.bool,
  link: PropTypes.string,
  sendCsv: PropTypes.func,
  copyIntervention: PropTypes.func,
  archiveIntervention: PropTypes.func,
  userId: PropTypes.string,
  userRoles: PropTypes.arrayOf(PropTypes.string),
  isLoading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  userId: makeSelectUserId(),
  userRoles: makeSelectUserRoles(),
});

const mapDispatchToProps = {
  copyIntervention: copyInterventionRequest,
  sendCsv: sendInterventionCsvRequest,
  archiveIntervention: archiveInterventionRequest,
};

const SingleTileWithIntl = injectIntl(SingleTile);

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  memo,
  withConnect,
  injectSaga({
    key: 'interventionOptionsSaga',
    saga: interventionOptionsSaga,
  }),
)(SingleTileWithIntl);
