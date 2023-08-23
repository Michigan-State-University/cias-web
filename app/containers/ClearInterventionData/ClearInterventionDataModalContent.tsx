import { useCallback, useState } from 'react';
import { useInjectSaga } from 'redux-injectors';
import { useIntl } from 'react-intl';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';

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

import messages from './messages';
import { ClearInterventionDataModalState } from './types';

export const ClearInterventionDataModalContent: ModalContentRenderer<ClearInterventionDataModalState> =
  ({ closeModal, modalState }) => {
    const { formatMessage } = useIntl();
    const dispatch = useDispatch();

    useInjectSaga(withClearInterventionDataSaga);

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

    const handleConfirm = useCallback(() => {
      if (sensitiveDataState !== SensitiveDataState.COLLECTED) {
        closeModal();
        return;
      }

      dispatch(clearInterventionDataRequest(interventionId, 5, setState));
    }, [sensitiveDataState, interventionId, setState]);

    return (
      <>
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
              <Text fontSize={20} fontWeight="bold" lineHeight={1.3}>
                {formatMessage(globalMessages.areYouSure)}
              </Text>
              <Text fontSize={15} lineHeight={1.5}>
                {formatMessage(messages.clearDataConfirmationContent)}
              </Text>
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
                {clearSensitiveDataScheduledAt &&
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
            onClick={handleConfirm}
            disabled={false}
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
      </>
    );
  };
