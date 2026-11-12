import React, { FC, useMemo } from 'react';
import { useIntl } from 'react-intl';

import { colors, themeColors } from 'theme';

import player from 'assets/svg/player.svg';
import binNoBg from 'assets/svg/bin-no-bg.svg';

import { SmsCampaignLink, SmsCampaignLinkType } from 'models/SmsCampaign';

import {
  NonGsm7Character,
  SmsBodyLength,
  findNonGsm7Characters,
  replaceWithGsm7Equivalents,
} from 'utils/smsBodyLength';

import SmsLinkModal from 'containers/SmsLinkModal';
import settingsMessages from 'containers/Sessions/containers/TextMessagesPage/containers/TextMessageSettings/messages';

import Badge from 'components/Badge';
import Column from 'components/Column';
import Img from 'components/Img';
import Row from 'components/Row';
import Text, { EllipsisText } from 'components/Text';
import TextArea from 'components/Input/TextArea';
import { TextButton } from 'components/Button';

import messages from './messages';
import { WarningPanel } from './WarningPanel';
import { TEXT_BUTTON_PROPS } from './constants';

export type Props = {
  label: string;
  body: string;
  onBodyChange: (body: string) => void;
  links: SmsCampaignLink[];
  onLinksChange: (links: SmsCampaignLink[]) => void;
  counter: SmsBodyLength;
  maxLength: number;
  disabled?: boolean;
  dataCyPrefix: string;
};

