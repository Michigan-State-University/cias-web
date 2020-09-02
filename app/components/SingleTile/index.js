/**
 *
 * SingleTile
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import binNoBg from 'assets/svg/bin-no-bg.svg';
import csvIcon from 'assets/svg/csv-icon.svg';
import fileShare from 'assets/svg/file-share.svg';
import Img from 'components/Img';
import globalMessages from 'global/i18n/globalMessages';
import { useInjectSaga } from 'utils/injectSaga';
import { connect } from 'react-redux';

import {
  sendProblemCsvSaga,
  sendProblemCsvRequest,
} from 'global/reducers/problem';

import EllipsisText from 'components/Text/EllipsisText';
import messages from './messages';
import {
  TileContainer,
  StyledLink,
  Heading,
  StatusIndicator,
  TileInfo,
} from './styled';

const SingleTile = ({ tileData, participantView, link, sendCsv }) => {
  useInjectSaga({ key: 'sendProblemCsvSaga', saga: sendProblemCsvSaga });

  const { name, status, interventions, id } = tileData || {};

  const handleCsvRequest = e => {
    e.preventDefault();
    sendCsv(id);
  };

  return (
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
            <div>
              <Img
                onClick={handleCsvRequest}
                ml={15}
                src={csvIcon}
                alt="export csv"
              />
              <Img ml={15} src={fileShare} alt="share" />
              <Img ml={15} src={binNoBg} alt="remove" />
            </div>
          )}
        </Heading>
        <EllipsisText text={name} />
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
  participantView: PropTypes.bool,
  link: PropTypes.string,
  sendCsv: PropTypes.func,
};

const mapDispatchToProps = {
  sendCsv: sendProblemCsvRequest,
};

export default memo(
  connect(
    null,
    mapDispatchToProps,
  )(SingleTile),
);
