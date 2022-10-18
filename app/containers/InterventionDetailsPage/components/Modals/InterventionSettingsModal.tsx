import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import isEqual from 'lodash/isEqual';

import { jsonApiToArray } from 'utils/jsonApiMapper';
import { languageSelectOptionFormatter } from 'utils/formatters';
import { objectDifference } from 'utils/objectDifference';
import {
  editInterventionRequest,
  makeSelectIntervention,
} from 'global/reducers/intervention';
import { colors } from 'theme';
import { InterventionDto } from 'models/Intervention';
import { CharacterType } from 'models/Character';

import {
  Col as GCol,
  FullWidthContainer,
  Row as GRow,
} from 'components/ReactGridSystem';
import ApiSelect from 'components/Select/ApiSelect';
import Text from 'components/Text';
import Divider from 'components/Divider';
import H3 from 'components/H3';
import { LabelPosition } from 'components/Switch';
import Switch from 'components/Switch/Switch';
import Button from 'components/Button';
import Row from 'components/Row';
import CharacterSelector from 'components/CharacterSelector';

import messages from '../../messages';
import {
  INTERVENTION_LANGUAGE_LABEL_ID,
  INTERVENTION_QUICK_EXIT_LABEL_ID,
} from './constants';

export type Props = {
  editingPossible: boolean;
  onClose: () => void;
};

const InterventionSettingsModal = ({ editingPossible, onClose }: Props) => {
  const { formatMessage } = useIntl();

  const dispatch = useDispatch();
  const originalIntervention = useSelector(makeSelectIntervention());

  const [changedIntervention, setChangedIntervention] =
    useState(originalIntervention);
  const { id, languageCode, languageName, quickExit, narrator } =
    changedIntervention;

  useEffect(() => {
    setChangedIntervention(originalIntervention);
  }, [originalIntervention]);

  const hasInterventionChanged = useMemo(
    () => !isEqual(originalIntervention, changedIntervention),
    [originalIntervention, changedIntervention],
  );

  const saveChanges = useCallback(() => {
    const changes = objectDifference(originalIntervention, changedIntervention);
    dispatch(
      editInterventionRequest(
        {
          ...changes,
          id,
        },
        changedIntervention.narrator !== originalIntervention.narrator,
      ),
    );
  }, [originalIntervention, changedIntervention]);

  const changeIntervention = (changes: any) => {
    setChangedIntervention({
      ...changedIntervention,
      ...changes,
    });
  };

  const handleLanguageChange = ({
    value,
    label,
    googleLanguageId,
  }: {
    value: InterventionDto['languageCode'];
    label: InterventionDto['languageName'];
    googleLanguageId: string | number;
  }) =>
    changeIntervention({
      languageCode: value,
      languageName: label,
      googleLanguageId: +googleLanguageId,
    });

  const handleQuickExitChange = (value: InterventionDto['quickExit']) =>
    changeIntervention({
      quickExit: value,
    });

  const handleNarratorChange = (value: CharacterType) => {
    changeIntervention({
      narrator: value,
    });
  };

  const onSaveClick = () => {
    saveChanges();
    onClose();
  };

  return (
    <FullWidthContainer>
      <Text mt={6}>
        {formatMessage(messages.interventionSettingsModalSubtitle)}
      </Text>
      <Divider mt={16} mb={40} color={colors.lightDivider} />
      <GRow mb={16}>
        <GCol>
          <H3 id={INTERVENTION_LANGUAGE_LABEL_ID}>
            {formatMessage(messages.interventionSettingsLanguageLabel)}
          </H3>
        </GCol>
        <GCol>
          <H3>{formatMessage(messages.interventionSettingsQuickExit)}</H3>
        </GCol>
      </GRow>
      <GRow align="center">
        <GCol>
          {/*  @ts-ignore */}
          <ApiSelect
            url="/v1/google/languages"
            dataParser={(data: object) =>
              jsonApiToArray(data, 'supportedLanguage')
            }
            optionsFormatter={languageSelectOptionFormatter}
            selectProps={{
              onChange: handleLanguageChange,
              value: {
                value: languageCode,
                label: languageName,
              },
              'aria-labelledby': INTERVENTION_LANGUAGE_LABEL_ID,
              isDisabled: !editingPossible,
            }}
            width="100%"
          />
        </GCol>
        <GCol>
          <Switch
            checked={quickExit}
            onToggle={handleQuickExitChange}
            id={INTERVENTION_QUICK_EXIT_LABEL_ID}
            labelPosition={LabelPosition.Right}
            disabled={!editingPossible}
          >
            <Text fontWeight="bold">
              {formatMessage(messages.interventionSettingsQuickExitLabel)}
            </Text>
          </Switch>
        </GCol>
      </GRow>
      <GRow mb={16} mt={40}>
        <GCol>
          <H3>{formatMessage(messages.defaultNarrator)}</H3>
        </GCol>
      </GRow>
      <GRow mb={16}>
        <GCol>
          <CharacterSelector
            value={narrator || CharacterType.PEEDY}
            onChange={handleNarratorChange}
            disabled={!editingPossible}
          />
        </GCol>
      </GRow>
      <Row gap={16} mt={56}>
        <Button
          // @ts-ignore
          px={30}
          width="auto"
          title={formatMessage(messages.applyChangesButton)}
          disabled={!hasInterventionChanged}
          onClick={onSaveClick}
        />
        <Button
          // @ts-ignore
          px={30}
          width="auto"
          inverted
          title={formatMessage(messages.cancelButton)}
          onClick={onClose}
        />
      </Row>
    </FullWidthContainer>
  );
};

export default memo(InterventionSettingsModal);
