/**
 *
 * RegisterPage
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage, injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import set from 'lodash/set';
import lowerCase from 'lodash/lowerCase';
import queryString from 'query-string';
import { Markup } from 'interweave';

import { useInjectSaga, useInjectReducer } from 'redux-injectors';

import { Fill } from 'components/Fill';
import Button from 'components/Button';
import StyledTextButton from 'components/Button/StyledTextButton';
import Column from 'components/Column';
import H1 from 'components/H1';
import Row from 'components/Row';
import Text from 'components/Text';
import Modal from 'components/Modal';
import FormikInput from 'components/FormikInput';
import ErrorAlert from 'components/ErrorAlert';
import withPublicLayout from 'containers/PublicLayout';

import { themeColors } from 'theme';
import { passwordRegex } from 'global/constants/regex';
import FormikCheckbox from 'components/FormikCheckbox';
import makeSelectRegisterPage from './selectors';
import reducer from './reducer';
import allRegistrationsSaga from './sagas';
import messages from './messages';
import {
  registerParticipantRequest,
  registerResearcherRequest,
} from './actions';
import { TermsAndConditions } from './styled';

dayjs.extend(utc);
dayjs.extend(timezone);

const passwordLength = 8;

const validationSchema = formatMessage =>
  Yup.object().shape({
    email: Yup.string()
      .required(formatMessage(messages.emailRequired))
      .email(formatMessage(messages.validEmail)),
    password: Yup.string()
      .required(formatMessage(messages.passwordRequired))
      .min(
        passwordLength,
        formatMessage(messages.passwordLength, { length: 8 }),
      )
      .test(
        'password',
        formatMessage(messages.passwordInvalid),
        value => value && !!value.match(passwordRegex),
      ),
    passwordConfirmation: Yup.string().oneOf(
      [Yup.ref('password'), null],
      formatMessage(messages.passwordMatch),
    ),
    lastName: Yup.string().required(formatMessage(messages.lastNameRequired)),
    firstName: Yup.string().required(formatMessage(messages.firstNameRequired)),
    terms: Yup.bool().oneOf([true], formatMessage(messages.termsRequired)),
  });

const initialValues = email => ({
  email: email || '',
  password: '',
  passwordConfirmation: '',
  firstName: '',
  lastName: '',
  terms: false,
});

export function RegisterPage({
  registerParticipant,
  registerResearcher,
  intl: { formatMessage },
  registerPage: { loading, error },
  location,
}) {
  const [showTermsModal, setShowTermsModal] = useState(false);
  useInjectReducer({ key: 'registerPage', reducer });
  useInjectSaga({ key: 'allRegistrationsSaga', saga: allRegistrationsSaga });
  const { email, invitation_token: invitationToken, role } = queryString.parse(
    location.search,
    { decode: false },
  );
  const isInvite = Boolean(invitationToken) && Boolean(email);

  const onSubmit = (values, { setSubmitting }) => {
    const currentTimeZone = dayjs.tz.guess();
    set(values, 'timeZone', currentTimeZone);

    if (isInvite) {
      set(values, 'invitationToken', invitationToken);
      registerResearcher(values);
    } else registerParticipant(values);
    setSubmitting(false);
  };

  return (
    <>
      <Helmet>
        <title>{formatMessage(messages.pageTitle)}</title>
      </Helmet>
      <Modal
        visible={showTermsModal}
        title={formatMessage(messages.termsAndConditions)}
        onClose={() => setShowTermsModal(false)}
        maxWidth="80%"
      >
        <TermsAndConditions>
          <Markup
            content={formatMessage(messages.termsAndConditionsText)}
            noWrap
          />
        </TermsAndConditions>
      </Modal>
      <Fill justify="center" align="center">
        <Column sm={10} md={8} lg={6} align="start">
          <H1 mb={40} fontSize={23}>
            <FormattedMessage
              {...messages[isInvite ? 'headerInvite' : 'header']}
              values={{ role: lowerCase(role) }}
            />
          </H1>
          <Formik
            validationSchema={validationSchema(formatMessage)}
            initialValues={initialValues(email)}
            onSubmit={onSubmit}
          >
            {formikProps => {
              const { handleSubmit } = formikProps;
              const sharedProps = {
                inputProps: {
                  height: 46,
                  width: '100%',
                },
                mb: 20,
              };
              return (
                <>
                  <Row width="100%">
                    <FormikInput
                      formikKey="firstName"
                      placeholder={formatMessage(messages.firstName)}
                      label={formatMessage(messages.firstNameLabel)}
                      type="text"
                      mr={20}
                      {...sharedProps}
                    />
                    <FormikInput
                      formikKey="lastName"
                      placeholder={formatMessage(messages.lastName)}
                      label={formatMessage(messages.lastNameLabel)}
                      type="text"
                      {...sharedProps}
                    />
                  </Row>
                  <FormikInput
                    formikKey="email"
                    placeholder={formatMessage(messages.email)}
                    label={formatMessage(messages.emailLabel)}
                    type="email"
                    inputProps={{
                      ...sharedProps.inputProps,
                      disabled: isInvite,
                    }}
                    mb={20}
                  />
                  <FormikInput
                    formikKey="password"
                    placeholder={formatMessage(messages.password)}
                    label={formatMessage(messages.passwordLabel)}
                    type="password"
                    {...sharedProps}
                  />
                  <FormikInput
                    formikKey="passwordConfirmation"
                    placeholder={formatMessage(messages.confirmPassword)}
                    label={formatMessage(messages.confirmPasswordLabel)}
                    type="password"
                    {...sharedProps}
                  />
                  <FormikCheckbox formikKey="terms">
                    {formatMessage(messages.accept)}
                    <Text
                      clickable
                      ml={3}
                      lineHeight="1.5em"
                      fontWeight="bold"
                      color={themeColors.secondary}
                      onClick={() => {
                        setShowTermsModal(true);
                      }}
                    >
                      {formatMessage(messages.termsAndConditions)}
                    </Text>
                  </FormikCheckbox>
                  <Button
                    type="submit"
                    height={46}
                    borderRadius={5}
                    my={25}
                    loading={loading}
                    onClick={handleSubmit}
                    title={formatMessage(messages.register)}
                  />
                  {!isInvite && (
                    <Row justify="center" width="100%">
                      <Link to="/login">
                        <StyledTextButton color={themeColors.secondary}>
                          <FormattedMessage {...messages.login} />
                        </StyledTextButton>
                      </Link>
                    </Row>
                  )}
                </>
              );
            }}
          </Formik>
          {error && <ErrorAlert errorText={error} mt={20} />}
        </Column>
      </Fill>
    </>
  );
}

RegisterPage.propTypes = {
  registerParticipant: PropTypes.func,
  registerResearcher: PropTypes.func,
  intl: PropTypes.object,
  registerPage: PropTypes.object,
  location: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  registerPage: makeSelectRegisterPage(),
});

const mapDispatchToProps = {
  registerParticipant: registerParticipantRequest,
  registerResearcher: registerResearcherRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
  injectIntl,
  withPublicLayout,
)(RegisterPage);
