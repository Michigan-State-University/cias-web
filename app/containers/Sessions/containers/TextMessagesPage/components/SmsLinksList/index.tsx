import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import { colors } from 'theme';

import player from 'assets/svg/player.svg';
import { htmlToPlainText } from 'utils/htmlToPlainText';
import useGet from 'utils/useGet';

import Column from 'components/Column';
import Text, { EllipsisText } from 'components/Text';
import Box from 'components/Box';
import Row from 'components/Row';
import Badge from 'components/Badge';
import Img from 'components/Img';

import { LinksRendered, SmsLinksApiResponse } from 'models/SmsLink';

import messages from '../NoFormulaMessages/messages';

interface Props {
  smsPlanId: string;
  availableSmsLinks: any[];
}

export const SmsLinksList = ({ smsPlanId, availableSmsLinks }: Props) => {
  const { formatMessage } = useIntl();

  const apiUrl = useMemo(
    () => `v1/sms_links?sms_link[sms_plan_id]=${smsPlanId}`,
    [smsPlanId],
  );

  const state = useGet<SmsLinksApiResponse, SmsLinksApiResponse>(
    apiUrl,
    (d) => d,
    false,
    [availableSmsLinks],
  );

  const smsLinks = useMemo(() => {
    const { data } = state;
    if (!data) return null;
    const links: LinksRendered[] = [];
    data.data.forEach(({ attributes: { url, link_type, variable } }) =>
      links.push({
        url,
        variable,
        linkType: link_type,
      }),
    );
    return links;
  }, [state.data, availableSmsLinks]);

  if (!smsLinks || smsLinks.length === 0) return null;

  const lastIndex = smsLinks.length - 1;

  return (
    <Box>
      <Box mb={15}>
        <Text>{formatMessage(messages.linksListLabel)}</Text>
      </Box>
      <Column>
        {smsLinks.map((smsLink, index) => (
          <Row
            margin={0}
            justify="between"
            align="center"
            borderTop="1px solid"
            borderBottom={`${index === lastIndex ? '1px solid' : ''}`}
            borderColor={colors.grey}
            mb={index === lastIndex ? 15 : 0}
          >
            <Row align="center" justify="between" margin={5}>
              {smsLink.linkType === 'video' && <Img src={player} mr={5} />}
              <Link to={{ pathname: smsLink.url }} target="_blank">
                <EllipsisText width={200} text={htmlToPlainText(smsLink.url)} />
              </Link>
            </Row>
            <Badge
              minWidth={55}
              color={colors.jungleGreen}
              bgWithOpacity
              margin={5}
            >
              <Text color={colors.jungleGreen}>
                {`::${smsLink.variable}::`}
              </Text>
            </Badge>
          </Row>
        ))}
      </Column>
    </Box>
  );
};
