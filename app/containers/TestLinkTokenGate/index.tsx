import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MessageDescriptor, useIntl } from 'react-intl';
import { Helmet } from 'react-helmet';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';

import { themeColors } from 'theme';

import { TestLinkTokenStatus } from 'models/TestLinkToken';

import {
  allTestLinkTokenSagas,
  makeSelectTestLinkTokenStatus,
  testLinkTokenReducer,
  testLinkTokenReducerKey,
  verifyTestLinkTokenRequest,
} from 'global/reducers/testLinkToken';

import { getTestLinkToken, testLinkTokenAppliesTo } from 'utils/testLinkToken';

import {
  makeSelectTestRunFill,
  makeSelectTestRunMarkerFailed,
} from 'containers/AnswerSessionPage/selectors';

import { Alert, AlertType } from 'components/Alert';
import Box from 'components/Box';
import Column from 'components/Column';
import H1 from 'components/H1';
import H2 from 'components/H2';
import Spinner from 'components/Spinner';

import messages from './messages';

type Props = {
  children: ReactElement;
  interventionId?: string;
  showNotice?: boolean;
};

const blockedCopy = (status: TestLinkTokenStatus) => {
  switch (status) {
    case TestLinkTokenStatus.EXPIRED:
      return { header: messages.expiredHeader, text: messages.expiredText };
    case TestLinkTokenStatus.UNAVAILABLE:
      return {
        header: messages.unavailableHeader,
        text: messages.unavailableText,
      };
    default:
      return { header: messages.invalidHeader, text: messages.invalidText };
  }
};

const TestLinkTokenGate = ({
  children,
  interventionId,
  showNotice = false,
}: Props): ReactElement => {
  useInjectReducer({
    key: testLinkTokenReducerKey,
    // @ts-ignore — the repo-wide mismatch between a `typesafe-actions` reducer and
    // redux-injectors' `AnyAction` one; see `SessionMapPage` and `withNotificationsReducer`.
    reducer: testLinkTokenReducer,
  });
  useInjectSaga({
    key: testLinkTokenReducerKey,
    saga: allTestLinkTokenSagas,
  });

  const { formatMessage } = useIntl();
  const dispatch = useDispatch();
  const status = useSelector(makeSelectTestLinkTokenStatus());
  const fillMarked = useSelector(makeSelectTestRunFill());
  const markerFailed = useSelector(makeSelectTestRunMarkerFailed());
  const serverHasRuled = fillMarked || markerFailed;
  const [asked, setAsked] = useState(false);
  const [verdict, setVerdict] = useState<Nullable<TestLinkTokenStatus>>(null);
  const [markerRefused, setMarkerRefused] = useState(false);

  const token = testLinkTokenAppliesTo(interventionId ?? null)
    ? getTestLinkToken()
    : null;

  useEffect(() => {
    setVerdict(null);
    setMarkerRefused(false);
    if (!token) return;
    dispatch(verifyTestLinkTokenRequest(token));
    setAsked(true);
  }, [token]);

  useEffect(() => {
    if (status !== TestLinkTokenStatus.PENDING) setVerdict(status);
  }, [status]);

  useEffect(() => {
    if (markerFailed) setMarkerRefused(true);
  }, [markerFailed]);

  const effectiveStatus = verdict ?? status;

  if (!token) {
    return children;
  }

  if (!asked || effectiveStatus === TestLinkTokenStatus.PENDING) {
    return (
      <Box
        width="100%"
        height="100%"
        display="flex"
        justify="center"
        align="center"
      >
        <Spinner size={100} color={themeColors.secondary} />
      </Box>
    );
  }

  const renderBlocked = ({
    header,
    text,
  }: {
    header: MessageDescriptor;
    text: MessageDescriptor;
  }) => (
    <>
      <Helmet>
        <title>{formatMessage(messages.pageTitle)}</title>
      </Helmet>
      <Column height="100%" justify="center" align="center" padding={24}>
        <H1 textAlign="center">{formatMessage(header)}</H1>
        <H2 mt={10} fontWeight="regular" textAlign="center">
          {formatMessage(text)}
        </H2>
      </Column>
    </>
  );

  if (markerRefused) {
    return renderBlocked({
      header: messages.markerFailedHeader,
      text: messages.markerFailedText,
    });
  }

  if (effectiveStatus === TestLinkTokenStatus.VALID) {
    return (
      <>
        {showNotice && !serverHasRuled && (
          <Box width="100%" px={24} pt={16} data-cy="test-link-notice">
            <Alert
              content={formatMessage(messages.testLinkNotice)}
              type={AlertType.WARNING_LIGHT}
              centered
            />
          </Box>
        )}
        {children}
      </>
    );
  }

  return renderBlocked(blockedCopy(effectiveStatus));
};

export default TestLinkTokenGate;
