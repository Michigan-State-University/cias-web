import React, { FC } from 'react';
import { Form, Formik, FormikConfig, FieldArray } from 'formik';
import { useIntl } from 'react-intl';

import Row from 'components/Row';
import { Button, TextButton } from 'components/Button';
import Text from 'components/Text';
import Box from 'components/Box';
import { Table, TBody, TH, THead, TR } from 'components/Table';

import { themeColors } from 'theme';
import messages from './messages';
import { InvitePredefinedParticipantsFormValues } from './types';
import { PredefinedParticipantRowForm } from './PredefinedParticipantRowForm';
import { TEXT_BUTTON_PROPS } from './constants';

export type Props = {
  initialFormValues: InvitePredefinedParticipantsFormValues;
  isReportingIntervention: boolean;
  onSubmit: FormikConfig<InvitePredefinedParticipantsFormValues>['onSubmit'];
  submitting: boolean;
  onParticipantsChange?: (
    participants: InvitePredefinedParticipantsFormValues['participants'],
  ) => void;
};

export const InvitePredefinedParticipantsForm: FC<Props> = ({
  initialFormValues,
  onSubmit,
  submitting,
  onParticipantsChange,
}) => {
  const { formatMessage } = useIntl();

  return (
    <Formik
      initialValues={initialFormValues}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ values, handleSubmit, setFieldValue }) => (
        <Form
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
          }}
        >
          <Text fontWeight="bold">
            {formatMessage(messages.reviewPredefinedParticipants, {
              count: values.participants.length,
            })}
          </Text>

          <Box overflow="auto" flex={1}>
            <Table width="100%">
              <THead>
                <TR height={46}>
                  <TH padding={8}>
                    <Text textAlign="left" fontWeight="bold">
                      {formatMessage(messages.participantColumnHeader)}
                    </Text>
                  </TH>
                  <TH padding={8}>
                    <Text textAlign="left" fontWeight="bold">
                      {formatMessage(messages.emailInputLabel)}
                    </Text>
                  </TH>
                  <TH padding={8}>
                    <Text textAlign="left" fontWeight="bold">
                      Phone
                    </Text>
                  </TH>
                  <TH width={110}></TH>
                </TR>
              </THead>
              <TBody>
                <FieldArray name="participants">
                  {({ remove }) => (
                    <>
                      {values.participants.map((participant, index) => (
                        <PredefinedParticipantRowForm
                          key={index}
                          participant={participant}
                          onRemove={() => {
                            remove(index);
                            if (onParticipantsChange) {
                              const updatedParticipants =
                                values.participants.filter(
                                  (_, i) => i !== index,
                                );
                              onParticipantsChange(updatedParticipants);
                            }
                          }}
                        />
                      ))}
                    </>
                  )}
                </FieldArray>
              </TBody>
            </Table>
          </Box>

          <Row justify="end" gap={16}>
            <TextButton
              buttonProps={{ ...TEXT_BUTTON_PROPS, color: themeColors.warning }}
              onClick={() => {
                setFieldValue('participants', []);
                onParticipantsChange?.([]);
              }}
              disabled={submitting}
            >
              {formatMessage(messages.removeAllParticipants)}
            </TextButton>
            <Button
              width="auto"
              px={24}
              type="submit"
              onClick={handleSubmit}
              loading={submitting}
              disabled={values.participants.length === 0}
            >
              {formatMessage(messages.createPredefinedParticipants, {
                count: values.participants.length,
              })}
            </Button>
          </Row>
        </Form>
      )}
    </Formik>
  );
};
