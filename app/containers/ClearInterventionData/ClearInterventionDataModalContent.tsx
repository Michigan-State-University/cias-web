import { useCallback, useState, useMemo } from 'react';
import { Form, Formik, FormikConfig } from 'formik';
import { useInjectSaga } from 'redux-injectors';
import { useIntl } from 'react-intl';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';

import { colors } from 'theme';

import globalMessages from 'global/i18n/globalMessages';
import {
  clearInterventionDataRequest,
  makeSelectInterventionLoader,
  withClearInterventionDataSaga,
} from 'global/reducers/intervention';

import { SensitiveDataState } from 'models/Intervention';

import { CustomDayjsLocale } from 'utils/dayjs';

import Text from 'components/Text';
import Box from 'components/Box';
import { Button } from 'components/Button';
import Row from 'components/Row';
import { ModalContentRenderer } from 'components/Modal';
import { ErrorText } from 'components/FormikControlLayout';
import Column from 'components/Column';
import FormikInput from 'components/FormikInput';

import messages from './messages';
import {
  ClearInterventionDataFormValues,
  ClearInterventionDataModalState,
} from './types';
import { createClearConversationDataFormValidationSchema } from './utils';
import { DELAY_INPUT_ID } from './constants';

export const ClearInterventionDataModalContent: ModalContentRenderer<ClearInterventionDataModalState> =
  ({ closeModal, modalState }) => {
    const { formatMessage } = useIntl();
    const dispatch = useDispatch();

    useInjectSaga(withClearInterventionDataSaga);

    const validationSchema = useMemo(
      () => createClearConversationDataFormValidationSchema(),
      [],
    );

    const {
      initialSensitiveDataState,
      initialClearSensitiveDataScheduledAt,
      interventionId,
    } = modalState ?? {};

    const [{ sensitiveDataState, clearSensitiveDataScheduledAt }, setState] =
      useState({
        sensitiveDataState: initialSensitiveDataState!,
        clearSensitiveDataScheduledAt: initialClearSensitiveDataScheduledAt,
      });

    const clearInterventionDataLoading = useSelector(
      makeSelectInterventionLoader('clearInterventionData'),
    );

    const onSubmit: FormikConfig<ClearInterventionDataFormValues>['onSubmit'] =
      useCallback(
        ({ delay }) => {
          if (sensitiveDataState !== SensitiveDataState.COLLECTED) {
            closeModal();
            return;
          }

          dispatch(
            clearInterventionDataRequest(interventionId, delay, setState),
          );
        },
        [sensitiveDataState, interventionId, setState],
      );

    const isClearanceScheduledForFuture =
      clearSensitiveDataScheduledAt &&
      dayjs(clearSensitiveDataScheduledAt).isAfter(dayjs());

    return (
      <Formik
        validationSchema={validationSchema}
        initialValues={{ delay: '5' }}
        onSubmit={onSubmit}
      >
        {({ isValid, errors, handleSubmit }) => (
          <Form>
            <Box
              display="flex"
              direction="column"
              align="center"
              mt={32}
              gap={32}
              textAlign="center"
            >
              {sensitiveDataState === SensitiveDataState.COLLECTED && (
                <>
                  <Text fontSize={15} lineHeight={1.5}>
                    {formatMessage(messages.clearDataConfirmationContent)}
                  </Text>
                  <Column>
                    <Row align="center" justify="center" gap={12}>
                      <label htmlFor={DELAY_INPUT_ID}>
                        <Text fontSize={15} lineHeight={1.5}>
                          {formatMessage(messages.deleteDataIn)}
                        </Text>
                      </label>
                      <FormikInput
                        formikKey="delay"
                        hideErrorMessages
                        id={DELAY_INPUT_ID}
                        width={70}
                        inputProps={{
                          width: 70,
                          // @ts-ignore
                          keyboard: 'number',
                          background: colors.lightDivider,
                          min: 0,
                        }}
                      />
                      <Text fontSize={15} lineHeight={1.5}>
                        {formatMessage(messages.days)}
                      </Text>
                    </Row>
                    {!isValid && <ErrorText>{errors.delay}</ErrorText>}
                  </Column>
                  <Text fontSize={15} lineHeight={1.5} opacity={0.7}>
                    {formatMessage(messages.clearDataConfirmationNote)}
                  </Text>
                </>
              )}
              {sensitiveDataState === SensitiveDataState.MARKED_TO_REMOVE && (
                <>
                  <Text fontSize={20} fontWeight="bold" lineHeight={1.3}>
                    {formatMessage(messages.markedToRemoveTitle)}
                  </Text>
                  <Text fontSize={15} lineHeight={1.5}>
                    {formatMessage(messages.markedToRemoveContentFirst)}
                    <br />
                    {isClearanceScheduledForFuture &&
                      formatMessage(messages.markedToRemoveContentSecond, {
                        time: dayjs(clearSensitiveDataScheduledAt)
                          .locale(CustomDayjsLocale.EN_LONG_RELATIVE_TIME)
                          .fromNow(false),
                      })}
                  </Text>
                </>
              )}
              {sensitiveDataState === SensitiveDataState.REMOVED && (
                <>
                  <Text fontSize={20} fontWeight="bold" lineHeight={1.3}>
                    {formatMessage(messages.removedTitle)}
                  </Text>
                  <Text fontSize={15} lineHeight={1.5}>
                    {formatMessage(messages.removedContent)}
                  </Text>
                </>
              )}
            </Box>
            <Row mt={42} gap={16} align="center" justify="center">
              {sensitiveDataState === SensitiveDataState.COLLECTED && (
                <Button
                  inverted
                  hoverable
                  onClick={closeModal}
                  width="auto"
                  py={0}
                  px={30}
                >
                  {formatMessage(globalMessages.cancel)}
                </Button>
              )}
              <Button
                hoverable
                onClick={handleSubmit}
                disabled={!isValid}
                loading={clearInterventionDataLoading}
                width="auto"
                py={0}
                px={30}
                color={
                  sensitiveDataState === SensitiveDataState.COLLECTED
                    ? 'warning'
                    : 'primary'
                }
              >
                {formatMessage(
                  sensitiveDataState === SensitiveDataState.COLLECTED
                    ? messages.clearData
                    : globalMessages.iUnderstand,
                )}
              </Button>
            </Row>
          </Form>
        )}
      </Formik>
    );
  };
