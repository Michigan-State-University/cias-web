/**
 *
 * SetNewPasswordPage
 *
 */

import React, { Fragment } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { Fill } from 'components/Fill';
import Column from 'components/Column';
import H1 from 'components/H1';
import withPublicLayout from 'containers/PublicLayout';
import FormikInput from 'components/FormikInput';
import Button from 'components/Button';

import messages from './messages';

const passwordLength = 8;

const validationSchema = formatMessage =>
  Yup.object().shape({
    password: Yup.string()
      .required(formatMessage(messages.passwordRequired))
      .min(
        passwordLength,
        formatMessage(messages.passwordLength, { length: 8 }),
      )
      .test(
        'password',
        formatMessage(messages.passwordInvalid),
        value =>
          value &&
          !!value.match(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/gm,
          ),
      ),
    passwordConfirmation: Yup.string().oneOf(
      [Yup.ref('password'), null],
      formatMessage(messages.passwordMatch),
    ),
  });

const initialValues = {
  password: '',
  passwordConfirmation: '',
};

const SetNewPasswordPage = ({ intl: { formatMessage } }) => {
  const onSubmit = () => {};
  return (
    <Fragment>
      <Helmet>
        <title>{formatMessage(messages.pageTitle)}</title>
      </Helmet>
      <Fill justify="center" align="center">
        <Column sm={10} md={8} lg={6} align="start">
          <H1 mb={40} fontSize={23}>
            <FormattedMessage {...messages.header} />
          </H1>
          <Formik
            validationSchema={validationSchema(formatMessage)}
            initialValues={initialValues}
            onSubmit={onSubmit}
          >
            {({ handleSubmit }) => {
              const sharedProps = {
                inputProps: {
                  height: 46,
                  width: '100%',
                },
                mb: 20,
              };
              return (
                <Fragment>
                  <FormikInput
                    formikKey="password"
                    placeholder={formatMessage(messages.password)}
                    type="password"
                    label={formatMessage(messages.passwordLabel)}
                    {...sharedProps}
                  />
                  <FormikInput
                    formikKey="passwordConfirmation"
                    placeholder={formatMessage(messages.confirmPassword)}
                    type="password"
                    label={formatMessage(messages.confirmPasswordLabel)}
                    {...sharedProps}
                  />
                  <Button
                    height={46}
                    borderRadius={5}
                    mt={25}
                    loading={false}
                    onClick={handleSubmit}
                    type="submit"
                  >
                    <FormattedMessage {...messages.resetPassword} />
                  </Button>
                </Fragment>
              );
            }}
          </Formik>
        </Column>
      </Fill>
    </Fragment>
  );
};

SetNewPasswordPage.propTypes = {
  intl: intlShape,
};

const mapDispatchToProps = {};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  injectIntl,
  withPublicLayout,
)(SetNewPasswordPage);
