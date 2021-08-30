import React from 'react';
import { useIntl } from 'react-intl';

import { Question } from 'global/types/question';

import Comment from 'components/Text/Comment';

import messages from './messages';
import Formula from './Formula';

type Props = {
  question: Question;
};

const BranchingFormulaAndCases = ({
  question: { formula },
}: Props): JSX.Element => {
  const { formatMessage } = useIntl();

  return (
    <>
      <Comment mt={30} mb={15} fontWeight="bold">
        {formatMessage(messages.branchingFormulaAndCases)}
      </Comment>
      <Formula payload={formula.payload} />
    </>
  );
};

export default BranchingFormulaAndCases;
