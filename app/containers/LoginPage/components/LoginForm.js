import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';

import { RoutePath } from 'global/constants';
import { clearErrors } from 'global/reducers/auth';

import FormikInput from 'components/FormikInput';
import LinkButton from 'components/Button/LinkButton';
import Button from 'components/Button';
import Divider from 'components/Divider';
import Row from 'components/Row';
import ErrorAlert from 'components/ErrorAlert';
import FormikForm from 'components/FormikForm';

import {
  generateInitialValues,
  generateLoginFormValidationSchema,
} from '../utils';
import messages from '../messages';
import { Or } from '../styled';

const LoginForm = ({
  formData: initialFormData,
  onLogin,
  isLoading,
  error,
}) => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();

  const validationSchema = useMemo(
    () => generateLoginFormValidationSchema(formatMessage),
    [],
  );

  const formData = useMemo(() => generateInitialValues(initialFormData), []);

  const onSubmit = ({ email, password }, actions) => {
    onLogin(email.trim(), password);
    actions.setSubmitting(false);
  };

  const onRedirect = () => dispatch(clearErrors());

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
          <FormikForm mt={40}>
            <FormikInput
              formikKey="email"
              placeholder={formatMessage(messages.emailPlaceholder)}
              type="text"
              label={formatMessage(messages.emailLabel)}
              {...sharedProps}
            />
            <LinkButton
              tabIndex={-1}
              to={RoutePath.RESET_PASSWORD}
              alignSelf="end"
              mb={-14}
              zIndex={1}
              onClick={onRedirect}
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
              <LinkButton to={RoutePath.REGISTER} onClick={onRedirect}>
                {formatMessage(messages.register)}
              </LinkButton>
            </Row>
            {error && <ErrorAlert errorText={error} mt={20} />}
          </FormikForm>
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
