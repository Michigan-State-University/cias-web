/**
 *
 * ResetPasswordPage
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
import LinkButton from 'components/Button/LinkButton';

import messages from './messages';

const validationSchema = formatMessage =>
  Yup.object().shape({
    email: Yup.string()
      .required(formatMessage(messages.emailRequired))
      .email(formatMessage(messages.validEmail)),
  });

const initialValues = {
  email: '',
};

const ResetPasswordPage = ({ intl: { formatMessage } }) => {
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
            {({ handleSubmit }) => (
              <Fragment>
                <FormikInput
                  formikKey="email"
                  placeholder={formatMessage(messages.emailPlaceholder)}
                  type="text"
                  label={formatMessage(messages.emailLabel)}
                  inputProps={{
                    height: 46,
                    width: '100%',
                  }}
                />
                <Button
                  height={46}
                  borderRadius={5}
                  mt={45}
                  loading={false}
                  onClick={handleSubmit}
                  type="submit"
                >
                  <FormattedMessage {...messages.resetPassword} />
                </Button>
                <LinkButton to="/login" mt={25} alignSelf="center">
                  <FormattedMessage {...messages.return} />
                </LinkButton>
              </Fragment>
            )}
          </Formik>
        </Column>
      </Fill>
    </Fragment>
  );
};

ResetPasswordPage.propTypes = {
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
)(ResetPasswordPage);
