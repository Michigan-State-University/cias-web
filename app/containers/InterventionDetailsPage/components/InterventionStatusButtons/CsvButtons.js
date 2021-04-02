import React from 'react';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Tooltip from 'components/Tooltip';
import { Roles } from 'models/User/UserRoles';
import { makeSelectUserRoles } from 'global/reducers/auth';

import messages from './messages';
import { ShareButton } from './styled';

const CsvButtons = ({
  intl: { formatMessage },
  csvGeneratedAt,
  fileName,
  urlToDownload,
  handleSendCsv,
  csvLink,
  userRoles,
}) => {
  const CsvDownload = () => (
    <Tooltip
      id={csvGeneratedAt}
      text={`${formatMessage(messages.lastCsvDate)}${dayjs(
        csvGeneratedAt,
      ).format('YYYY/MM/DD HH:mm')}`}
    >
      <ShareButton outlined>
        <a href={urlToDownload} download={fileName}>
          <FormattedMessage {...messages.csvDownload} />
        </a>
      </ShareButton>
    </Tooltip>
  );

  const CsvButton = () => (
    <ShareButton outlined onClick={handleSendCsv}>
      <FormattedMessage {...(csvLink ? messages.csvNew : messages.csv)} />
    </ShareButton>
  );

  if (!(userRoles.includes(Roles.admin) || userRoles.includes(Roles.teamAdmin)))
    return <></>;
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
  fileName: PropTypes.string,
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
