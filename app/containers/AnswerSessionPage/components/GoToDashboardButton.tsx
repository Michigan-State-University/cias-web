import React, { FC, memo } from 'react';
import { useIntl } from 'react-intl';

import { RoutePath } from 'global/constants';

import { parametrizeRoutePath } from 'utils/router';

import Button from 'components/Button';

import messages from '../messages';
import { StyledGhostLink } from '../styled';

export type Props = {
  userInterventionId: string;
  isDesktop: boolean;
};

const GoToDashboardButtonComponent: FC<Props> = ({
  userInterventionId,
  isDesktop,
}) => {
  const { formatMessage } = useIntl();

  const path = parametrizeRoutePath(RoutePath.USER_INTERVENTION, {
    userInterventionId,
  });

  return (
    <StyledGhostLink to={path} isDesktop={isDesktop}>
      <Button mt={24} title={formatMessage(messages.goToDashboard)} light />
    </StyledGhostLink>
  );
};

export const GoToDashboardButton = memo(GoToDashboardButtonComponent);
