import React from 'react';
import { useIntl } from 'react-intl';

import { Question } from 'global/types/question';
import { QuestionTypes } from 'models/Question/QuestionDto';

import Comment from 'components/Text/Comment';

import messages from './messages';
import Formula from './Formula';

type Props = {
  question: Question;
};

const FormulaAndCases = ({
  question: { formula, type },
}: Props): JSX.Element => {
  const { formatMessage } = useIntl();

  if (type === QuestionTypes.FINISH) return <></>;

  return (
    <>
      <Comment mt={30} mb={15} fontWeight="bold">
        {formatMessage(messages.formulaAndCases)}
      </Comment>
      <Formula payload={formula.payload} />
    </>
  );
};

export default FormulaAndCases;
