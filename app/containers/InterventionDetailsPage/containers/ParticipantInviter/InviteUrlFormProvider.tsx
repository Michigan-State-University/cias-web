import _ from 'lodash';
import { Form, Formik, useFormikContext } from 'formik';
import React, { FC, ReactNode, useEffect, useMemo, useState } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { useIntl } from 'react-intl';

import { makeSelectIntervention } from 'global/reducers/intervention';

import Column from 'components/Column';
import Divider from 'components/Divider';
import Row from 'components/Row';
import FormikSelect from 'components/FormikSelect';
import { SelectOption } from 'components/Select/types';
import { Intervention } from 'models/Intervention';

import { CopyLinkFormValues } from './types';
import messages from './messages';
import { createCopyLinkFormSchema, createInviteUrl } from './utils';

export type InviteUrlSlotProps = {
  url: string;
  /** Blocks the action itself (the mint), unlike the cosmetic `buttonDisabled`. */
  disabled: boolean;
  buttonDisabled: boolean;
  handleSubmit: () => void;
};

export type Props = {
  isModularIntervention: boolean;
  isReportingIntervention: boolean;
  intervention: Intervention;
  interventionId: string;
  interventionLanguageCode: string;
  sessionOptions: SelectOption<string>[];
  healthClinicOptions: SelectOption<string>[];
  renderInterventionControl: (slotProps: InviteUrlSlotProps) => ReactNode;
  renderSessionControl: (slotProps: InviteUrlSlotProps) => ReactNode;
  footer?: ReactNode;
};

const InviteUrlFormProvider: FC<Props> = ({
  isModularIntervention,
  isReportingIntervention,
  intervention,
  interventionId,
  interventionLanguageCode,
  sessionOptions,
  healthClinicOptions,
  renderInterventionControl,
  renderSessionControl,
  footer,
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

  const sessionSelect = (
    <FormikSelect
      formikKey="sessionOption"
      label={formatMessage(messages.sessionSelectLabel)}
      inputProps={{
        placeholder: formatMessage(messages.sessionSelectPlaceholder),
      }}
      options={sessionOptions}
    />
  );

  const clinicSelect = (
    <FormikSelect
      formikKey="healthClinicOption"
      label={formatMessage(messages.clinicSelectLabel)}
      inputProps={{
        placeholder: formatMessage(messages.clinicSelectPlaceholder),
      }}
      options={healthClinicOptions}
    />
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={() => {}}
    >
      {({ values, isValid, handleSubmit }) => {
        const healthClinicId = values.healthClinicOption?.value ?? null;
        const sessionId = values.sessionOption?.value ?? null;

        const interventionInviteUrl = createInviteUrl(
          isModularIntervention,
          isReportingIntervention,
          interventionId,
          null,
          healthClinicId,
          interventionLanguageCode,
        );
        const sessionInviteUrl = createInviteUrl(
          false, // Always use session URL for this button
          isReportingIntervention,
          interventionId,
          sessionId,
          healthClinicId,
          sessionLanguageCode === ''
            ? interventionLanguageCode
            : sessionLanguageCode,
        );

        const interventionLinkDisabled =
          isReportingIntervention && !values.healthClinicOption;
        // Deliberately weaker than `sessionLinkDisabled` — preserved verbatim from the original
        // form. Do not harmonise the two: the clinic requirement belongs on the button chrome only.
        const sessionActionDisabled = !isValid || !values.sessionOption;
        const sessionLinkDisabled =
          sessionActionDisabled ||
          (isReportingIntervention && !values.healthClinicOption);

        return (
          <Form>
            <Column>
              <Divider />
              {isModularIntervention &&
                renderInterventionControl({
                  url: interventionInviteUrl,
                  disabled: interventionLinkDisabled,
                  buttonDisabled: interventionLinkDisabled,
                  handleSubmit,
                })}
              {(!isModularIntervention || isReportingIntervention) && (
                <Row mt={16} gap={16}>
                  {!isModularIntervention && sessionSelect}
                  {isReportingIntervention && clinicSelect}
                </Row>
              )}
              {isModularIntervention && (
                <Row mt={16} gap={16}>
                  {sessionSelect}
                  {isReportingIntervention && clinicSelect}
                </Row>
              )}
              {renderSessionControl({
                url: sessionInviteUrl,
                disabled: sessionActionDisabled,
                buttonDisabled: sessionLinkDisabled,
                handleSubmit,
              })}
              {footer}
              <SetProperSessionLanguageCode />
            </Column>
          </Form>
        );
      }}
    </Formik>
  );
};

const mapStateToProps = createStructuredSelector({
  intervention: makeSelectIntervention(),
});

const withConnect = connect(mapStateToProps, {});

export default withConnect(InviteUrlFormProvider);
