import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import { useWindowSize } from 'utils/useWindowSize';
import { formatMessage } from 'utils/intlOutsideReact';

import { calculateWidth } from './containerBreakpoints';
import StyledContainer from './styled';
import messages from './messages';

const AppContainer = ({ pageTitle, disablePageTitle, children, ...props }) => {
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

AppContainer.propTypes = {
  intl: PropTypes.object,
  pageTitle: PropTypes.string,
  disablePageTitle: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

AppContainer.defaultProps = {
  pageTitle: formatMessage(messages.defaultPageTitle),
};

export default AppContainer;
