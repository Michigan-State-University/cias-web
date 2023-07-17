import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { useIntl } from 'react-intl';
import { Markup } from 'interweave';
import { useInjectSaga } from 'redux-injectors';

import { verifyCodeSaga } from 'global/reducers/auth';

import { themeColors } from 'theme';

import { Col, Container, Row } from 'components/ReactGridSystem';
import Text from 'components/Text';
import FormikInput from 'components/FormikInput';
import Button from 'components/Button';
import ErrorAlert from 'components/ErrorAlert';
import FormikForm from 'components/FormikForm';

import messages from '../messages';

import { generateVerificationCodeValidationSchema } from '../utils';

const CodeVerification = ({ goBack, verifyCode, isLoading, error }) => {
  useInjectSaga({ key: 'verificationCode', saga: verifyCodeSaga });
  const { formatMessage } = useIntl();

  const validationSchema = useMemo(
    () => generateVerificationCodeValidationSchema(formatMessage),
    [],
  );

  const onSubmit = ({ verificationCode }, actions) => {
    verifyCode(verificationCode);
    actions.setSubmitting(false);
  };

  return (
    <Container width="100%" fluid mt={40}>
      <Row>
        <Text
          mb={16}
          color={themeColors.secondary}
          fontWeight="bold"
          onClick={goBack}
          clickable
        >
          {formatMessage(messages.codeVerificationGoBack)}
        </Text>
      </Row>

      <Row>
        <Col>
          <Text mb={16}>
            <Markup
              content={formatMessage(messages.codeVerificationDescription)}
              noWrap
            />
          </Text>
          <Formik
            validationSchema={validationSchema}
            initialValues={{ verificationCode: '' }}
            onSubmit={onSubmit}
          >
            {({ handleSubmit, values, isValid, isSubmitting }) => {
              const { verificationCode } = values;

              const isSubmitDisabled =
                !isValid || !verificationCode || isSubmitting;

              return (
                <FormikForm>
                  <FormikInput
                    formikKey="verificationCode"
                    placeholder={formatMessage(
                      messages.codeVerificationPlaceholder,
                    )}
                    type="text"
                    label={formatMessage(messages.codeVerificationLabel)}
                    inputProps={{ width: '100%', height: 46 }}
                    my={10}
                  />

                  <Button
                    disabled={isSubmitDisabled}
                    height={46}
                    mt={25}
                    loading={isLoading}
                    title={formatMessage(messages.codeVerificationButton)}
                    onClick={handleSubmit}
                    type="submit"
                  />
                </FormikForm>
              );
            }}
          </Formik>
          {error && <ErrorAlert errorText={error} mt={20} />}
        </Col>
      </Row>
    </Container>
  );
};

CodeVerification.propTypes = {
  verifyCode: PropTypes.func,
  goBack: PropTypes.func,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
};

export default memo(CodeVerification);
