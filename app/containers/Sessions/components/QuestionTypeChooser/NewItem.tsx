import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import HoverableBox from 'components/Box/HoverableBox';
import Row from 'components/Row';
import Text from 'components/Text';
import Tooltip from 'components/Tooltip';
import { colors } from 'theme';
import questionMark from 'assets/svg/grey-question-mark.svg';

import messages from './messages';
import { DotCircle } from './styled';
import { ConditionalAppearanceConfig } from './types';

type Props = {
  handleClick: () => void;
  title: string;
  color: string;
  isGroup?: boolean;
  conditionalAppearanceConfig?: ConditionalAppearanceConfig;
  questionTypeId?: string;
};

const NewItem = ({
  handleClick,
  title,
  isGroup,
  color,
  conditionalAppearanceConfig = {},
  questionTypeId,
}: Props) => {
  const { formatMessage } = useIntl();

  const { hidden, disabled, disabledMessage } = conditionalAppearanceConfig;

  if (hidden) return null;

  // Generate data-cy attribute from questionTypeId (e.g., "Question::Single" -> "question-type-single")
  const dataCy = questionTypeId
    ? `question-type-${questionTypeId.split('::')[1]?.toLowerCase() || questionTypeId.toLowerCase()}`
    : undefined;

  return (
    <HoverableBox
      onClick={handleClick}
      padding={8}
      disabled={disabled}
      data-cy={dataCy}
    >
      <Row justify="between">
        <Row align="center">
          <DotCircle mr={18} bg={color} opacity={disabled ? 0.5 : 1} />
          <Text fontWeight="medium">{title}</Text>
          {disabled && disabledMessage && (
            <Tooltip
              id={`new-item-disabled-message-${title}`}
              ml={8}
              icon={questionMark}
              text={formatMessage(disabledMessage)}
            />
          )}
        </Row>
        {isGroup && (
          <Text color={colors.surfieGreen}>
            <FormattedMessage {...messages.createsGroup} />
          </Text>
        )}
      </Row>
    </HoverableBox>
  );
};

export default NewItem;
