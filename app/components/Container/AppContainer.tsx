import React, { PropsWithChildren } from 'react';
import { Helmet } from 'react-helmet';

import { useWindowSize } from 'utils/useWindowSize';
import { formatMessage } from 'utils/intlOutsideReact';

import { calculateWidth } from './containerBreakpoints';
import StyledContainer from './styled';
import messages from './messages';

export type Props = PropsWithChildren<{
  pageTitle?: string;
  disablePageTitle?: boolean;
  [x: string]: any;
}>;

const AppContainer = ({
  pageTitle = formatMessage(messages.defaultPageTitle),
  disablePageTitle,
  children,
  ...props
}: Props) => {
  const { width } = useWindowSize();

  const maxWidth = calculateWidth(width);

  return (
    <StyledContainer $maxWidth={maxWidth} {...props}>
      {!disablePageTitle && (
        <Helmet>
          <title>{pageTitle}</title>
        </Helmet>
      )}
      {children}
    </StyledContainer>
  );
};

export default AppContainer;
