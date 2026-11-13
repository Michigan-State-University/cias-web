import React, { FC, useMemo } from 'react';
import { useIntl } from 'react-intl';
// @ts-ignore
import styled from 'styled-components';

import { SmsCampaignLink } from 'models/SmsCampaign';

import { tokenizeSmsBody } from 'utils/smsBodyLength';

import { colors, hexToRgb } from 'theme';

import Column from 'components/Column';
import Text from 'components/Text';

import { SmsCampaignLinkRow } from './SmsCampaignLinkRow';
import messages from './messages';

const LinkToken = styled.span`
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 600;
  color: ${colors.jungleGreen};
  background: rgba(${hexToRgb(colors.jungleGreen)}, 0.1);
`;

export type Props = {
  body: string;
  links: SmsCampaignLink[];
  dataCy: string;
};

export const SmsCampaignPreview: FC<Props> = ({ body, links, dataCy }) => {
  const { formatMessage } = useIntl();

  const parts = useMemo(() => tokenizeSmsBody(body, links), [body, links]);

  return (
    <Column gap={8} data-cy={dataCy}>
      <Text fontWeight="bold" fontSize={13}>
        {formatMessage(messages.smsCampaignPreviewHeader)}
      </Text>

      <Text
        fontSize={13}
        lineHeight={1.4}
        whiteSpace="pre-wrap"
        data-cy={`${dataCy}-body`}
      >
        {parts.map(({ text, isToken }, index) =>
          isToken ? (
            // eslint-disable-next-line react/no-array-index-key
            <LinkToken key={index}>{text}</LinkToken>
          ) : (
            // eslint-disable-next-line react/no-array-index-key
            <React.Fragment key={index}>{text}</React.Fragment>
          ),
        )}
      </Text>

      <Text fontSize={12} color={colors.manatee}>
        {formatMessage(messages.smsCampaignPersonalLinkHint)}
      </Text>

      {!!links.length && (
        <Column gap={4} data-cy={`${dataCy}-links`}>
          {links.map((link) => (
            <SmsCampaignLinkRow key={link.variable} link={link} />
          ))}
        </Column>
      )}
    </Column>
  );
};
