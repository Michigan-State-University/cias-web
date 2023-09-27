import React, { FC, useMemo } from 'react';
import { FieldArray, Form, Formik, FormikConfig } from 'formik';
import { useIntl } from 'react-intl';

import AddSign from 'assets/svg/addSign2.svg';

import Column from 'components/Column';
import { SelectOption } from 'components/Select/types';
import FormikSelect from 'components/FormikSelect';
import Row from 'components/Row';
import { Button, TextButton } from 'components/Button';
import { FormikEmailsInput } from 'components/FormikEmailsInput';
import Divider from 'components/Divider';
import Icon from 'components/Icon';

import messages from './messages';
import {
  createInviteEmailsParticipantsFormSchema,
  getInterventionTypeDependedInitialValues,
} from './utils';
import {
  InviteEmailParticipantsFormValues,
  NormalizedHealthClinicsInfos,
} from './types';
import { TEXT_BUTTON_PROPS } from './constants';
import { HealthClinicCollapse } from './HealthClinicCollapse';
import { SelectSessionControls } from './SelectSessionControls';

export type Props = {
  isModularIntervention: boolean;
  isReportingIntervention: boolean;
  sessionOptions: SelectOption<string>[];
  healthClinicOptions: SelectOption<string>[];
  onSubmit: FormikConfig<InviteEmailParticipantsFormValues>['onSubmit'];
  submitting: boolean;
  initialFormValues?: Nullable<InviteEmailParticipantsFormValues>;
  normalizedHealthClinicsInfos: NormalizedHealthClinicsInfos;
};

export const InviteEmailParticipantsForm: FC<Props> = ({
  isModularIntervention,
  isReportingIntervention,
  sessionOptions,
  healthClinicOptions,
  onSubmit,
  submitting,
  initialFormValues,
  normalizedHealthClinicsInfos,
}) => {
  const { formatMessage } = useIntl();

  const initialValues: InviteEmailParticipantsFormValues = useMemo(() => {
    if (initialFormValues) return initialFormValues;

    const interventionDependentFormValues =
      getInterventionTypeDependedInitialValues(
        isModularIntervention,
        sessionOptions[0],
      );

    if (isReportingIntervention) {
      return {
        isReportingIntervention: true,
        clinics: [{ healthClinicOption: null, emails: [] }],
        ...interventionDependentFormValues,
      };
    }

    return {
      isReportingIntervention: false,
      emails: [],
      ...interventionDependentFormValues,
    };
  }, [initialFormValues]);

  const validationSchema = useMemo(
    () =>
      createInviteEmailsParticipantsFormSchema(
        formatMessage,
        isModularIntervention,
        isReportingIntervention,
      ),
    [isModularIntervention, isReportingIntervention],
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ isValid, handleSubmit, values }) => (
        <Form
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 24,
          }}
        >
          <Column>
            {!values.isModularIntervention && (
              <SelectSessionControls
                selectFirstSessionFormikKey="selectFirstSession"
                sessionOptionFormikKey="sessionOption"
                sessionOptions={sessionOptions}
              />
            )}
            {!values.isReportingIntervention && (
              <FormikEmailsInput
                formikKey="emails"
                label={formatMessage(messages.emailsInputLabel)}
                placeholder={formatMessage(messages.emailsInputPlaceholder)}
                transparent
                required
                mt={16}
              />
            )}
            {values.isReportingIntervention && (
              <>
                <Divider mt={16} />
                <FieldArray name="clinics">
                  {({ push, remove }) => (
                    <Column>
                      {values.clinics.map((clinic, index) => (
                        <>
                          <HealthClinicCollapse
                            healthClinicInfo={
                              clinic.healthClinicOption
                                ? normalizedHealthClinicsInfos[
                                    clinic.healthClinicOption?.value
                                  ]
                                : null
                            }
                            openedInitially
                          >
                            <Column gap={16} pb={16}>
                              <FormikSelect
                                formikKey={`clinics.${index}.healthClinicOption`}
                                label={formatMessage(
                                  messages.clinicSelectLabel,
                                )}
                                inputProps={{
                                  placeholder: formatMessage(
                                    messages.clinicSelectPlaceholder,
                                  ),
                                  isClearable: true,
                                }}
                                options={healthClinicOptions}
                                required
                              />
                              <FormikEmailsInput
                                formikKey={`clinics.${index}.emails`}
                                label={formatMessage(messages.emailsInputLabel)}
                                placeholder={formatMessage(
                                  messages.emailsInputPlaceholder,
                                )}
                                transparent
                                required
                              />
                              {index !== 0 && (
                                <Row>
                                  <TextButton
                                    onClick={() => remove(index)}
                                    buttonProps={TEXT_BUTTON_PROPS}
                                  >
                                    {formatMessage(
                                      messages.removeClinicButtonTitle,
                                    )}
                                  </TextButton>
                                </Row>
                              )}
                            </Column>
                          </HealthClinicCollapse>
                        </>
                      ))}
                      <Row mt={16}>
                        <TextButton
                          onClick={() =>
                            push({ healthClinicOption: null, emails: [] })
                          }
                          buttonProps={TEXT_BUTTON_PROPS}
                        >
                          <Icon src={AddSign} />
                          {formatMessage(messages.addClinicButtonTitle)}
                        </TextButton>
                      </Row>
                    </Column>
                  )}
                </FieldArray>
              </>
            )}
          </Column>
          <Row justify="end">
            <Button
              disabled={!isValid}
              width="auto"
              px={24}
              type="submit"
              onClick={handleSubmit}
              loading={submitting}
            >
              {formatMessage(messages.inviteEmailParticipantSubmitButtonTitle)}
            </Button>
          </Row>
        </Form>
      )}
    </Formik>
  );
};
