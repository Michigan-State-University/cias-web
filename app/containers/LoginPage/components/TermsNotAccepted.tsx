import React, { useMemo } from 'react';
import { Formik } from 'formik';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';

import { RoutePath } from 'global/constants';
import { termsAcceptRequest } from 'global/reducers/auth';
import { withTermsAcceptSaga } from 'global/reducers/auth/sagas/acceptTerms';

import FormikInput from 'components/FormikInput';
import LinkButton from 'components/Button/LinkButton';
import Button from 'components/Button';
import Row from 'components/Row';
import TermsCheckbox from 'components/TermsCheckbox';
import ErrorAlert from 'components/ErrorAlert';
import FormikForm from 'components/FormikForm';
import Text from 'components/Text';

import { useInjectSaga } from 'redux-injectors';
import { generateTermsValidationSchema } from '../utils';
import messages from '../messages';

type Props = {
  goBack: () => void;
  error: string;
  loading: boolean;
  termsExtraFields: {
    email: string;
    firstName: Nullable<string>;
    lastName: Nullable<string>;
  };
};

const TermsNotAccepted = ({
  error,
  goBack,
  termsExtraFields,
  loading,
}: Props) => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();

  useInjectSaga(withTermsAcceptSaga);
  const validationSchema = useMemo(
    () => generateTermsValidationSchema(formatMessage),
    [],
  );

  const onSubmit = (values: any) => {
    dispatch(termsAcceptRequest(values, goBack));
  };

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={termsExtraFields}
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
          <FormikForm>
            <Text fontSize="12px" lineHeight="12px" mt={8}>
              <FormattedMessage {...messages.subHeader} />
            </Text>
            <Row width="100%" gap={20} mt={40}>
              <FormikInput
                formikKey="firstName"
                placeholder={formatMessage(messages.firstNameLabel)}
                label={formatMessage(messages.firstNameLabel)}
                type="text"
                disabled={!!termsExtraFields?.firstName}
                {...sharedProps}
              />
              <FormikInput
                formikKey="lastName"
                placeholder={formatMessage(messages.lastNameLabel)}
                label={formatMessage(messages.lastNameLabel)}
                type="text"
                disabled={!!termsExtraFields?.lastName}
                {...sharedProps}
              />
            </Row>
            <FormikInput
              formikKey="email"
              type="text"
              label={formatMessage(messages.emailLabel)}
              disabled
              {...sharedProps}
            />
            <TermsCheckbox formikKey="terms" />
            <Button
              height={46}
              mt={25}
              loading={loading}
              title={formatMessage(messages.continue)}
              onClick={handleSubmit}
              type="submit"
            />
            <Row width="100%" justify="center" mt={30}>
              <LinkButton to={RoutePath.LOGIN} onClick={goBack}>
                {formatMessage(messages.goBackToLoginPage)}
              </LinkButton>
            </Row>
            {error && <ErrorAlert errorText={error} mt={20} />}
          </FormikForm>
        );
      }}
    </Formik>
  );
};
export default TermsNotAccepted;
