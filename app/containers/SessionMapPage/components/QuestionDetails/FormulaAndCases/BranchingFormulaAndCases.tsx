import React from 'react';
import { useIntl } from 'react-intl';
import { Markup } from 'interweave';

import { FormulaPatternTarget, Question } from 'global/types/question';
import { htmlToPlainText } from 'utils/htmlToPlainText';
import isNullOrUndefined from 'utils/isNullOrUndefined';

import { colors } from 'theme';
import Text from 'components/Text';
import Comment from 'components/Text/Comment';
import Row from 'components/Row';
import Column from 'components/Column';
import Box from 'components/Box';

import messages from './messages';
import Formula from './Formula';
import CaseMatch from './CaseMatch';
import { highlightTargetText } from './utils';

const getCaseTargetElementId = (index: number): string =>
  `session-map-question-details-branching-target-${index}`;

type Props = {
  question: Question;
  sessions: any[];
  questions: Question[];
};

const BranchingFormulaAndCases = ({
  question: { formula },
  sessions,
  questions,
}: Props): JSX.Element => {
  const { formatMessage } = useIntl();

  const renderSubtargets = (
    subtargets: FormulaPatternTarget[],
    targetIndex: number,
  ): JSX.Element[] =>
    subtargets.map(({ id, probability, type }, subtargetIndex) => {
      const subtargetName =
        type === 'Session'
          ? sessions.find(({ id: sessionId }) => sessionId === id)?.name
          : questions.find(({ id: questionId }) => questionId === id)?.subtitle;

      const displayedName = isNullOrUndefined(subtargetName)
        ? ''
        : `"${htmlToPlainText(subtargetName)}"`;

      return (
        <Text
          color={colors.manatee}
          fontWeight="bold"
          key={`session-map-question-details-branching-target-${targetIndex}-${subtargetIndex}`}
          mt={subtargetIndex !== 0 ? 15 : 0}
        >
          <Markup
            content={formatMessage(messages.goTo, {
              probability: highlightTargetText(`${probability}%`),
              subtarget: highlightTargetText(displayedName),
            })}
            noWrap
          />
        </Text>
      );
    });

  return (
    <>
      <Comment mt={30} mb={15} fontWeight="bold">
        {formatMessage(messages.branchingFormulaAndCases)}
      </Comment>
      <Formula payload={formula.payload} />
      <Row>
        <Column width="auto">
          {formula?.patterns?.map(({ match }, index) => (
            <CaseMatch
              match={match}
              caseTargetElementId={getCaseTargetElementId(index)}
              key={`session-map-question-details-branching-match-${index}`}
            />
          ))}
        </Column>
        <Column>
          {formula?.patterns?.map(({ target }, index) => (
            <Box
              key={getCaseTargetElementId(index)}
              id={getCaseTargetElementId(index)}
              mt={15}
            >
              {renderSubtargets(target, index)}
            </Box>
          ))}
        </Column>
      </Row>
    </>
  );
};

export default BranchingFormulaAndCases;
