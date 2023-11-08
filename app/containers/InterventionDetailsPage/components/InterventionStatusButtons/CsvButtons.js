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
  csv,
  interventionId,
  handleSendCsv,
}) => {
  const { canDownloadInterventionCsv } = useRoleManager();

  const { filename, generatedAt } = csv ?? {};

  const CsvDownload = () => (
    <FileDownload
      url={`/v1/interventions/${interventionId}/csv_attachment`}
      fileName={filename}
    >
      {({ isDownloading }) => (
        <Tooltip
          id={`intervention-csv-generated-at-${generatedAt}`}
          text={`${formatMessage(globalMessages.lastCsvDate)}${dayjs(
            generatedAt,
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
    <ShareButton outlined onClick={handleSendCsv}>
      <FormattedMessage {...(generatedAt ? messages.csvNew : messages.csv)} />
    </ShareButton>
  );

  if (!canDownloadInterventionCsv) return <></>;
  return (
    <>
      {generatedAt && <CsvDownload />}
      <CsvButton />
    </>
  );
};

CsvButtons.propTypes = {
  intl: PropTypes.shape(IntlShape),
  csv: PropTypes.object,
  interventionId: PropTypes.string,
  handleSendCsv: PropTypes.func,
};

export default injectIntl(CsvButtons);
