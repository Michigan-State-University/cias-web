import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { useIntl } from 'react-intl';

import FormikInput from 'components/FormikInput';
import LinkButton from 'components/Button/LinkButton';
import Button from 'components/Button';
import Divider from 'components/Divider';
import Row from 'components/Row';
import ErrorAlert from 'components/ErrorAlert';

import {
  generateInitialValues,
  generateLoginFormValidationSchema,
} from '../utils';
import messages from '../messages';
import { Or, StyledForm } from '../styled';

const LoginForm = ({
  formData: initialFormData,
  onLogin,
  isLoading,
  error,
}) => {
  const { formatMessage } = useIntl();

  const validationSchema = useMemo(
    () => generateLoginFormValidationSchema(formatMessage),
    [],
  );

  const formData = useMemo(() => generateInitialValues(initialFormData), []);

  const onSubmit = ({ email, password }, actions) => {
    onLogin(email.trim(), password);
    actions.setSubmitting(false);
  };

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={formData}
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
          <StyledForm>
            <FormikInput
              formikKey="email"
              placeholder={formatMessage(messages.emailPlaceholder)}
              type="text"
              label={formatMessage(messages.emailLabel)}
              {...sharedProps}
            />
            <LinkButton
              tabIndex={-1}
              to="/reset-password"
              alignSelf="end"
              mb={-14}
              zIndex={1}
            >
              {formatMessage(messages.forgotPassword)}
            </LinkButton>
            <FormikInput
              formikKey="password"
              placeholder={formatMessage(messages.passwordPlaceholder)}
              type="password"
              label={formatMessage(messages.passwordLabel)}
              {...sharedProps}
            />
            <Button
              height={46}
              mt={25}
              loading={isLoading}
              title={formatMessage(messages.loginButton)}
              onClick={handleSubmit}
              type="submit"
            />
            <Row width="100%">
              <Divider mr={15} mt={40} />
              <Or fontWeight="bold" mb={-5}>
                {formatMessage(messages.or)}
              </Or>
              <Divider ml={15} mt={40} />
            </Row>
            <Row width="100%" justify="center" mt={30}>
              <LinkButton to="/register">
                {formatMessage(messages.register)}
              </LinkButton>
            </Row>
            {error && <ErrorAlert errorText={error} mt={20} />}
          </StyledForm>
        );
      }}
    </Formik>
  );
};

LoginForm.propTypes = {
  formData: PropTypes.shape({
    email: PropTypes.string,
    password: PropTypes.string,
  }),
  isLoading: PropTypes.bool,
  onLogin: PropTypes.func,
  error: PropTypes.string,
};

export default LoginForm;
