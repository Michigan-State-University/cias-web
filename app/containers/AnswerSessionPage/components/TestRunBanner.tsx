import React from 'react';
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';

import Box from 'components/Box';
import { Alert, AlertType } from 'components/Alert';

import { makeSelectTestRunFill } from '../selectors';
import messages from '../messages';

// Driven by what the server reported on the fill response, never by whether the client sent a token.
const TestRunBanner = () => {
  const { formatMessage } = useIntl();
  const isTestRun = useSelector(makeSelectTestRunFill());

  if (!isTestRun) return null;

  return (
    <Box width="100%" px={24} pt={16} data-cy="test-run-banner">
      <Alert
        content={formatMessage(messages.testRunBanner)}
        type={AlertType.WARNING_LIGHT}
        centered
      />
    </Box>
  );
};

export default TestRunBanner;
