import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row as GRow } from 'react-grid-system';

import Row from 'components/Row';
import Icon from 'components/Icon';
import Text from 'components/Text';
import FileDownload from 'components/FileDownload';
import StyledCircle from 'components/Circle/StyledCircle';
import Box from 'components/Box';

import PdfRedIcon from 'assets/svg/pdf-red.svg';
import PdfGreyIcon from 'assets/svg/pdf-grey.svg';
import download from 'assets/svg/download.svg';
import { colors, themeColors, boxShadows } from 'theme';

import messages from './messages';
import { DownloadRow, StyledBox } from './styled';
import { NOT_DOWNLOADED_REPORT_CIRCLE_SIZE } from './constants';

export function ReportTile({
  formatMessage,
  id,
  name,
  createdAt,
  pdfReportUrl,
  reportFor,
  downloaded,
}) {
  return (
    <StyledBox key={`Tile-${id}`} shadow={boxShadows.selago} bg={colors.white}>
      <GRow height="100%" align="center">
        <Col sm={5}>
          <Row align="center">
            <Box width={NOT_DOWNLOADED_REPORT_CIRCLE_SIZE} mr={10}>
              {!downloaded && (
                <StyledCircle
                  size={NOT_DOWNLOADED_REPORT_CIRCLE_SIZE}
                  background={colors.fireIsland}
                />
              )}
            </Box>
            <Icon src={downloaded ? PdfGreyIcon : PdfRedIcon} />
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

            <FileDownload url={pdfReportUrl}>
              <Row clickable>
                <Text
                  mr={5}
                  color={themeColors.secondary}
                  fontSize={13}
                  fontWeight="bold"
                >
                  {formatMessage(messages.download)}
                </Text>
                <Icon src={download} />
              </Row>
            </FileDownload>
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
  downloaded: PropTypes.bool,
};
