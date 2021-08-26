import React, { memo } from 'react';
import { useIntl } from 'react-intl';

import { QuestionTypes } from 'models/Session/QuestionTypes';
import globalMessages from 'global/i18n/globalMessages';

import { themeColors } from 'theme';
import StyledCircle from 'components/Circle/StyledCircle';
import Text from 'components/Text';
import Row from 'components/Row';

type Props = {
  type: string;
  iconSize: string;
  fontSize: number;
} & Record<string, unknown>; // Extend Record type until css props are typed

const QuestionTypeIndicator = ({
  type,
  iconSize,
  fontSize,
  ...props
}: Props): JSX.Element => {
  const { formatMessage } = useIntl();

  return (
    <Row align="center" {...props}>
      <StyledCircle
        background={
          QuestionTypes.find(({ id: typeId }) => typeId === type)?.color
        }
        size={iconSize}
      />
      <Text
        fontSize={fontSize}
        fontWeight="medium"
        color={themeColors.comment}
        whiteSpace="nowrap"
      >
        {
          // @ts-ignore
          formatMessage(globalMessages.questionTypes[type])
        }
      </Text>
    </Row>
  );
};

export default memo(QuestionTypeIndicator);
