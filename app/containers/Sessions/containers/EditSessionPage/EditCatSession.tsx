import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { connect } from 'react-redux';
import { useInjectSaga } from 'redux-injectors';
import { createStructuredSelector } from 'reselect';

import { colors } from 'theme';
import { jsonApiToArray } from 'utils/jsonApiMapper';
import {
  bulkEditSessionRequest,
  bulkEditSession,
  makeSelectSessionEditLoader,
} from 'global/reducers/session';

import Box from 'components/Box';
import Text from 'components/Text';
import Row from 'components/Row';
import Divider from 'components/Divider';
import ApiSelect from 'components/Select/ApiSelect';
import Input from 'components/Input';
import Button from 'components/Button';

import messages from './messages';
import { EditCatSessionProps, EditCatSessionState } from './types';
import CatMhTests from '../../components/CatMhTests';

const EditCatSession = ({
  session: {
    variable,
    catMhLanguageId,
    catMhPopulationId,
    catMhTimeFrameId,
    googleTtsVoice,
    catMhTestTypes,
  },
  editingPossible,
  editSession,
  sessionIsEditing,
}: EditCatSessionProps): JSX.Element => {
  useInjectSaga({ saga: bulkEditSession, key: 'bulkEditSession' });
  const { formatMessage } = useIntl();
  const [formData, setFormData] = useState<EditCatSessionState>({
    selectedLanguage: null,
    selectedTimeFrame: null,
    selectedPopulation: null,
    selectedVoice: null,
    sessionVariable: variable,
    selectedTestIds: catMhTestTypes.map(({ id }) => +id),
  });
  const [testsUrl, setTestsUrl] = useState('');
  const [languagesUrl, setLanguagesUrl] = useState('');

  useEffect(() => {
    const { selectedLanguage, selectedTimeFrame, selectedPopulation } =
      formData;
    if (!selectedLanguage || !selectedTimeFrame || !selectedPopulation) return;

    const params = new URLSearchParams();
    params.append('language_id', `${selectedLanguage.value}`);
    params.append('population_id', `${selectedPopulation.value}`);
    params.append('time_frame_id', `${selectedTimeFrame.value}`);

    setTestsUrl(`/v1/cat_mh/available_test_types?${params.toString()}`);
  }, [
    formData.selectedLanguage,
    formData.selectedTimeFrame,
    formData.selectedPopulation,
  ]);

  useEffect(() => {
    if (!formData.selectedLanguage) return;
    setLanguagesUrl(
      `/v1/cat_mh/languages/${formData.selectedLanguage.value}/voices`,
    );
  }, [formData.selectedLanguage]);

  const updateFormData = (key: string, value: any) =>
    setFormData({ ...formData, [key]: value });

  const onSelectTests = (testIds: number[]) =>
    updateFormData('selectedTestIds', testIds);

  const updateCatSession = () => {
    const {
      selectedLanguage,
      selectedTimeFrame,
      selectedPopulation,
      selectedVoice,
      selectedTestIds: testIds,
      sessionVariable,
    } = formData;
    if (
      selectedLanguage &&
      selectedTimeFrame &&
      selectedPopulation &&
      selectedVoice
    ) {
      editSession({
        catMhLanguageId: selectedLanguage.value,
        catMhTimeFrameId: selectedTimeFrame.value,
        catMhPopulationId: selectedPopulation.value,
        catTests: testIds,
        googleTtsVoiceId: selectedVoice.value,
        variable: sessionVariable,
      });
    }
  };

  const wrapWithLabel = (label: string, children: JSX.Element) => (
    <Box width="100%" mx={5}>
      <Text fontSize={13} mb={5}>
        {label}
      </Text>
      {children}
    </Box>
  );

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
                onChange: (value: any) =>
                  updateFormData('selectedLanguage', value),
                value: formData.selectedLanguage,
                isDisabled: !editingPossible,
              }}
              optionsFormatter={({ id, name }: any) => ({
                value: id,
                label: name,
              })}
              defaultValue={catMhLanguageId}
            />,
          )}
          {wrapWithLabel(
            formatMessage(messages.timeFrame),
            <ApiSelect
              url="/v1/cat_mh/time_frames"
              dataParser={(data: any) => jsonApiToArray(data, 'timeFrame')}
              selectProps={{
                onChange: (value: any) =>
                  updateFormData('selectedTimeFrame', value),
                value: formData.selectedTimeFrame,
                isDisabled: !editingPossible,
              }}
              optionsFormatter={({ id, description }: any) => ({
                value: id,
                label: description,
              })}
              defaultValue={catMhTimeFrameId}
            />,
          )}
          {wrapWithLabel(
            formatMessage(messages.population),
            <ApiSelect
              url="/v1/cat_mh/populations"
              dataParser={(data: any) => jsonApiToArray(data, 'population')}
              selectProps={{
                onChange: (value: any) =>
                  updateFormData('selectedPopulation', value),
                value: formData.selectedPopulation,
                isDisabled: !editingPossible,
              }}
              optionsFormatter={({ id, name }: any) => ({
                value: id,
                label: name,
              })}
              defaultValue={catMhPopulationId}
            />,
          )}
          {wrapWithLabel(
            formatMessage(messages.narratorVoiceType),
            <ApiSelect
              url={languagesUrl}
              dataParser={(data: any) => jsonApiToArray(data, 'voice')}
              selectProps={{
                onChange: (value: any) =>
                  updateFormData('selectedVoice', value),
                value: formData.selectedVoice,
                isDisabled: !editingPossible || !languagesUrl,
              }}
              optionsFormatter={({ id, languageCode, voiceLabel }: any) => ({
                value: id,
                label: `${languageCode} ${voiceLabel}`,
              })}
              defaultValue={`${googleTtsVoice.id}`}
            />,
          )}
          {wrapWithLabel(
            formatMessage(messages.variable),
            <Input
              disabled={!editingPossible}
              mx={5}
              defaultValue={formData.sessionVariable}
              onBlur={(value: any) => updateFormData('sessionVariable', value)}
            ></Input>,
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
            selectedTestIds={formData.selectedTestIds}
            onSelectTest={onSelectTests}
            url={testsUrl}
          />
        )}
        {formData.selectedTestIds.length !== 0 && (
          // @ts-ignore
          <Button
            loading={sessionIsEditing}
            onClick={updateCatSession}
            mt={30}
            width={200}
          >
            {formatMessage(messages.saveChanges)}
          </Button>
        )}
      </Box>
    </Box>
  );
};

const mapStateToProps = createStructuredSelector({
  sessionIsEditing: makeSelectSessionEditLoader(),
});

const mapDispatchToProps = {
  editSession: bulkEditSessionRequest,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default withConnect(EditCatSession);
