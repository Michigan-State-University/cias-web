/**
 *
 * TranslateLanguageSettings
 *
 */

import React, { useMemo, useCallback } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { themeColors } from 'theme';

import { LanguageSelectOption } from 'utils/formatters';

import H2 from 'components/H2';
import Row from 'components/Row';
import Column from 'components/Column';
import PopularOptionsSelect from 'components/Select/PopularOptionsSelect';
import Text from 'components/Text';

import {
  DESTINATION_LANGUAGE_LABEL_ID,
  SOURCE_LANGUAGE_LABEL_ID,
} from '../../constants';
import messages from './messages';

type Props = {
  languageOptions: LanguageSelectOption[];
  sourceLanguage: Nullable<LanguageSelectOption>;
  onSourceLanguageChange: (
    sourceLanguage: Nullable<LanguageSelectOption>,
  ) => void;
  destinationLanguage: Nullable<LanguageSelectOption>;
  onDestinationLanguageChange: (
    destinationLanguage: Nullable<LanguageSelectOption>,
  ) => void;
};

const TranslateLanguageSettings = ({
  languageOptions: sourceLanguageOptions,
  sourceLanguage,
  onSourceLanguageChange,
  destinationLanguage,
  onDestinationLanguageChange,
}: Props): JSX.Element => {
  const { formatMessage } = useIntl();

  const destinationLanguageOptions = useMemo(
    () =>
      sourceLanguage
        ? sourceLanguageOptions.filter(
            (language) =>
              language.googleLanguageId !== sourceLanguage.googleLanguageId,
          )
        : sourceLanguageOptions,
    [sourceLanguageOptions, sourceLanguage],
  );

  const handleSourceLanguageChange = useCallback(
    (newSourceLanguage: unknown) => {
      const selectedLanguage =
        newSourceLanguage as Nullable<LanguageSelectOption>;
      onSourceLanguageChange(selectedLanguage);
      if (
        selectedLanguage?.googleLanguageId ===
        destinationLanguage?.googleLanguageId
      ) {
        onDestinationLanguageChange(null);
      }
    },
    [onSourceLanguageChange, destinationLanguage, onDestinationLanguageChange],
  );

  const handleDestinationLanguageChange = useCallback(
    (newValue: unknown) => {
      onDestinationLanguageChange(newValue as Nullable<LanguageSelectOption>);
    },
    [onDestinationLanguageChange],
  );

  return (
    <Row align="end">
      <Column>
        <Text id={SOURCE_LANGUAGE_LABEL_ID}>
          <FormattedMessage {...messages.sourceLanguage} />
        </Text>
        <PopularOptionsSelect
          mt={5}
          selectProps={{
            options: sourceLanguageOptions,
            value: sourceLanguage,
            onChange: handleSourceLanguageChange,
            placeholder: formatMessage(messages.searchLanguage),
            'aria-labelledby': SOURCE_LANGUAGE_LABEL_ID,
          }}
          popularOptionsValues={['en', 'es', 'zh', 'fr']}
        />
      </Column>
      <Column mx={15} height={45} width="auto" justify="center">
        <H2 color={themeColors.primary}>-</H2>
      </Column>
      <Column>
        <Text id={DESTINATION_LANGUAGE_LABEL_ID}>
          <FormattedMessage {...messages.destinationLanguage} />
        </Text>
        <PopularOptionsSelect
          mt={5}
          selectProps={{
            options: destinationLanguageOptions,
            value: destinationLanguage,
            onChange: handleDestinationLanguageChange,
            placeholder: formatMessage(messages.searchLanguage),
            'aria-labelledby': DESTINATION_LANGUAGE_LABEL_ID,
          }}
          popularOptionsValues={['en', 'es', 'zh', 'fr']}
        />
      </Column>
    </Row>
  );
};

export default TranslateLanguageSettings;
