import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useInjectSaga } from 'redux-injectors';
import { createStructuredSelector } from 'reselect';
import isFunction from 'lodash/isFunction';

import {
  downloadFileRequest,
  makeSelectFileDownloadLoading,
  downloadFileSaga,
} from 'global/reducers/globalState';

import Box from 'components/Box';

import { FileDownloadContext } from './utils';

const FileDownload = ({
  url,
  children,
  isFileDownloading,
  downloadFile,
  fileName,
  onDownloadStart,
  ...styleProps
}) => {
  useInjectSaga({ key: 'downloadFile', saga: downloadFileSaga });

  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (!isFileDownloading && isDownloading) setIsDownloading(false);
  }, [isFileDownloading]);

  const handleClick = () => {
    if (!url) return;
    setIsDownloading(true);
    if (onDownloadStart) onDownloadStart();
    downloadFile(url, fileName);
  };

  const isDownloadingValue = useMemo(
    () => ({ isDownloading }),
    [isDownloading],
  );

  return (
    <Box onClick={handleClick} role="button" {...styleProps}>
      <FileDownloadContext.Provider value={isDownloadingValue}>
        <FileDownloadContext.Consumer>
          {isFunction(children) ? children : () => children}
        </FileDownloadContext.Consumer>
      </FileDownloadContext.Provider>
    </Box>
  );
};

FileDownload.propTypes = {
  url: PropTypes.string,
  fileName: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  isFileDownloading: PropTypes.bool,
  downloadFile: PropTypes.func,
  onDownloadStart: PropTypes.func,
  styleProps: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  isFileDownloading: makeSelectFileDownloadLoading(),
});

const mapDispatchToProps = {
  downloadFile: downloadFileRequest,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(FileDownload);
