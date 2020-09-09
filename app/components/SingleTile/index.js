/**
 *
 * SingleTile
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage, injectIntl } from 'react-intl';
import binNoBg from 'assets/svg/bin-no-bg.svg';
import csvIcon from 'assets/svg/csv-icon.svg';
import fileShare from 'assets/svg/file-share.svg';
import copy from 'assets/svg/copy.svg';
import globalMessages from 'global/i18n/globalMessages';
import { useInjectSaga } from 'utils/injectSaga';

import { connect } from 'react-redux';

import {
  sendProblemCsvRequest,
  editProblemRequest,
} from 'global/reducers/problem';

import {
  copyProblemRequest,
  archiveProblemRequest,
} from 'global/reducers/problems';

import EllipsisText from 'components/Text/EllipsisText';
import Dropdown from 'components/Dropdown';
import Modal from 'components/Modal';
import SelectResearchers from 'containers/ProblemDetailsPage/components/SelectResearchers';
import messages from './messages';
import {
  TileContainer,
  StyledLink,
  Heading,
  StatusIndicator,
  TileInfo,
} from './styled';
import saga from './saga';

const SingleTile = ({
  tileData,
  participantView,
  link,
  sendCsv,
  copyProblem,
  archiveProblem,
  intl: { formatMessage },
}) => {
  useInjectSaga({ key: 'tileSaga', saga });

  const [modalVisible, setModalVisible] = useState(false);

  const closeModal = () => setModalVisible(false);
  const openModal = () => setModalVisible(true);

  const handleArchiveProblem = () => archiveProblem(id);

  const { name, status, interventions, id } = tileData || {};

  const handleCsvRequest = () => sendCsv(id);

  const handleClone = () =>
    copyProblem({ problemId: id, withoutRedirect: true });

  const options = [
    {
      icon: csvIcon,
      action: handleCsvRequest,
      label: formatMessage(messages.exportCSV),
      id: 'Export CSV',
    },
    {
      icon: fileShare,
      action: openModal,
      label: formatMessage(messages.sendCopy),
      id: 'Send copy to researcher',
    },
    ...((status === 'closed' && [
      {
        icon: binNoBg,
        action: handleArchiveProblem,
        label: formatMessage(messages.archive),
        id: 'Archive e-intervention',
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

  return (
    <StyledLink to={link}>
      <Modal title="Share" onClose={closeModal} visible={modalVisible}>
        <SelectResearchers problemId={id} onClose={closeModal} />
      </Modal>
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
        <TileInfo>
          {interventions && (
            <div>
              <FormattedMessage
                {...messages.sessions}
                values={{ sessionCount: interventions.length }}
              />
            </div>
          )}
        </TileInfo>
      </TileContainer>
    </StyledLink>
  );
};

SingleTile.propTypes = {
  tileData: PropTypes.object,
  intl: PropTypes.object,
  participantView: PropTypes.bool,
  link: PropTypes.string,
  sendCsv: PropTypes.func,
  copyProblem: PropTypes.func,
  editProblem: PropTypes.func,
  archiveProblem: PropTypes.func,
};

const mapDispatchToProps = {
  copyProblem: copyProblemRequest,
  sendCsv: sendProblemCsvRequest,
  editProblem: editProblemRequest,
  archiveProblem: archiveProblemRequest,
};

const SingleTileWithIntl = injectIntl(SingleTile);

export default memo(
  connect(
    null,
    mapDispatchToProps,
  )(SingleTileWithIntl),
);
