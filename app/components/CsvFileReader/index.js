/**
 *
 * CsvFileReader
 *
 */

import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { CSVReader } from 'react-papaparse';
import { compose } from 'redux';
import { toast } from 'react-toastify';
import { injectIntl, IntlShape } from 'react-intl';

import Img from 'components/Img';
import Row from 'components/Row';
import Text from 'components/Text';
import csvFileIcon from 'assets/svg/csv-file.svg';
import { themeColors } from 'theme';

import messages from './messages';
import styles from './styled';
import { CSV_FILE_UPLOAD_ERROR } from './constants';

const CsvFileReader = ({
  children,
  onUpload,
  intl: { formatMessage },
  disabled,
  config,
}) => {
  const readerRef = useRef(null);

  const handleOpen = (event) => {
    const { current } = readerRef;
    if (current) current.open(event);
  };

  const handleError = (err, file) =>
    toast.error(formatMessage(messages.error, { file, err }), {
      toastId: CSV_FILE_UPLOAD_ERROR,
    });

  return (
    <CSVReader
      disabled
      ref={readerRef}
      onDrop={onUpload}
      onError={handleError}
      noDrag
      noClick
      style={styles}
      noProgressBar
      config={config}
    >
      {() => (
        <Row disabled={disabled} align="center" clickable onClick={handleOpen}>
          <Img src={csvFileIcon} alt="upload" mr={10} />
          <Text
            whiteSpace="nowrap"
            color={themeColors.secondary}
            fontWeight="bold"
          >
            {children}
          </Text>
        </Row>
      )}
    </CSVReader>
  );
};

CsvFileReader.propTypes = {
  children: PropTypes.node,
  onUpload: PropTypes.func,
  intl: PropTypes.shape(IntlShape),
  disabled: PropTypes.bool,
  config: PropTypes.object,
};

export default compose(injectIntl)(CsvFileReader);
