import React from 'react';
import PropTypes from 'prop-types';
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

export function ReportTile({
  formatMessage,
  id,
  name,
  createdAt,
  pdfReportUrl,
  reportFor,
}) {
  return (
    <StyledBox key={`Tile-${id}`} shadow={boxShadows.selago} bg={colors.white}>
      <GRow height="100%" align="center">
        <Col sm={5}>
          <Row align="center">
            <Icon src={pdf} />
            <Text ml={15} fontSize={18} fontWeight="bold">
              {name}
            </Text>
          </Row>
        </Col>
        <Col>
          <Row align="center">
            <Text>{formatMessage(messages[reportFor])}</Text>
          </Row>
        </Col>
        <Col>
          <DownloadRow align="center">
            <Text mr={10}>{new Date(createdAt).toDateString()}</Text>

            <StyledLink to={() => ({ pathname: pdfReportUrl })} target="_blank">
              <Text
                mr={5}
                color={themeColors.secondary}
                fontSize={13}
                fontWeight="bold"
              >
                {formatMessage(messages.download)}
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
  name: PropTypes.string,
  createdAt: PropTypes.string,
  reportFor: PropTypes.string,
  pdfReportUrl: PropTypes.string,
  formatMessage: PropTypes.func,
};
