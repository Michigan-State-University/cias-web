import React, { ReactNode } from 'react';
import { useIntl } from 'react-intl';
import dayjs from 'dayjs';

import { colors } from 'theme';

import { CustomDayjsLocale } from 'utils/dayjs';

import Column from 'components/Column';
import Text, { EllipsisText } from 'components/Text';

import { LabelRow, SingleNotificationLayoutContainer } from './styled';
import {
  REGULAR_TEXT_OPACITY,
  HIGHLIGHTED_TEXT_OPACITY,
  ICON_WIDTH,
} from './constants';
import messages from './messages';

export type Props = {
  id: string;
  active: boolean; // darker background
  highlighted?: boolean; // bolder text and red line on the right
  archived?: boolean; // "Archived" text displayed instead of time
  time: string;
  timeFormatLocale: CustomDayjsLocale;
  icon: ReactNode;
  title: string;
  content: string;
  isHtmlContent?: boolean;
  onClick?: HTMLDivElement['onclick'];
};

const SingleNotificationBaseLayout = ({
  id,
  active,
  highlighted,
  archived,
  time,
  timeFormatLocale,
  icon,
  title,
  content,
  isHtmlContent,
  onClick,
}: Props) => {
  const { formatMessage } = useIntl();

  const textOpacity = highlighted
    ? HIGHLIGHTED_TEXT_OPACITY
    : REGULAR_TEXT_OPACITY;

  return (
    <SingleNotificationLayoutContainer active={active} onClick={onClick}>
      <Column flexShrink={0} width={ICON_WIDTH} justify="center">
        {icon}
      </Column>
      <Column flex={1} gap={12} minWidth="0">
        <LabelRow justify="between" gap={8}>
          <EllipsisText
            fontWeight="bold"
            fontSize={14}
            color={colors.bluewood}
            textOpacity={textOpacity}
            text={title}
            id={`${id}-title`}
          />
          <Column flexShrink={0} width="auto">
            {!archived && (
              <Text
                fontWeight="bold"
                fontSize={12}
                color={colors.bluewood}
                textOpacity={textOpacity}
              >
                {dayjs(time).locale(timeFormatLocale).fromNow(true)}
              </Text>
            )}
            {archived && (
              <Text fontWeight="medium" fontSize={12} color={colors.vermilion}>
                {formatMessage(messages.archived)}
              </Text>
            )}
          </Column>
        </LabelRow>
        <LabelRow>
          <EllipsisText
            fontWeight={highlighted ? 'bold' : 'regular'}
            fontSize={12}
            color={colors.bluewood}
            textOpacity={textOpacity}
            text={content}
            id={`${id}-content`}
            isHtml={isHtmlContent}
          />
        </LabelRow>
      </Column>
      <Column
        flexShrink={0}
        width={2}
        background={highlighted ? colors.vermilion : 'inherit'}
      />
    </SingleNotificationLayoutContainer>
  );
};

export default SingleNotificationBaseLayout;
