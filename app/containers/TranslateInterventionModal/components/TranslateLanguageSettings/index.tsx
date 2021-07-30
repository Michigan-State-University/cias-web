/**
 *
 * TranslateLanguageSettings
 *
 */

import React, { useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { themeColors } from 'theme';
import H2 from 'components/H2';
import Row from 'components/Row';
import Column from 'components/Column';
import PopularOptionsSelect from 'components/Select/PopularOptionsSelect';
import { LanguageSelectOption } from 'utils/formatters';

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

  const handleSourceLanguageChange = (
    newSourceLanguage: Nullable<LanguageSelectOption>,
  ) => {
    onSourceLanguageChange(newSourceLanguage);
    if (
      newSourceLanguage?.googleLanguageId ===
      destinationLanguage?.googleLanguageId
    ) {
      onDestinationLanguageChange(null);
    }
  };

  return (
    <>
      <Row align="end">
        <Column>
          <FormattedMessage {...messages.sourceLanguage} />
          <PopularOptionsSelect
            mt={5}
            selectProps={{
              options: sourceLanguageOptions,
              value: sourceLanguage,
              onChange: handleSourceLanguageChange,
              placeholder: formatMessage(messages.searchLanguage),
            }}
            popularOptionsValues={['en', 'es', 'zh', 'fr']}
          />
        </Column>
        <Column mx={15} height={45} width="auto" justify="center">
          <H2 color={themeColors.primary}>-</H2>
        </Column>
        <Column>
          <FormattedMessage {...messages.destinationLanguage} />
          <PopularOptionsSelect
            mt={5}
            selectProps={{
              options: destinationLanguageOptions,
              value: destinationLanguage,
              onChange: onDestinationLanguageChange,
              placeholder: formatMessage(messages.searchLanguage),
            }}
            popularOptionsValues={['en', 'es', 'zh', 'fr']}
          />
        </Column>
      </Row>
    </>
  );
};

export default TranslateLanguageSettings;
