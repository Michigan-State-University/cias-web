/**
 *
 * CsvFileExport
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { CSVDownloader } from 'react-papaparse';

import Img from 'components/Img';
import Row from 'components/Row';
import Text from 'components/Text';

import csvFileIcon from 'assets/svg/csv-file.svg';
import { themeColors } from 'theme';

import { StyledCsvFileExport } from './styled';

const CsvFileExport = ({ data, filename, children }) => (
  <StyledCsvFileExport>
    <CSVDownloader
      data={data}
      type="button"
      filename={filename}
      className="button"
    >
      <Row>
        <Img src={csvFileIcon} alt="upload" mr={10} />
        <Text
          whiteSpace="nowrap"
          color={themeColors.secondary}
          fontWeight="bold"
        >
          {children}
        </Text>
      </Row>
    </CSVDownloader>
  </StyledCsvFileExport>
);

CsvFileExport.propTypes = {
  data: PropTypes.array,
  filename: PropTypes.string,
  children: PropTypes.node,
};

export default CsvFileExport;
