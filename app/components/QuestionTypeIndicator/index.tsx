import React, { memo } from 'react';
import { useIntl } from 'react-intl';

import { QuestionTypes } from 'models/Session/QuestionTypes';
import { QuestionTypes as QuestionTypesEnum } from 'models/Question';
import questionTypesMessages from 'global/i18n/questionTypesMessages';

import { colors } from 'theme';
import StyledCircle from 'components/Circle/StyledCircle';
import Text from 'components/Text';
import Row from 'components/Row';

type Props = {
  type: QuestionTypesEnum;
  text?: string;
  iconSize: string;
  fontSize: number;
  fontWeight: string;
} & Record<string, unknown>; // Extend Record type until css props are typed

const QuestionTypeIndicator = ({
  type,
  text,
  iconSize,
  fontSize,
  fontWeight,
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
        fontWeight={fontWeight}
        color={colors.manatee}
        whiteSpace="nowrap"
      >
        {text ?? formatMessage(questionTypesMessages[type])}
      </Text>
    </Row>
  );
};

export default memo(QuestionTypeIndicator);
