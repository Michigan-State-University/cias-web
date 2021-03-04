/**
 * ForbiddenPage
 *
 * This is the page we show when the user tries to load resources and does not have sufficient permissions
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { useHistory, useLocation } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Container, Row, Col } from 'react-grid-system';

import Text from 'components/Text';
import { StyledButton } from 'components/Button/StyledButton';
import { themeColors } from 'theme';

import { makeSelectUser } from 'global/reducers/auth';
import messages from './messages';

const ForbiddenPage = ({ intl: { formatMessage }, user }) => {
  const history = useHistory();
  const location = useLocation();

  const header = get(
    location,
    'state.header',
    formatMessage(messages.defaultHeader),
  );
  const text = get(
    location,
    'state.text',
    formatMessage(user ? messages.textLoggedIn : messages.textNotLoggedIn),
  );
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

ForbiddenPage.propTypes = {
  location: PropTypes.object,
  intl: intlShape,
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
)(ForbiddenPage);
