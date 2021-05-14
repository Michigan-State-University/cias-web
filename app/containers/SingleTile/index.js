/**
 *
 * SingleTile
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from 'redux-injectors';
import { connect } from 'react-redux';

import binNoBg from 'assets/svg/bin-no-bg.svg';
import csvIcon from 'assets/svg/csv-icon.svg';
import fileShare from 'assets/svg/file-share.svg';
import copy from 'assets/svg/copy.svg';
import globalMessages from 'global/i18n/globalMessages';

import { sendInterventionCsvRequest } from 'global/reducers/intervention';
import {
  copyInterventionRequest,
  archiveInterventionRequest,
} from 'global/reducers/interventions';
import { makeSelectUserId } from 'global/reducers/auth';
import { interventionOptionsSaga } from 'global/sagas/interventionOptionsSaga';

import EllipsisText from 'components/Text/EllipsisText';
import Text from 'components/Text';
import InterventionDetails from 'containers/SingleTile/InterventionDetails';
import Tooltip from 'components/Tooltip';
import Dropdown from 'components/Dropdown';
import Modal from 'components/Modal';
import SelectResearchers from 'containers/SelectResearchers';
import isNullOrUndefined from 'utils/isNullOrUndefined';
import { canArchive } from 'models/Status/statusPermissions';
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
}) => {
  useInjectSaga({
    key: 'interventionOptionsSaga',
    saga: interventionOptionsSaga,
  });

  const [modalVisible, setModalVisible] = useState(false);

  const closeModal = () => setModalVisible(false);
  const openModal = () => setModalVisible(true);

  const handleArchiveIntervention = () => archiveIntervention(id);

  const {
    name,
    status,
    sessions_size: sessionsSize,
    id,
    user,
    created_at: createdAt,
    updated_at: updatedAt,
  } = tileData || {};

  const handleCsvRequest = () => sendCsv(id);

  const canExportCSV = userId === user.id;

  const handleClone = () =>
    copyIntervention({ interventionId: id, withoutRedirect: true });

  const options = [
    ...(canExportCSV
      ? [
          {
            icon: csvIcon,
            action: handleCsvRequest,
            label: formatMessage(messages.exportCSV),
            id: 'Export CSV',
          },
        ]
      : []),
    {
      icon: fileShare,
      action: openModal,
      label: formatMessage(messages.sendCopy),
      id: 'Send copy to researcher',
    },
    ...((canArchive(status) && [
      {
        icon: binNoBg,
        action: handleArchiveIntervention,
        label: formatMessage(messages.archive),
        id: 'Archive e-session',
      },
    ]) ||
      []),
    {
      id: 'duplicate',
      label: formatMessage(messages.duplicate),
      icon: copy,
      action: handleClone,
    },
  ];

  const preventDefault = e => {
    e.stopPropagation();
    e.preventDefault();
  };

  const copyInterventionToResearchers = users =>
    copyIntervention({ interventionId: id, users });

  return (
    <>
      <Modal
        title={formatMessage(messages.modalTitle)}
        onClose={closeModal}
        visible={modalVisible}
      >
        <SelectResearchers
          onClose={closeModal}
          onResearchersSelected={copyInterventionToResearchers}
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
};

const mapStateToProps = createStructuredSelector({
  userId: makeSelectUserId(),
});

const mapDispatchToProps = {
  copyIntervention: copyInterventionRequest,
  sendCsv: sendInterventionCsvRequest,
  archiveIntervention: archiveInterventionRequest,
};

const SingleTileWithIntl = injectIntl(SingleTile);

export default memo(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SingleTileWithIntl),
);
