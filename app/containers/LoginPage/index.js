/**
 *
 * LoginPage
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Formik } from 'formik';

import FormikInput from 'components/FormikInput';
import { Fill } from 'components/Fill';
import Column from 'components/Column';

import H1 from 'components/H1';
import Row from 'components/Row';
import { Button } from 'components/Button';
import TextButton from 'components/Button/TextButton';
import withPublicLayout from 'containers/PublicLayout';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import ErrorAlert from 'components/ErrorAlert';
import { Link } from 'react-router-dom';

import makeSelectLoginPage from './selectors';
import { loginRequest } from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { Divider, Or } from './styled';

const validationSchema = formatMessage =>
  Yup.object().shape({
    email: Yup.string()
      .required(formatMessage(messages.emailRequired))
      .email(formatMessage(messages.validEmail)),
    password: Yup.string().required(formatMessage(messages.passwordRequired)),
  });

const initialValues = formData => ({
  email: formData.email || '',
  password: formData.password || '',
});

export function LoginPage(props) {
  const {
    onLogin,
    loginPage: { error, loading, formData },
    intl: { formatMessage },
  } = props;
  useInjectReducer({ key: 'loginPage', reducer });
  useInjectSaga({ key: 'loginPage', saga });

  const onSubmit = ({ email, password }, actions) => {
    onLogin(email, password);
    actions.setSubmitting(false);
  };

  const loginOnEnter = (email, password) => event => {
    if (!email || !password) return;
    if (event.keyCode === 13) {
      onLogin(email, password);
    }
  };

  return (
    <Fragment>
      <Helmet>
        <title>{formatMessage(messages.pageTitle)}</title>
      </Helmet>
      <Fill justify="center" align="center">
        <Column sm={10} md={8} lg={6} align="start">
          <H1 mb={40} fontSize={23}>
            {formatMessage(messages.header)}
          </H1>
          <Formik
            validationSchema={validationSchema(formatMessage)}
            initialValues={initialValues(formData)}
            onSubmit={onSubmit}
          >
            {({ handleSubmit, values }) => {
              const sharedProps = {
                inputProps: {
                  height: 46,
                  width: '100%',
                  onKeyDown: loginOnEnter(values.email, values.password),
                },
                mb: 20,
              };
              return (
                <Fragment>
                  <FormikInput
                    formikKey="email"
                    placeholder={formatMessage(messages.emailPlaceholder)}
                    type="text"
                    label={formatMessage(messages.emailLabel)}
                    {...sharedProps}
                  />
                  <FormikInput
                    formikKey="password"
                    placeholder={formatMessage(messages.passwordPlaceholder)}
                    type="password"
                    label={formatMessage(messages.passwordLabel)}
                    {...sharedProps}
                  />
                  <Button
                    height={46}
                    borderRadius={5}
                    mt={25}
                    loading={loading}
                    title={formatMessage(messages.loginButton)}
                    onClick={handleSubmit}
                    type="submit"
                  />
                  <Row width="100%">
                    <Divider mr={15} />
                    <Or fontWeight="bold" mb={-5}>
                      <FormattedMessage {...messages.or} />
                    </Or>
                    <Divider ml={15} />
                  </Row>
                  <Row width="100%" justify="center" mt={30}>
                    <Link to="/register">
                      <TextButton>
                        <FormattedMessage {...messages.register} />
                      </TextButton>
                    </Link>
                  </Row>
                </Fragment>
              );
            }}
          </Formik>
          {error && <ErrorAlert errorText={error} />}
        </Column>
      </Fill>
    </Fragment>
  );
}

LoginPage.propTypes = {
  onLogin: PropTypes.func,
  intl: PropTypes.object,
  loginPage: PropTypes.shape({
    errors: PropTypes.string,
    loading: PropTypes.bool,
    formData: PropTypes.shape({
      email: PropTypes.string,
      password: PropTypes.string,
    }),
  }),
};

const mapStateToProps = createStructuredSelector({
  loginPage: makeSelectLoginPage(),
});

const mapDispatchToProps = {
  onLogin: loginRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default injectIntl(
  compose(
    withConnect,
    withPublicLayout,
  )(LoginPage),
);