export const SmsCampaignBodyField: FC<Props> = ({
  label,
  body,
  onBodyChange,
  links,
  onLinksChange,
  counter,
  maxLength,
  disabled,
  dataCyPrefix,
}) => {
  const { formatMessage } = useIntl();

  const handleAddLink = (linkType: string, url: string, variable: string) => {
    if (!variable || !url) return;
    if (links.some((link) => link.variable === variable)) return;

    onLinksChange([
      ...links,
      { url, variable, linkType: linkType as SmsCampaignLinkType },
    ]);

    if (!body.includes(`::${variable}::`)) {
      onBodyChange(`${body}::${variable}::`);
    }
  };

  const handleRemoveLink = (variable: string) => {
    onLinksChange(links.filter((link) => link.variable !== variable));
    onBodyChange(body.split(`::${variable}::`).join(''));
  };

  const nonGsm7Characters = useMemo(() => findNonGsm7Characters(body), [body]);
  // Naming the rest would turn a message written in Arabic or Polish into a
  // wall of chips for its own alphabet.
  const fixableCharacters = nonGsm7Characters.filter(
    ({ replacement }) => replacement !== null,
  );
  const hasFixableCharacters = !!fixableCharacters.length;
  const hasUnfixableNonGsm7 =
    fixableCharacters.length < nonGsm7Characters.length;

  // Nobody can spot a non-breaking space in a textarea, so what it is replaced
  // with is what names it.
  const characterLabel = ({ character, replacement }: NonGsm7Character) => {
    if (character === '\t')
      return formatMessage(messages.smsCampaignNonGsm7TabLabel);
    if (replacement === ' ' || replacement === '\n')
      return formatMessage(messages.smsCampaignNonGsm7SpaceLabel);
    if (replacement === '')
      return formatMessage(messages.smsCampaignNonGsm7ZeroWidthLabel);
    return character;
  };

  const counterExceeded = counter.lengthExceeded || counter.segmentsExceeded;

  return (
    <Column gap={8}>
      <Row justify="between" align="center">
        <Text fontWeight="bold">{label}</Text>
        <SmsLinkModal
          disabled={!!disabled}
          placement="right"
          onClick={handleAddLink}
          dropdownWidth="260px"
        >
          <Text
            fontWeight="bold"
            color={themeColors.secondary}
            data-cy={`${dataCyPrefix}-add-link`}
          >
            {formatMessage(settingsMessages.addLinkButton)}
          </Text>
        </SmsLinkModal>
      </Row>

      <TextArea
        value={body}
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
          onBodyChange(event.target.value)
        }
        placeholder={formatMessage(messages.smsCampaignBodyPlaceholder)}
        rows={6}
        width="100%"
        disabled={disabled}
        data-cy={`${dataCyPrefix}-body`}
        aria-label={label}
      />

      <Row justify="between" align="center">
        <Text fontSize={12} color={colors.manatee}>
          {formatMessage(messages.smsCampaignPersonalLinkHint)}
        </Text>
        <Text
          fontSize={12}
          color={counterExceeded ? themeColors.warning : colors.manatee}
          data-cy={`${dataCyPrefix}-counter`}
        >
          {formatMessage(messages.smsCampaignCounter, {
            length: counter.length,
            maxLength,
            segments: counter.segments,
            encoding: counter.encoding,
          })}
        </Text>
      </Row>

      {!!nonGsm7Characters.length && (
        <WarningPanel
          header={formatMessage(messages.smsCampaignNonGsm7WarningHeader)}
          dataCy={`${dataCyPrefix}-non-gsm7`}
        >
          <Text fontSize={13} lineHeight={1.4}>
            {formatMessage(messages.smsCampaignNonGsm7Warning)}
          </Text>
          {hasFixableCharacters && (
            <>
              <Text fontSize={13} lineHeight={1.4}>
                {formatMessage(messages.smsCampaignNonGsm7FixableHint)}
              </Text>
              <Row gap={6} flexWrap="wrap">
                {fixableCharacters.map((nonGsm7Character) => (
                  <Badge
                    key={nonGsm7Character.character}
                    bg={colors.white}
                    color={themeColors.warning}
                  >
                    <Text color={themeColors.warning} fontWeight="bold">
                      {characterLabel(nonGsm7Character)}
                    </Text>
                  </Badge>
                ))}
              </Row>
            </>
          )}

          {hasUnfixableNonGsm7 && (
            <Text
              fontSize={13}
              lineHeight={1.4}
              data-cy={`${dataCyPrefix}-non-gsm7-no-fix`}
            >
              {formatMessage(messages.smsCampaignNonGsm7NoFixHint)}
            </Text>
          )}

          {hasFixableCharacters && (
            // In a row the button sizes to its label; in the column it would
            // stretch the full width and centre the text.
            <Row>
              <TextButton
                buttonProps={{
                  ...TEXT_BUTTON_PROPS,
                  'data-cy': `${dataCyPrefix}-non-gsm7-fix`,
                }}
                onClick={() => onBodyChange(replaceWithGsm7Equivalents(body))}
                disabled={disabled}
              >
                {formatMessage(messages.smsCampaignNonGsm7FixButton)}
              </TextButton>
            </Row>
          )}
        </WarningPanel>
      )}

      {!!links.length && (
        <Column gap={4} data-cy={`${dataCyPrefix}-links`}>
          {links.map(({ url, variable, linkType }) => (
            <Row
              key={variable}
              justify="between"
              align="center"
              borderTop="1px solid"
              borderColor={colors.grey}
              py={4}
            >
              <Row align="center" gap={5}>
                {linkType === SmsCampaignLinkType.VIDEO && <Img src={player} />}
                <EllipsisText width={240} text={url} fontSize={13} />
              </Row>
              <Row align="center" gap={8}>
                <Badge color={colors.jungleGreen} bgWithOpacity>
                  <Text color={colors.jungleGreen}>{`::${variable}::`}</Text>
                </Badge>
                <TextButton
                  buttonProps={{
                    ...TEXT_BUTTON_PROPS,
                    'data-cy': `${dataCyPrefix}-remove-link-${variable}`,
                  }}
                  onClick={() => handleRemoveLink(variable)}
                  disabled={disabled}
                >
                  <Img src={binNoBg} alt="" />
                </TextButton>
              </Row>
            </Row>
          ))}
        </Column>
      )}
    </Column>
  );
};
