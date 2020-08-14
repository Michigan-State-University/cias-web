/**
 *
 * CsvFileReader
 *
 */

import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { CSVReader } from 'react-papaparse';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { error } from 'react-toastify-redux';
import { injectIntl, intlShape } from 'react-intl';

import Img from 'components/Img';
import Row from 'components/Row';
import Text from 'components/Text';
import { themeColors } from 'theme';

import messages from './messages';
import styles from './styled';
import { CSV_FILE_UPLOAD_ERROR } from './constants';

const CsvFileReader = ({
  icon,
  children,
  onUpload,
  intl: { formatMessage },
  showError,
}) => {
  const readerRef = useRef(null);

  const handleOpen = event => {
    const { current } = readerRef;
    if (current) current.open(event);
  };

  const handleError = (err, file) =>
    showError(formatMessage(messages.error, { file, err }), {
      id: CSV_FILE_UPLOAD_ERROR,
    });
  return (
    <CSVReader
      ref={readerRef}
      onDrop={onUpload}
      onError={handleError}
      noDrag
      noClick
      style={styles}
      noProgressBar
    >
      {() => (
        <Row align="center" clickable onClick={handleOpen}>
          {icon && <Img src={icon} alt="upload" mr={10} />}
          <Text color={themeColors.secondary} fontWeight="bold">
            {children}
          </Text>
        </Row>
      )}
    </CSVReader>
  );
};

CsvFileReader.propTypes = {
  icon: PropTypes.string,
  children: PropTypes.node,
  onUpload: PropTypes.func,
  intl: intlShape,
  showError: PropTypes.func,
};

const mapDispatchToProps = {
  showError: error,
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  injectIntl,
  withConnect,
)(CsvFileReader);
