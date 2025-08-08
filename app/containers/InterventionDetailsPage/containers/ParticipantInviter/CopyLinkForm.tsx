import _ from 'lodash';
import { Form, Formik, useFormikContext } from 'formik';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { useIntl } from 'react-intl';

import share from 'assets/svg/share.svg';
import { makeSelectIntervention } from 'global/reducers/intervention';

import Column from 'components/Column';
import Divider from 'components/Divider';
import Row from 'components/Row';
import FormikSelect from 'components/FormikSelect';
import CopyToClipboard from 'components/CopyToClipboard';
import { SelectOption } from 'components/Select/types';
import { Intervention } from 'models/Intervention';

import { CopyLinkFormValues } from './types';
import messages from './messages';
import { createCopyLinkFormSchema, createInviteUrl } from './utils';

export type Props = {
  isModularIntervention: boolean;
  isReportingIntervention: boolean;
  intervention: Intervention;
  interventionId: string;
  interventionLanguageCode: string;
  sessionOptions: SelectOption<string>[];
  healthClinicOptions: SelectOption<string>[];
};

const CopyLinkForm: FC<Props> = ({
  isModularIntervention,
  isReportingIntervention,
  intervention,
  interventionId,
  interventionLanguageCode,
  sessionOptions,
  healthClinicOptions,
}) => {
  const { formatMessage } = useIntl();

  const initialValues: CopyLinkFormValues = useMemo(
    () => ({ sessionOption: null, healthClinicOption: null }),
    [interventionId],
  );

  const validationSchema = useMemo(
    () =>
      createCopyLinkFormSchema(
        formatMessage,
        isModularIntervention,
        isReportingIntervention,
      ),
    [isModularIntervention, isReportingIntervention],
  );

  const [sessionLanguageCode, setSessionLanguageCode] = useState('');

  const SetProperSessionLanguageCode = () => {
    const { values } = useFormikContext();
    useEffect(() => {
      const session = _.find(intervention.sessions, {
        // @ts-ignore
        id: values?.sessionOption?.value,
      });
      setSessionLanguageCode(session?.languageCode || '');
    }, [values]);
    return null;
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={() => {}}
    >
      {({ values, isValid, dirty, handleSubmit }) => (
        <Form>
          <Column>
            <Divider />
            {(!isModularIntervention || isReportingIntervention) && (
              <Row mt={16} gap={16}>
                {!isModularIntervention && (
                  <FormikSelect
                    formikKey="sessionOption"
                    label={formatMessage(messages.sessionSelectLabel)}
                    inputProps={{
                      placeholder: formatMessage(
                        messages.sessionSelectPlaceholder,
                      ),
                    }}
                    options={sessionOptions}
                  />
                )}
                {isReportingIntervention && (
                  <FormikSelect
                    formikKey="healthClinicOption"
                    label={formatMessage(messages.clinicSelectLabel)}
                    inputProps={{
                      placeholder: formatMessage(
                        messages.clinicSelectPlaceholder,
                      ),
                    }}
                    options={healthClinicOptions}
                  />
                )}
              </Row>
            )}
            <CopyToClipboard
              // @ts-ignore
              textToCopy={createInviteUrl(
                isModularIntervention,
                isReportingIntervention,
                interventionId,
                values.sessionOption?.value,
                values.healthClinicOption?.value,
                sessionLanguageCode === ''
                  ? interventionLanguageCode
                  : sessionLanguageCode,
                intervention.skipWarningScreen ?? false,
              )}
              icon={share}
              iconAlt={formatMessage(messages.copyLinkIconAlt)}
              disabled={!isValid}
              buttonDisabled={
                !isValid ||
                ((!isModularIntervention || isReportingIntervention) && !dirty)
              }
              onClick={handleSubmit}
              mt={21}
              mb={13}
            >
              {formatMessage(messages.copyLinkButtonTitle, {
                isModularIntervention,
              })}
            </CopyToClipboard>
            <SetProperSessionLanguageCode />
          </Column>
        </Form>
      )}
    </Formik>
  );
};

const mapStateToProps = createStructuredSelector({
  intervention: makeSelectIntervention(),
});

const mapDispatchToProps = {};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withConnect(CopyLinkForm);
