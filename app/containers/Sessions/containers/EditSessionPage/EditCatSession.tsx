import React, { useState, useEffect, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { connect } from 'react-redux';
import { useInjectSaga } from 'redux-injectors';

import { colors } from 'theme';
import { jsonApiToArray } from 'utils/jsonApiMapper';
import useDidUpdateEffect from 'utils/useDidUpdateEffect';
import {
  bulkEditSessionRequest,
  bulkEditSession,
} from 'global/reducers/session';
import { CatSessionDto } from 'models/Session/SessionDto';

import Box from 'components/Box';
import Text from 'components/Text';
import Row from 'components/Row';
import Divider from 'components/Divider';
import { SelectOption } from 'components/Select/types';
import ApiSelect from 'components/Select/ApiSelect';
import StyledInput from 'components/Input/StyledInput';

import messages from './messages';
import CatMhTests from '../../components/CatMhTests';

type EditCatSessionProps = {
  session: CatSessionDto;
  editingPossible: boolean;
  editSession: any;
};

const EditCatSession = ({
  session,
  editingPossible,
  editSession,
}: EditCatSessionProps): JSX.Element => {
  const {
    variable,
    catMhLanguageId,
    catMhPopulationId,
    catMhTimeFrameId,
    googleTtsVoice,
    catMhTestTypes,
  } = session;
  useInjectSaga({ saga: bulkEditSession, key: 'bulkEditSession' });
  const { formatMessage } = useIntl();

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
    const params = new URLSearchParams();
    params.append('language_id', `${catMhLanguageId}`);
    params.append('population_id', `${catMhPopulationId}`);
    params.append('time_frame_id', `${catMhTimeFrameId}`);

    setTestsUrl(`/v1/cat_mh/available_test_types?${params.toString()}`);
    if (!initialFetch) {
      onSelectTests([]);
    } else {
      setInitialFetch(false);
    }
  }, [catMhLanguageId, catMhPopulationId, catMhTimeFrameId]);

  useDidUpdateEffect(() => {
    updateCatSession('googleTtsVoiceId', null);
  }, [catMhLanguageId]);

  useEffect(() => {
    setLanguagesUrl(`/v1/cat_mh/languages/${catMhLanguageId}/voices`);
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

  return (
    <Box display="flex" justify="center" align="center">
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
        <Text fontSize={20} fontWeight="bold">
          {formatMessage(messages.generalSettings)}
        </Text>
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
                onChange: onApiSelectUpdate('catMhLanguageId'),
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
              dataParser={(data: any) => jsonApiToArray(data, 'voice')}
              selectProps={{
                onChange: onApiSelectUpdate('googleTtsVoiceId'),
                isDisabled: !editingPossible || !languagesUrl,
              }}
              optionsFormatter={({ id, languageCode, voiceLabel }: any) => ({
                value: id,
                label: `${languageCode} ${voiceLabel}`,
              })}
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
        <Text mb={25} fontSize={16}>
          {formatMessage(messages.testsHeader)}
        </Text>
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

const mapDispatchToProps = {
  editSession: bulkEditSessionRequest,
};

const withConnect = connect(null, mapDispatchToProps);

export default withConnect(EditCatSession);
