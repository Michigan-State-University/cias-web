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

// Safe from either route: `selectAnswerSessionPageDomain` falls back to `initialState` when the
// slice is not injected, so this reads `false` on the invite page rather than throwing.
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
  // Set by both landing routes. The notice covers the window before a fill exists; once the server
  // has reported on one, `AnswerSessionPage`'s `TestRunBanner` is the authority and this hides.
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

/**
 * Only an explicit `VALID` lets the page through (CIAS-4187) — a pending check and an unreachable
 * backend both block. The backend marker fails open and an unmarked fill is permanent participant
 * data with no purge path, so "we do not know" must not be answered as "it is fine".
 *
 * Must wrap the landing routes in `containers/App` and never sit inside `AnswerSessionPage`: the
 * guarantee is that the page underneath does not mount at all, so none of its effects run and
 * neither `createUserSession` nor `acceptInterventionInvite` is ever dispatched.
 */
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
    // `useInjectReducer` does not eject, so a verdict from an earlier gated mount is still in the
    // slice on this one. Children's effects run before the parent's, so without this the page
    // underneath mounts — and on the invite route creates a `UserIntervention` — on the stale answer.
    setAsked(true);
  }, [token]);

  // Declared after the token effect on purpose: both run on mount in declaration order, and the
  // token effect clears the verdict. The slice is not a reliable place to keep it — a global auth
  // reset ("Complete session" for a guest) reinitialises injected reducers and rewinds `status` to
  // PENDING. The gate does not remount, so `asked` survives and the token-keyed effect never
  // re-asks; without this latch the gate sits on a spinner forever.
  useEffect(() => {
    if (status !== TestLinkTokenStatus.PENDING) setVerdict(status);
  }, [status]);

  // Latched for the same reason as the verdict: `RESET_REDUCER` would otherwise clear the refusal
  // and let the page back in, remounting it and creating a second session.
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

  // The server refused the marker, so this fill would be permanent participant data. Blocking here
  // stops the finish, which is what writes chart statistics, reports, SMS and the HFHS message.
  if (markerRefused) {
    return renderBlocked({
      header: messages.markerFailedHeader,
      text: messages.markerFailedText,
    });
  }

  if (effectiveStatus === TestLinkTokenStatus.VALID) {
    // The fragment is rendered unconditionally so `children` keeps its position in the tree.
    // Returning `children` bare in one branch and wrapped in another changes the element structure,
    // which makes React unmount and remount the page underneath — losing its state and re-running
    // its mount effects, including the one that creates the session.
    //
    // The notice itself stands down once the server has ruled on a real fill: from that point
    // `AnswerSessionPage`'s `TestRunBanner` reports the verdict with authority, and a second banner
    // about the link would only duplicate or contradict it.
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
