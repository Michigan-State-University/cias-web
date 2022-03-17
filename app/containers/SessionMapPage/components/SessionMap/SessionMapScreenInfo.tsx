import React, { memo } from 'react';

import { QuestionTypes as QuestionTypesEnum } from 'models/Question';
import { htmlToPlainText } from 'utils/htmlToPlainText';

import QuestionTypeIndicator from 'components/QuestionTypeIndicator';
import EllipsisText from 'components/Text/EllipsisText';

export type SessionMapScreenInfoProps = {
  id: string;
  type: QuestionTypesEnum;
  typeText?: string;
  infoText: string;
};

const Component = ({
  id,
  type,
  typeText,
  infoText,
}: SessionMapScreenInfoProps) => (
  <>
    <QuestionTypeIndicator
      type={type}
      text={typeText}
      iconSize="7px"
      fontSize={10}
      fontWeight="medium"
      mb={9}
      gap={6}
    />
    <EllipsisText
      text={htmlToPlainText(infoText)}
      dataFor={id}
      lines={2}
      fontSize={12}
      fontWeight="bold"
      width={160}
    />
  </>
);

export const SessionMapScreenInfo = memo(Component);
