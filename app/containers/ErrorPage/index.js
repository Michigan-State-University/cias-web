/**
 * ErrorPage
 *
 * This is the page we show when there is unhandled exception in the app
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import { Container, Row, Col } from 'react-grid-system';

import { themeColors } from 'theme';
import appStages from 'global/appStages';

import Text from 'components/Text';
import { Button } from 'components/Button';

import messages from './messages';

const ErrorPage = ({ intl: { formatMessage }, error, resetError }) => {
  const [isReloading, setIsReloading] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const resetLoading = () => {
    if (isReloading) setIsReloading(false);
    if (isNavigating) setIsNavigating(false);
  };

  useEffect(() => {
    resetLoading();
  }, []);

  const history = useHistory();

  const handleRefreshPage = () => {
    setIsReloading(true);
    window.location.reload();
  };

  const handleGoToMainPage = () => {
    setIsNavigating(true);
    history.push('/');
    resetError();
  };

  return (
    <Container style={{ height: '100%' }}>
      <Helmet>
        <title>{formatMessage(messages.helmetTitle)}</title>
      </Helmet>
      <Row style={{ height: '100%' }} align="center">
        <Col>
          <Row justify="center">
            <Col>
              <Text
                fontWeight="bold"
                fontSize="10vh"
                color={themeColors.primary}
                textAlign="center"
              >
                {formatMessage(messages.errorCode)}
              </Text>
            </Col>
          </Row>

          <Row justify="center">
            <Col>
              <Text fontSize={24} fontWeight="bold" mt={50} textAlign="center">
                {formatMessage(messages.header)}
              </Text>
            </Col>
          </Row>

          {process.env.APP_STAGE === appStages.dev.id && error && (
            <>
              <Row style={{ marginBottom: 30 }}>
                <Col align="center">
                  <Text mt={10} fontSize={18} textAlign="center">
                    {error.toString()}
                  </Text>
                </Col>
              </Row>
            </>
          )}

          <Row justify="around">
            <Col width="content">
              <Button
                mt={50}
                onClick={handleGoToMainPage}
                width={180}
                loading={isNavigating}
              >
                {formatMessage(messages.toMainPage)}
              </Button>
            </Col>

            <Col width="content">
              <Button
                mt={50}
                onClick={handleRefreshPage}
                width={180}
                loading={isReloading}
              >
                {formatMessage(messages.refresh)}
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

ErrorPage.propTypes = {
  intl: intlShape,
  error: PropTypes.object,
  resetError: PropTypes.func,
};

export default compose(injectIntl)(ErrorPage);
