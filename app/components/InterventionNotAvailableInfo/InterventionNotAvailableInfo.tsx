import { FormattedMessage, useIntl } from 'react-intl';
import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet';

import { RoutePath } from 'global/constants';

import { StyledButton } from 'components/Button/StyledButton';
import GhostLink from 'components/GhostLink';
import Column from 'components/Column';
import H1 from 'components/H1';
import H2 from 'components/H2';

import messages from './messages';
import { InterventionNotAvailableReason } from './types';
import interventionNotAvailableReasonsMessages from './interventionNotAvailableReasonsMessages';
import { isValidInterventionNotAvailableReason } from './utils';

export type Props = {
  reason?: Nullable<string>;
};

export const InterventionNotAvailableInfo = ({ reason }: Props) => {
  const { formatMessage } = useIntl();

  const isValidReason = isValidInterventionNotAvailableReason(reason);

  const pageTitle = useMemo(() => {
    switch (reason) {
      case InterventionNotAvailableReason.SESSION_CLOSED: {
        return formatMessage(messages.moduleNotAvailableTitle);
      }
      default: {
        return formatMessage(messages.studyNotAvailableTitle);
      }
    }
  }, [reason]);

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <Column height="100%" justify="center" align="center">
        <H1>{pageTitle}</H1>

        <H2 mt={10} fontWeight="regular">
          {isValidReason &&
            formatMessage(
              interventionNotAvailableReasonsMessages[
                reason as InterventionNotAvailableReason
              ],
            )}
        </H2>

        <GhostLink to={RoutePath.DASHBOARD}>
          <StyledButton mt={50} px={30}>
            <FormattedMessage {...messages.toMainPage} />
          </StyledButton>
        </GhostLink>
      </Column>
    </>
  );
};
