/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Col, Container, Row } from 'react-grid-system';

import { makeSelectUser } from 'global/reducers/auth';

import Text from 'components/Text';
import { StyledButton } from 'components/Button/StyledButton';
import { themeColors } from 'theme';

import messages from './messages';

const NotFoundPage = ({ location, intl: { formatMessage }, history, user }) => {
  const header = get(
    location,
    'state.header',
    formatMessage(messages.defaultHeader),
  );
  const text = get(location, 'state.text', formatMessage(messages.defaultText));
  const errorCode = get(
    location,
    'state.errorCode',
    formatMessage(messages.defaultErrorCode),
  );

  const handleBack = () => history.goBack();

  const handleGoToMainPage = () => history.push('/');

  const handleGoToLogin = () => history.push(`/login${location.search ?? ''}`);

  return (
    <Container style={{ height: '100%' }}>
      <Row style={{ height: '100%' }} align="center">
        <Col>
          <Row justify="center">
            <Col>
              <Text
                fontWeight="bold"
                fontSize="10vw"
                color={themeColors.primary}
                textAlign="center"
              >
                {errorCode}
              </Text>
            </Col>
          </Row>

          <Row justify="center">
            <Col>
              <Text fontSize={24} fontWeight="bold" mt={50} textAlign="center">
                {header}
              </Text>
            </Col>
          </Row>

          <Row style={{ marginBottom: 30 }}>
            <Col>
              <Text mt={10} fontSize={18} textAlign="center">
                {text}
              </Text>
            </Col>
          </Row>

          <Row justify="around">
            {user && (
              <>
                <Col width="content">
                  <StyledButton mt={50} onClick={handleBack} width={180}>
                    <FormattedMessage {...messages.back} />
                  </StyledButton>
                </Col>

                <Col width="content">
                  <StyledButton
                    mt={50}
                    onClick={handleGoToMainPage}
                    width={180}
                  >
                    <FormattedMessage {...messages.toMainPage} />
                  </StyledButton>
                </Col>
              </>
            )}

            {!user && (
              <Col width="content">
                <StyledButton mt={50} onClick={handleGoToLogin} width={180}>
                  <FormattedMessage {...messages.toLogin} />
                </StyledButton>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

NotFoundPage.propTypes = {
  location: PropTypes.object,
  intl: PropTypes.shape(IntlShape),
  history: PropTypes.object,
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

const withConnect = connect(mapStateToProps);

export default compose(
  injectIntl,
  withConnect,
)(NotFoundPage);
