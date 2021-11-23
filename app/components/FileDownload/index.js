import React, { useEffect, useState } from 'react';
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
  ...styleProps
}) => {
  useInjectSaga({ key: 'downloadFile', saga: downloadFileSaga });

  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (!isFileDownloading && isDownloading) setIsDownloading(false);
  }, [isFileDownloading]);

  const handleClick = () => {
    setIsDownloading(true);
    downloadFile(url, fileName);
  };

  return (
    <Box onClick={handleClick} role="button" {...styleProps}>
      <FileDownloadContext.Provider value={{ isDownloading }}>
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
