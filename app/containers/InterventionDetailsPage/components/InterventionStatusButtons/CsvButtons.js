import React, { useMemo } from 'react';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { RolePermissions } from 'models/User/RolePermissions';
import { makeSelectUserRoles } from 'global/reducers/auth';

import Tooltip from 'components/Tooltip';
import FileDownload from 'components/FileDownload';

import messages from './messages';
import { ShareButton } from './styled';

const CsvButtons = ({
  intl: { formatMessage },
  csvGeneratedAt,
  urlToDownload,
  handleSendCsv,
  csvLink,
  userRoles,
}) => {
  const rolePermissions = useMemo(
    () => RolePermissions(userRoles),
    [userRoles],
  );

  const CsvDownload = () => (
    <FileDownload url={urlToDownload}>
      {({ isDownloading }) => (
        <Tooltip
          id={csvGeneratedAt}
          text={`${formatMessage(messages.lastCsvDate)}${dayjs(
            csvGeneratedAt,
          ).format('YYYY/MM/DD HH:mm')}`}
        >
          <ShareButton outlined loading={isDownloading}>
            <FormattedMessage {...messages.csvDownload} />
          </ShareButton>
        </Tooltip>
      )}
    </FileDownload>
  );

  const CsvButton = () => (
    <ShareButton outlined onClick={handleSendCsv}>
      <FormattedMessage {...(csvLink ? messages.csvNew : messages.csv)} />
    </ShareButton>
  );

  if (!rolePermissions.canDownloadInterventionCsv) return <></>;
  return (
    <>
      {csvLink && <CsvDownload />}
      <CsvButton />
    </>
  );
};

CsvButtons.propTypes = {
  intl: PropTypes.shape(IntlShape),
  csvGeneratedAt: PropTypes.string,
  urlToDownload: PropTypes.string,
  handleSendCsv: PropTypes.func,
  csvLink: PropTypes.string,
  userRoles: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  userRoles: makeSelectUserRoles(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(injectIntl(CsvButtons));
