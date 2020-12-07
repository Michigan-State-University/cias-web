import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Col, Row as GRow } from 'react-grid-system';

import Row from 'components/Row';
import Icon from 'components/Icon';
import Text from 'components/Text';
import StyledLink from 'components/StyledLink';

import pdf from 'assets/svg/pdf.svg';
import download from 'assets/svg/download.svg';
import { colors, themeColors, boxShadows } from 'theme';

import messages from './messages';
import { DownloadRow, StyledBox } from './styled';

export function ReportTile({ title, id }) {
  return (
    <StyledBox key={`Tile-${id}`} shadow={boxShadows.selago} bg={colors.white}>
      <GRow height="100%" align="center">
        <Col sm={9}>
          <Row align="center">
            <Icon src={pdf} />
            <Text ml={15} fontSize={18} fontWeight="bold">
              {title}
            </Text>
          </Row>
        </Col>
        <Col sm={3}>
          <DownloadRow align="center">
            <StyledLink to="/file.pdf" target="_blank">
              <Text
                mr={5}
                color={themeColors.secondary}
                fontSize={13}
                fontWeight="bold"
              >
                <FormattedMessage {...messages.download} />
              </Text>
              <Icon src={download} />
            </StyledLink>
          </DownloadRow>
        </Col>
      </GRow>
    </StyledBox>
  );
}

ReportTile.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
};
