import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Col, Row as GRow } from 'react-grid-system';

import Row from 'components/Row';
import Icon from 'components/Icon';
import Text from 'components/Text';
import { StyledButton } from 'components/Button/StyledButton';
import StyledLink from 'components/StyledLink';

import monitor from 'assets/svg/monitor.svg';
import check from 'assets/svg/check-round-green.svg';
import pdf from 'assets/svg/pdf.svg';
import { colors, boxShadows, themeColors } from 'theme';

import messages from './messages';
import { StatusRow, StyledBox } from './styled';

export function SessionTile({ title, available, link }) {
  const renderStatus = () => {
    if (available)
      return (
        <StyledLink to={link}>
          <StyledButton>
            <Text mx={12} color={colors.white} fontSize={14} fontWeight="bold">
              <FormattedMessage {...messages.startSession} />
            </Text>
          </StyledButton>
        </StyledLink>
      );
    return (
      <Row align="center">
        <StyledLink to="/report">
          <Icon src={pdf} />
          <Text ml={5} mr={20} color={themeColors.secondary} fontWeight="bold">
            <FormattedMessage {...messages.download} />
          </Text>
        </StyledLink>
        <Icon src={check} />
        <Text ml={5} whiteSpace="nowrap">
          <FormattedMessage {...messages.completed} />
        </Text>
      </Row>
    );
  };

  return (
    <GRow height="100%" align="center" style={{ height: '100%' }}>
      <Col sm={6}>
        <Row align="center">
          <Icon src={monitor} />
          <Text ml={15} fontSize={18} fontWeight="bold">
            {title}
          </Text>
        </Row>
      </Col>
      <Col sm={6}>
        <StatusRow align="center" justify="end" available={available}>
          {renderStatus()}
        </StatusRow>
      </Col>
    </GRow>
  );
}

function SessionTileWrapper(props) {
  return (
    <StyledBox
      key={`Session-Tile-${props.id}`}
      shadow={boxShadows.selago}
      bg={colors.white}
    >
      <SessionTile {...props} />
    </StyledBox>
  );
}

SessionTileWrapper.propTypes = {
  id: PropTypes.string,
};

SessionTile.propTypes = {
  title: PropTypes.string,
  link: PropTypes.string,
  available: PropTypes.bool,
};

export default SessionTileWrapper;
