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
import { useHistory, useLocation } from 'react-router-dom';

import { themeColors } from 'theme';

import { makeSelectUser } from 'global/reducers/auth';

import Text from 'components/Text';
import { StyledButton } from 'components/Button/StyledButton';
import StyledLink from 'components/StyledLink';

import messages from './messages';

const NotFoundPage = ({ intl: { formatMessage }, user }) => {
  const location = useLocation();
  const history = useHistory();

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
                  <StyledLink to="/">
                    <StyledButton mt={50} width={180}>
                      <FormattedMessage {...messages.toMainPage} />
                    </StyledButton>
                  </StyledLink>
                </Col>
              </>
            )}

            {!user && (
              <Col width="content">
                <StyledLink to={`/login${location.search ?? ''}`}>
                  <StyledButton mt={50} width={180}>
                    <FormattedMessage {...messages.toLogin} />
                  </StyledButton>
                </StyledLink>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

NotFoundPage.propTypes = {
  intl: PropTypes.shape(IntlShape),
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

const withConnect = connect(mapStateToProps);

export default compose(injectIntl, withConnect)(NotFoundPage);
