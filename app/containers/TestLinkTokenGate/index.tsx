import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
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

import Box from 'components/Box';
import Column from 'components/Column';
import H1 from 'components/H1';
import H2 from 'components/H2';
import Spinner from 'components/Spinner';

import messages from './messages';

type Props = {
  children: ReactElement;
  interventionId?: string;
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
  const [asked, setAsked] = useState(false);

  const token = testLinkTokenAppliesTo(interventionId ?? null)
    ? getTestLinkToken()
    : null;

  useEffect(() => {
    if (!token) return;
    dispatch(verifyTestLinkTokenRequest(token));
    // `useInjectReducer` does not eject, so a verdict from an earlier gated mount is still in the
    // slice on this one. Children's effects run before the parent's, so without this the page
    // underneath mounts — and on the invite route creates a `UserIntervention` — on the stale answer.
    setAsked(true);
  }, [token]);

  if (!token) return children;

  if (!asked || status === TestLinkTokenStatus.PENDING) {
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

  if (status === TestLinkTokenStatus.VALID) return children;

  const { header, text } = blockedCopy(status);

  return (
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
};

export default TestLinkTokenGate;
