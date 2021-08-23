import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { connect } from 'react-redux';

import { colors } from 'theme';
import { CatSessionDto } from 'models/Session/SessionDto';
import { jsonApiToArray } from 'utils/jsonApiMapper';
import { editSessionRequest } from 'global/reducers/session';

import Box from 'components/Box';
import Text from 'components/Text';
import Row from 'components/Row';
import Divider from 'components/Divider';
import ApiSelect from 'components/Select/ApiSelect';
import Input from 'components/Input';
import Button from 'components/Button';

import messages from './messages';
import CatMhTests from '../../components/CatMhTests';

type Props = {
  session: CatSessionDto;
  editingPossible: boolean;
};

const EditCatSession = ({
  session: { variable, id: sessionId },
  editingPossible,
}: Props): JSX.Element => {
  const { formatMessage } = useIntl();
  const [formData, setFormData] = useState<any>({
    selectedLanguage: null,
    selectedTimeFrame: null,
    selectedPopulation: null,
    selectedVoice: null,
    sessionVariable: variable,
    selectedTestIds: [],
  });
  const [testsUrl, setTestsUrl] = useState('');
  const [languagesUrl, setLanguagesUrl] = useState('');

  useEffect(() => {
    const { selectedLanguage, selectedTimeFrame, selectedPopulation } =
      formData;
    if (!selectedLanguage || !selectedTimeFrame || !selectedPopulation) return;

    setTestsUrl(
      `/v1/cat_mh/available_test_types?language_id=${selectedLanguage.value}&population_id=${selectedPopulation.value}&time_frame_id=${selectedTimeFrame.value}`,
    );
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
      selectedTestIds: testIds,
      selectedVoice: voiceId,
      sessionVariable,
    } = formData;
    console.log(
      {
        catMhLanguage: selectedLanguage.value,
        catMhTimeFrame: selectedTimeFrame.value,
        catMhPopulation: selectedPopulation.value,
        testIds,
        voiceId,
        variable: sessionVariable,
      },
      [],
      sessionId,
    );
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
          <Box width="100%" mx={5}>
            <Text fontSize={13} mb={5}>
              {formatMessage(messages.language)}
            </Text>
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
            />
          </Box>
          <Box width="100%" mx={5}>
            <Text fontSize={13} mb={5}>
              {formatMessage(messages.timeFrame)}
            </Text>
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
            />
          </Box>
          <Box width="100%" mx={5}>
            <Text fontSize={13} mb={5}>
              {formatMessage(messages.population)}
            </Text>
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
            />
          </Box>
          <Box width="100%" mx={5}>
            <Text fontSize={13} mb={5}>
              {formatMessage(messages.narratorVoiceType)}
            </Text>
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
            />
          </Box>
          <Box width="100%" mx={5}>
            <Text fontSize={13} mb={5}>
              {formatMessage(messages.variable)}
            </Text>
            <Input
              disabled={!editingPossible}
              mx={5}
              defaultValue={formData.sessionVariable}
              onBlur={(value: any) => updateFormData('sessionVariable', value)}
            ></Input>
          </Box>
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
          <Button onClick={updateCatSession} mt={30} width={200}>
            {formatMessage(messages.saveChanges)}
          </Button>
        )}
      </Box>
    </Box>
  );
};

const mapDispatchToProps = {
  editSession: editSessionRequest,
};

const withConnect = connect(null, mapDispatchToProps);

export default withConnect(EditCatSession);
