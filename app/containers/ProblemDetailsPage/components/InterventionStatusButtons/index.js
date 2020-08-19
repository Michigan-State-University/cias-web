/**
 *
 * InterventionStatusButtons
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import { colors } from 'theme';

import messages from './messages';
import { ShareButton } from './styled';

function InterventionStatusButtons({
  status,
  handleChangeStatus,
  handleSendCsv,
}) {
  const CsvButton = () => (
    <ShareButton mr={10} width={200} outlined onClick={handleSendCsv}>
      <FormattedMessage {...messages.csv} />
    </ShareButton>
  );

  const CloseButton = () => (
    <ShareButton
      width={200}
      bg={colors.burntSienna}
      onClick={handleChangeStatus}
    >
      <FormattedMessage {...messages.close} />
    </ShareButton>
  );

  const PublishButton = () => (
    <ShareButton width={200} onClick={handleChangeStatus}>
      <FormattedMessage {...messages.publish} />
    </ShareButton>
  );

  const statuses = {
    draft: <PublishButton />,
    published: (
      <>
        <CsvButton />
        <CloseButton />
      </>
    ),
    closed: <CsvButton />,
  };

  const renderButtons = () => get(statuses, status, <></>);

  return renderButtons();
}

InterventionStatusButtons.propTypes = {
  status: PropTypes.string,
  handleChangeStatus: PropTypes.func,
  handleSendCsv: PropTypes.func,
};

export default InterventionStatusButtons;
