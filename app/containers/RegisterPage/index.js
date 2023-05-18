/**
 *
 * RegisterPage
 *
 */

import React, { memo, useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage, injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import dayjs from 'dayjs';
import set from 'lodash/set';
import lowerCase from 'lodash/lowerCase';
import queryString from 'query-string';
import { Markup } from 'interweave';
import { useInjectSaga, useInjectReducer } from 'redux-injectors';

import { themeColors } from 'theme';
import { Roles } from 'models/User/RolesManager';
import { passwordRegex } from 'global/constants/regex';

import withPublicLayout from 'containers/PublicLayout';
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
import FormikCheckbox from 'components/FormikCheckbox';
import Box from 'components/Box';
import FormikForm from 'components/FormikForm';

import { isNil } from 'lodash';
import makeSelectRegisterPage from './selectors';
import reducer from './reducer';
import allRegistrationsSaga from './sagas';
import messages from './messages';
import {
  registerParticipantRequest,
  registerFromInvitationRequest,
} from './actions';
import { TermsAndConditions } from './styled';

const passwordLength = 8;

const validationSchema = (formatMessage) =>
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
        (value) => value && !!value.match(passwordRegex),
      ),
    passwordConfirmation: Yup.string().oneOf(
      [Yup.ref('password'), null],
      formatMessage(messages.passwordMatch),
    ),
    lastName: Yup.string().required(formatMessage(messages.lastNameRequired)),
    firstName: Yup.string().required(formatMessage(messages.firstNameRequired)),
    terms: Yup.bool().oneOf([true], formatMessage(messages.termsRequired)),
  });

const initialValues = (email) => ({
  email: email || '',
  password: '',
  passwordConfirmation: '',
  firstName: '',
  lastName: '',
  terms: false,
});

export function RegisterPage({
  registerParticipant,
  registerFromInvitation,
  intl: { formatMessage },
  registerPage: { loading, error, success },
  location,
}) {
  const [showTermsModal, setShowTermsModal] = useState(false);
  useInjectReducer({ key: 'registerPage', reducer });
  useInjectSaga({ key: 'allRegistrationsSaga', saga: allRegistrationsSaga });
  const {
    email,
    invitation_token: invitationToken,
    role,
    intervention_id: interventionId,
    session_id: sessionId,
  } = queryString.parse(location.search, { decode: false });
  const isInvite = Boolean(invitationToken) && Boolean(email);

  const history = useHistory();

  const termsAndConditionsText =
    role === Roles.Participant || !role
      ? formatMessage(messages.termsAndConditionsParticipantText)
      : formatMessage(messages.termsAndConditionsOtherRolesText);

  const onSubmit = (values, { setSubmitting }) => {
    const currentTimeZone = dayjs.tz.guess();
    set(values, 'timeZone', currentTimeZone);

    if (isInvite) {
      set(values, 'invitationToken', invitationToken);
      registerFromInvitation(values);
    } else registerParticipant(values);
    setSubmitting(false);
  };

  const shouldRedirectToIntervention = useMemo(
    () => !isNil(interventionId) && isNil(sessionId) && isNil(error),
    [interventionId, sessionId, error],
  );

  const shouldRedirectToSession = useMemo(
    () => !isNil(interventionId) && !isNil(sessionId) && isNil(error),
    [interventionId, sessionId, error],
  );

  useEffect(() => {
    const shouldRedirect = success && isInvite && !loading;

    if (shouldRedirect) {
      if (shouldRedirectToIntervention) {
        history.replace(`/interventions/${interventionId}/invite`);
        return;
      }

      if (shouldRedirectToSession) {
        history.replace(
          `/interventions/${interventionId}/sessions/${sessionId}/fill`,
        );
        return;
      }

      history.replace('/');
    }
  }, [success, loading, isInvite, interventionId, sessionId, error]);

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
          <Markup content={termsAndConditionsText} noWrap />
        </TermsAndConditions>
      </Modal>
      <Fill justify="center" align="center">
        <Column sm={10} md={8} lg={6} align="start">
          <Box mb={40}>
            <H1 mb={8} fontSize={23}>
              <FormattedMessage
                {...messages[isInvite ? 'headerInvite' : 'header']}
                values={{ role: lowerCase(role) }}
              />
            </H1>
            <Text fontSize="12px" lineHeight="12px">
              <FormattedMessage {...messages.subHeader} />
            </Text>
          </Box>
          <Formik
            validationSchema={validationSchema(formatMessage)}
            initialValues={initialValues(email)}
            onSubmit={onSubmit}
          >
            {(formikProps) => {
              const { handleSubmit } = formikProps;
              const sharedProps = {
                inputProps: {
                  height: 46,
                  width: '100%',
                },
                mb: 20,
                required: true,
              };
              return (
                <FormikForm>
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
                    required
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
                  <Row my={20}>
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
                  </Row>
                  <Button
                    type="submit"
                    height={46}
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
                </FormikForm>
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
  registerFromInvitation: PropTypes.func,
  intl: PropTypes.object,
  registerPage: PropTypes.object,
  location: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  registerPage: makeSelectRegisterPage(),
});

const mapDispatchToProps = {
  registerParticipant: registerParticipantRequest,
  registerFromInvitation: registerFromInvitationRequest,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo,
  injectIntl,
  withPublicLayout,
)(RegisterPage);
