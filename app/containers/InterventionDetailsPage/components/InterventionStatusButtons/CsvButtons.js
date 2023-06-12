import React from 'react';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

import { useRoleManager } from 'models/User/RolesManager';

import { FILE_GENERATION_TIME_FORMAT } from 'utils/dayjs';

import globalMessages from 'global/i18n/globalMessages';

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
  disabled,
}) => {
  const { canDownloadInterventionCsv } = useRoleManager();
  const CsvDownload = () => (
    <FileDownload url={urlToDownload}>
      {({ isDownloading }) => (
        <Tooltip
          id={`intervention-csv-generated-at-${csvGeneratedAt}`}
          text={`${formatMessage(globalMessages.lastCsvDate)}${dayjs(
            csvGeneratedAt,
          ).format(FILE_GENERATION_TIME_FORMAT)}`}
        >
          <ShareButton outlined loading={isDownloading}>
            <FormattedMessage {...messages.csvDownload} />
          </ShareButton>
        </Tooltip>
      )}
    </FileDownload>
  );

  const CsvButton = () => (
    <ShareButton outlined onClick={handleSendCsv} disabled={disabled}>
      <FormattedMessage {...(csvLink ? messages.csvNew : messages.csv)} />
    </ShareButton>
  );

  if (!canDownloadInterventionCsv) return <></>;
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
  disabled: PropTypes.bool,
};

export default injectIntl(CsvButtons);
