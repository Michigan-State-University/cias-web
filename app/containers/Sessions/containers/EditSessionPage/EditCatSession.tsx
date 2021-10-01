import React, { useState, useEffect, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { connect } from 'react-redux';
import { useInjectSaga } from 'redux-injectors';
import dayjs from 'dayjs';
import { createStructuredSelector } from 'reselect';

import { colors, themeColors } from 'theme';
import { jsonApiToArray } from 'utils/jsonApiMapper';
import { voiceDataParser } from 'global/parsers';
import { voiceByGoogleLanguageIdSelectFormatter } from 'utils/formatters';
import {
  bulkEditSessionRequest,
  bulkEditSession,
  editSessionRequest,
} from 'global/reducers/session';
import { CatSessionDto } from 'models/Session/SessionDto';
import { makeSelectIntervention } from 'global/reducers/intervention';
import { InterventionDto } from 'models/Intervention/InterventionDto';

import Box from 'components/Box';
import Text from 'components/Text';
import Row from 'components/Row';
import Divider from 'components/Divider';
import { SelectOption } from 'components/Select/types';
import ApiSelect from 'components/Select/ApiSelect';
import Circle from 'components/Circle';
import StyledInput from 'components/Input/StyledInput';
import GhostLink from 'components/GhostLink';

import CatMhTests from '../../components/CatMhTests';
import NarratorConflictModal from '../../components/NarratorConflictModal';
import messages from './messages';

type EditCatSessionProps = {
  session: CatSessionDto;
  editingPossible: boolean;
  editSession: any;
  editSessionSetting: any;
  intervention: InterventionDto;
};

const EditCatSession = ({
  session,
  editingPossible,
  editSession,
  editSessionSetting,
  intervention,
}: EditCatSessionProps): JSX.Element => {
  const {
    variable,
    catMhLanguageId,
    catMhPopulationId,
    catMhTimeFrameId,
    googleTtsVoice,
    catMhTestTypes,
    createdAt,
    settings: {
      narrator: { voice },
    },
  } = session;

  const { firstSessionLanguage, languageName: interventionLanguage } =
    intervention || {
      firstSessionLanguage: undefined,
      languageName: undefined,
    };

  useInjectSaga({ saga: bulkEditSession, key: 'bulkEditSession' });
  const { formatMessage, formatDate } = useIntl();

  const mappedCatTests = useMemo(
    () => catMhTestTypes.map(({ id }) => +id),
    [catMhTestTypes],
  );

  const [testsUrl, setTestsUrl] = useState('');
  const [languagesUrl, setLanguagesUrl] = useState('');
  const [initialFetch, setInitialFetch] = useState(true);

  const updateCatSession = (key: string, value: any) =>
    editSession({ [key]: value });

  const onSelectTests = (testIds: number[]) =>
    updateCatSession('catTests', testIds);

  useEffect(() => {
    if (catMhLanguageId && catMhPopulationId && catMhTimeFrameId) {
      const params = new URLSearchParams();
      params.append('language_id', `${catMhLanguageId}`);
      params.append('population_id', `${catMhPopulationId}`);
      params.append('time_frame_id', `${catMhTimeFrameId}`);

      setTestsUrl(`/v1/cat_mh/available_test_types?${params.toString()}`);
    }
    if (!initialFetch) {
      if (catMhTestTypes.length > 0) {
        onSelectTests([]);
      }
    } else {
      setInitialFetch(false);
    }
  }, [catMhLanguageId, catMhPopulationId, catMhTimeFrameId]);

  useEffect(() => {
    if (catMhLanguageId) {
      setLanguagesUrl(`/v1/cat_mh/languages/${catMhLanguageId}/voices`);
    }
  }, [catMhLanguageId]);

  const wrapWithLabel = (label: string, children: JSX.Element) => (
    <Box width="100%" mx={5}>
      <Text fontSize={13} mb={5}>
        {label}
      </Text>
      {children}
    </Box>
  );

  const onApiSelectUpdate =
    (key: string) => (selectedOption: SelectOption<string>) => {
      if (!selectedOption) return;
      updateCatSession(key, selectedOption.value);
    };

  const onNarratorVoiceDisable = () =>
    editSessionSetting({ path: `settings.narrator.voice`, value: false }, [
      'settings',
    ]);

  const selectModalVoiceAndLanguage = (languageId: string, voiceId: string) => {
    editSession({
      googleTtsVoiceId: voiceId,
      catMhLanguageId: languageId,
    });
  };

  const onLanguageUpdate = (selectedOption: SelectOption<string>) => {
    updateCatSession('googleTtsVoiceId', null);
    onApiSelectUpdate('catMhLanguageId')(selectedOption);
  };

  return (
    <Box display="flex" justify="center" align="center">
      {catMhLanguageId === null && voice === true && (
        <NarratorConflictModal
          onNarratorVoiceDisable={onNarratorVoiceDisable}
          wrapWithLabel={wrapWithLabel}
          selectModalVoiceAndLanguage={selectModalVoiceAndLanguage}
          languageName={firstSessionLanguage || interventionLanguage || ''}
        />
      )}
      <Box
        padding={30}
        mt={25}
        maxWidth={860}
        width="100%"
        bg={colors.white}
        borderRadius={5}
        boxShadow={`0px 4px 20px ${colors.selago}`}
        height="100%"
      >
        <Box height={35} display="flex" justify="between" align="center">
          <Text fontSize={20} fontWeight="bold">
            {formatMessage(messages.generalSettings)}
          </Text>
          <Box display="flex" justify="center" align="center">
            <Text lineHeight="26px" mr={5} color={themeColors.comment}>
              {formatMessage(messages.creationDate)}
            </Text>
            <Text
              fontWeight="bold"
              lineHeight="26px"
              color={themeColors.primary}
            >
              {formatDate(dayjs(createdAt).toDate())}
            </Text>
          </Box>
        </Box>
        <Row my={30}>
          <Divider />
        </Row>
        <Text mb={25} fontSize={16}>
          {formatMessage(messages.sessionDetails)}
        </Text>
        <Box display="flex" justify="between" align="center">
          {wrapWithLabel(
            formatMessage(messages.language),
            <ApiSelect
              url="/v1/cat_mh/languages"
              dataParser={(data: any) => jsonApiToArray(data, 'language')}
              selectProps={{
                onChange: onLanguageUpdate,
                isDisabled: !editingPossible,
              }}
              optionsFormatter={({ id, name }: any) => ({
                value: id,
                label: name,
              })}
              selectedValue={catMhLanguageId}
            />,
          )}
          {wrapWithLabel(
            formatMessage(messages.timeFrame),
            <ApiSelect
              url="/v1/cat_mh/time_frames"
              dataParser={(data: any) => jsonApiToArray(data, 'timeFrame')}
              selectProps={{
                onChange: onApiSelectUpdate('catMhTimeFrameId'),
                isDisabled: !editingPossible,
              }}
              optionsFormatter={({ id, description }: any) => ({
                value: id,
                label: description,
              })}
              selectedValue={catMhTimeFrameId}
            />,
          )}
          {wrapWithLabel(
            formatMessage(messages.population),
            <ApiSelect
              url="/v1/cat_mh/populations"
              dataParser={(data: any) => jsonApiToArray(data, 'population')}
              selectProps={{
                onChange: onApiSelectUpdate('catMhPopulationId'),
                isDisabled: !editingPossible,
              }}
              optionsFormatter={({ id, name }: any) => ({
                value: id,
                label: name,
              })}
              selectedValue={catMhPopulationId}
            />,
          )}
          {wrapWithLabel(
            formatMessage(messages.narratorVoiceType),
            <ApiSelect
              url={languagesUrl}
              dataParser={voiceDataParser}
              selectProps={{
                onChange: onApiSelectUpdate('googleTtsVoiceId'),
                isDisabled: !editingPossible || !languagesUrl,
              }}
              optionsFormatter={voiceByGoogleLanguageIdSelectFormatter}
              selectedValue={`${googleTtsVoice?.id}`}
            />,
          )}
          {wrapWithLabel(
            formatMessage(messages.variable),
            <StyledInput
              disabled={!editingPossible}
              // @ts-ignore
              mx={5}
              value={variable}
              onBlur={(value: any) => updateCatSession('variable', value)}
            />,
          )}
        </Box>
        <Row my={30}>
          <Divider />
        </Row>
        <Box display="flex" align="center" mb={25}>
          <Text fontSize={16}>{formatMessage(messages.testsHeader)}</Text>
          <GhostLink
            href="https://adaptivetestingtechnologies.com/cat-mh-modules/"
            target="_blank"
          >
            <Circle
              bg={colors.grey}
              color={colors.white}
              size="16px"
              fontWeight="bold"
              ml={5}
              fontSize={11}
              child="?"
            />
          </GhostLink>
        </Box>
        {!testsUrl && (
          <Text fontSize={15} fontWeight="bold" textAlign="center">
            {formatMessage(messages.noTestsData)}
          </Text>
        )}
        {testsUrl && (
          <CatMhTests
            disabled={!editingPossible}
            selectedTestIds={mappedCatTests}
            onSelectTest={onSelectTests}
            url={testsUrl}
          />
        )}
      </Box>
    </Box>
  );
};

const mapStateToProps = createStructuredSelector({
  intervention: makeSelectIntervention(),
});

const mapDispatchToProps = {
  editSession: bulkEditSessionRequest,
  editSessionSetting: editSessionRequest,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withConnect(EditCatSession);
