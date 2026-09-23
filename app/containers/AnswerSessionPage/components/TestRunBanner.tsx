import React from 'react';
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';

import Box from 'components/Box';
import { Alert, AlertType } from 'components/Alert';

import {
  makeSelectTestRunFill,
  makeSelectTestRunMarkerFailed,
} from '../selectors';
import messages from '../messages';

export type Props = {
  isPreview?: boolean;
};

/**
 * Driven by what the backend reported on the fill response, never by whether the client sent a
 * token: the marker fails open, so a refused token produces a fill indistinguishable from a marked
 * one unless the server says otherwise.
 *
 * The marker-failed warning is suppressed in preview: `test_run_meta` reports `false` for any
 * non-guest, so a logged-in researcher previewing in a tab that once captured a token would trip
 * the mismatch even though a preview creates no participant at all.
 */
const TestRunBanner = ({ isPreview = false }: Props) => {
  const { formatMessage } = useIntl();
  const isTestRun = useSelector(makeSelectTestRunFill());
  const markerFailed =
    useSelector(makeSelectTestRunMarkerFailed()) && !isPreview;

  if (!isTestRun && !markerFailed) return null;

  return (
    <Box
      width="100%"
      px={24}
      pt={16}
      data-cy={markerFailed ? 'test-run-failed-banner' : 'test-run-banner'}
    >
      <Alert
        content={formatMessage(
          markerFailed
            ? messages.testRunMarkerFailedBanner
            : messages.testRunBanner,
        )}
        type={markerFailed ? AlertType.WARNING : AlertType.WARNING_LIGHT}
        centered
      />
    </Box>
  );
};

export default TestRunBanner;
