/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { Button } from 'components/Button';
import messages from './messages';
import { HomePageContainer } from './styled';

export function HomePage({ intl }) {
  return (
    <HomePageContainer>
      <Link to="/interventions/create">
        <Button title={intl.formatMessage(messages.createIntervation)} />
      </Link>
    </HomePageContainer>
  );
}

HomePage.propTypes = {
  intl: PropTypes.object,
};

export default injectIntl(HomePage);
