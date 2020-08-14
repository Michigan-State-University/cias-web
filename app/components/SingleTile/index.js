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
import messages from './messages';

import {
  TileContainer,
  StyledLink,
  Heading,
  StatusIndicator,
  Title,
  TileInfo,
} from './styled';

const SingleTile = ({ tileData, participantView, link }) => {
  const { name, status, interventions } = tileData || {};
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
              <Img ml={15} src={csvIcon} alt="export csv" />
              <Img ml={15} src={fileShare} alt="share" />
              <Img ml={15} src={binNoBg} alt="remove" />
            </div>
          )}
        </Heading>
        <Title>
          <div>{name}</div>
        </Title>
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
};

export default memo(SingleTile);
