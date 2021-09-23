import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';

import { voiceDataParser } from 'global/parsers';
import { jsonApiToArray } from 'utils/jsonApiMapper';

import Modal from 'components/Modal';
import Radio from 'components/Radio';
import Box from 'components/Box';
import Text from 'components/Text';
import Button from 'components/Button';
import ApiSelect from 'components/Select/ApiSelect';
import { SelectOption } from 'components/Select/types';
import TextVoicePreviewInput from 'components/Input/TextVoicePreviewInput';

import { voiceByGoogleLanguageIdSelectFormatter } from 'utils/formatters';
import messages from './messages';

interface Props {
  onNarratorVoiceDisable: () => void;
  wrapWithLabel: (message: string, children: JSX.Element) => JSX.Element;
  selectModalVoiceAndLanguage: (voiceId: string, languageId: string) => void;
  languageName: string;
}

const NarratorConflictModal = ({
  onNarratorVoiceDisable,
  wrapWithLabel,
  selectModalVoiceAndLanguage,
  languageName,
}: Props) => {
  const [turnOffSelected, setTurnOffSelected] = useState(true);
  const [selectedLanguage, setSelectedLanguage] =
    useState<Nullable<SelectOption<string>>>(null);
  const [selectedVoice, setSelectedVoice] =
    useState<Nullable<SelectOption<string>>>(null);
  const [languagesUrl, setLanguagesUrl] = useState('');

  useEffect(() => {
    if (selectedLanguage) {
      setLanguagesUrl(`/v1/cat_mh/languages/${selectedLanguage.value}/voices`);
    }
  }, [selectedLanguage]);

  const { formatMessage } = useIntl();

  const saveSettings = () => {
    if (turnOffSelected) onNarratorVoiceDisable();
    if (selectedLanguage && selectedVoice && !turnOffSelected) {
      selectModalVoiceAndLanguage(selectedLanguage.value, selectedVoice.value);
    }
  };

  const voicePreviewValidation = () =>
    selectedVoice && selectedVoice.value !== null;

  return (
    <Modal
      visible
      title={formatMessage(messages.narratorVoiceConflict)}
      maxWidth={500}
    >
      <Text>
        {formatMessage(messages.narratorConflictDescription, { languageName })}
      </Text>
      <Box my={20}>
        <Radio
          checked={turnOffSelected}
          id="turn-off-narration"
          onChange={() => setTurnOffSelected(true)}
        >
          {formatMessage(messages.turnOffNarrator)}
        </Radio>
      </Box>
      <Radio
        checked={!turnOffSelected}
        id="change-narrator-language"
        onChange={() => setTurnOffSelected(false)}
      >
        {formatMessage(messages.changeNarratorLanguage)}
      </Radio>
      <Box my={30} display="flex" justify="between" align="center">
        {wrapWithLabel(
          formatMessage(messages.language),
          // @ts-ignore
          <ApiSelect
            url="/v1/cat_mh/languages"
            dataParser={(data: any) => jsonApiToArray(data, 'language')}
            selectProps={{
              onChange: setSelectedLanguage,
              value: selectedLanguage,
              isDisabled: turnOffSelected,
            }}
            optionsFormatter={({ id, name }: any) => ({
              value: id,
              label: name,
            })}
          />,
        )}
        {wrapWithLabel(
          formatMessage(messages.narratorVoiceType),
          // @ts-ignore
          <ApiSelect
            url={languagesUrl}
            dataParser={voiceDataParser}
            selectProps={{
              onChange: setSelectedVoice,
              value: selectedVoice,
              isDisabled: !languagesUrl || turnOffSelected,
            }}
            optionsFormatter={voiceByGoogleLanguageIdSelectFormatter}
          />,
        )}
        {wrapWithLabel(
          formatMessage(messages.testNarratorVoice),
          <TextVoicePreviewInput
            boxPx={0}
            boxPy={0}
            placeholder={formatMessage(messages.tryVoice)}
            phoneticPreviewParams={{
              google_tts_voice_id: selectedVoice?.value,
            }}
            previewValidation={voicePreviewValidation}
            previewButtonInsideInput
            disabled={turnOffSelected}
          />,
        )}
      </Box>
      <Box display="flex" justify="end">
        <Button
          // @ts-ignore
          width="auto"
          onClick={saveSettings}
          title={formatMessage(messages.saveChanges)}
          px={30}
        />
      </Box>
    </Modal>
  );
};

export default NarratorConflictModal;
