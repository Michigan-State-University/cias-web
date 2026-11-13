import React, { FC, ReactNode } from 'react';

import { SmsCampaignLink, SmsCampaignLinkType } from 'models/SmsCampaign';

import { colors } from 'theme';

import player from 'assets/svg/player.svg';

import Badge from 'components/Badge';
import Img from 'components/Img';
import Row from 'components/Row';
import Text, { EllipsisText } from 'components/Text';

export type Props = {
  link: SmsCampaignLink;
  action?: ReactNode;
};

export const SmsCampaignLinkRow: FC<Props> = ({
  link: { url, variable, linkType },
  action,
}) => (
  <Row
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
      {action}
    </Row>
  </Row>
);
