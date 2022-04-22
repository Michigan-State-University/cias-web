import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Markup } from 'interweave';

import { Formik } from 'formik';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useInjectSaga } from 'redux-injectors';
import { createStructuredSelector } from 'reselect';

import { themeColors } from 'theme';

import {
  confirmPhoneNumberRequest,
  confirmPhoneNumberSaga,
  makeSelectLoaders,
  sendSmsTokenRequest,
  sendSmsTokenSaga,
} from 'global/reducers/auth';

import Modal from 'components/Modal';
import Column from 'components/Column';
import Row from 'components/Row';
import FormikCodeInput from 'components/FormikCodeInput';
import Button from 'components/Button';
import Text from 'components/Text';
import StyledTextButton from 'components/Button/StyledTextButton';
import Loader from 'components/Loader';

import messages from './messages';
import {
  CODE_INPUT_LENGTH,
  confirmationCodeValidationSchema,
} from './constants';

const PhoneNumberCodeModal = ({
  intl: { formatMessage },
  modalVisible,
  closeModal,
  confirmPhoneNumber,
  phone,
  sendSmsToken,
  loaders: { smsTokenLoading, confirmPhoneNumberLoading },
}) => {
  useInjectSaga({ key: 'confirmPhoneNumber', saga: confirmPhoneNumberSaga });
  useInjectSaga({ key: 'sendSmsToken', saga: sendSmsTokenSaga });

  useEffect(() => {
    if (modalVisible) sendSmsToken();
  }, [modalVisible]);

  const handleSubmit = ({ code }) => confirmPhoneNumber(code, closeModal);

  return (
    <Modal
      visible={modalVisible}
      title={formatMessage(messages.confirmCode)}
      onClose={closeModal}
      maxWidth={500}
    >
      <Column>
        <Text mb={10}>
          <Markup
            content={formatMessage(messages.codeInfo, { phone })}
            noWrap
          />
        </Text>
        <Row>
          <Formik
            validationSchema={confirmationCodeValidationSchema(formatMessage)}
            initialValues={{ code: '' }}
            onSubmit={handleSubmit}
          >
            {({
              handleSubmit: handleSubmitCode,
              isValid,
              values: { code },
            }) => {
              const canSubmit = code && isValid;

              return (
                <Column>
                  <Row>
                    <FormikCodeInput
                      formikKey="code"
                      label={formatMessage(messages.code)}
                      type="text"
                      codeLength={CODE_INPUT_LENGTH}
                    />
                  </Row>
                  {smsTokenLoading ? (
                    <Loader type="inline" />
                  ) : (
                    <StyledTextButton
                      mt={20}
                      onClick={sendSmsToken}
                      whiteSpace="nowrap"
                      fontWeight="bold"
                      fontSize={14}
                      color={themeColors.secondary}
                    >
                      <FormattedMessage {...messages.resendCode} />
                    </StyledTextButton>
                  )}
                  <Row width="100%" mt={30} justify="between">
                    <Button
                      width="49%"
                      inverted
                      hoverable
                      onClick={closeModal}
                      type="button"
                    >
                      <FormattedMessage {...messages.cancel} />
                    </Button>
                    <Button
                      width="49%"
                      hoverable
                      onClick={handleSubmitCode}
                      type="submit"
                      disabled={!canSubmit}
                      loading={smsTokenLoading && confirmPhoneNumberLoading}
                    >
                      <FormattedMessage {...messages.confirmCodeButton} />
                    </Button>
                  </Row>
                </Column>
              );
            }}
          </Formik>
        </Row>
      </Column>
    </Modal>
  );
};

PhoneNumberCodeModal.propTypes = {
  intl: PropTypes.object,
  phone: PropTypes.string,
  modalVisible: PropTypes.bool,
  closeModal: PropTypes.func,
  confirmPhoneNumber: PropTypes.func,
  sendSmsToken: PropTypes.func,
  loaders: PropTypes.shape({
    smsTokenLoading: PropTypes.bool,
    confirmPhoneNumberLoading: PropTypes.bool,
  }),
};

const mapStateToProps = createStructuredSelector({
  loaders: makeSelectLoaders(),
});

const mapDispatchToProps = {
  confirmPhoneNumber: confirmPhoneNumberRequest,
  sendSmsToken: sendSmsTokenRequest,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(injectIntl, withConnect)(PhoneNumberCodeModal);
