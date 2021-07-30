/**
 *
 * TranslateInterventionModal
 *
 */

import React, { useEffect, useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { fontSizes, themeColors } from 'theme';
import H1 from 'components/H1';
import H2 from 'components/H2';
import Text from 'components/Text';
import Comment from 'components/Text/Comment';
import Row from 'components/Row';
import { StyledButton } from 'components/Button/StyledButton';
import Loader from 'components/Loader';
import ErrorAlert from 'components/ErrorAlert';
import useGet from 'utils/useGet';
import { jsonApiToArray } from 'utils/jsonApiMapper';
import {
  languageSelectOptionFormatter,
  Language,
  LanguageSelectOption,
  VoiceSelectOption,
} from 'utils/formatters';

import TranslateLanguageSettings from './components/TranslateLanguageSettings';
import TranslateVoiceSettings from './components/TranslateVoiceSettings';
import messages from './messages';

type Props = {
  name: string;
  googleLanguageId: number;
};

const TranslateInterventionModal = ({
  name,
  googleLanguageId,
}: Props): JSX.Element => {
  const [sourceLanguage, setSourceLanguage] =
    useState<Nullable<LanguageSelectOption>>(null);
  const [destinationLanguage, setDestinationLanguage] =
    useState<Nullable<LanguageSelectOption>>(null);
  const [voice, setVoice] = useState<Nullable<VoiceSelectOption>>(null);

  const { data, isFetching, error } = useGet<{ data: [] }, Language[]>(
    '/v1/google/languages',
    (fetchedData) => jsonApiToArray(fetchedData, 'supportedLanguage'),
  );

  const languageOptions = useMemo(
    () => data?.map(languageSelectOptionFormatter) ?? [],
    [data],
  );

  useEffect(() => {
    const matchedSourceLanguage = languageOptions.find(
      (language) => language.googleLanguageId === `${googleLanguageId}`,
    );
    setSourceLanguage(matchedSourceLanguage ?? null);
  }, [googleLanguageId, languageOptions]);

  if (isFetching) {
    // @ts-ignore
    return <Loader />;
  }

  return (
    <>
      <H2 mb={10} color={themeColors.primary}>
        {name}
      </H2>
      <H1 mb={20}>
        <FormattedMessage {...messages.title} />
      </H1>
      <Text mb={50} fontSize={fontSizes.regular}>
        <FormattedMessage {...messages.subtitle} />
      </Text>
      <H2 mb={10}>
        <FormattedMessage {...messages.translationSettings} />
      </H2>
      <Comment mb={20}>
        <FormattedMessage {...messages.translationSettingsComment} />
      </Comment>
      {error ? (
        // @ts-ignore
        <ErrorAlert errorText={error} />
      ) : (
        <TranslateLanguageSettings
          languageOptions={languageOptions}
          sourceLanguage={sourceLanguage}
          onSourceLanguageChange={setSourceLanguage}
          destinationLanguage={destinationLanguage}
          onDestinationLanguageChange={setDestinationLanguage}
        />
      )}
      {destinationLanguage && (
        <>
          <H2 mt={50} mb={10}>
            <FormattedMessage {...messages.voiceSettings} />
          </H2>
          <Comment mb={20}>
            <FormattedMessage {...messages.voiceSettingsComment} />
          </Comment>
          <TranslateVoiceSettings
            googleLanguageId={destinationLanguage.googleLanguageId}
            voice={voice}
            onVoiceChange={setVoice}
          />
        </>
      )}
      <Row mt={50}>
        <Comment width="100%">
          <FormattedMessage {...messages.costsComment} />
        </Comment>
        <StyledButton ml={20} width={200}>
          <FormattedMessage {...messages.translate} />
        </StyledButton>
      </Row>
    </>
  );
};

export default TranslateInterventionModal;
