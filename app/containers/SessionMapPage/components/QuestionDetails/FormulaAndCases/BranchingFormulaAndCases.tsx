import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { Markup } from 'interweave';

import { QuestionDTO, QuestionFormulaTargetType } from 'models/Question';
import { Session, SessionTargetType } from 'models/Session';
import { Target } from 'models/Formula';

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

type Props = {
  question: QuestionDTO;
  sessions: Session[];
  questions: QuestionDTO[];
};

const BranchingFormulaAndCases = ({
  question: { id, formulas },
  sessions,
  questions,
}: Props): JSX.Element => {
  const { formatMessage } = useIntl();

  const getCaseSubtargetElementId = useCallback(
    (targetIndex: number, subtargetIndex: number): string =>
      `session-map-question-details-branching-subtarget-${id}-${targetIndex}-${subtargetIndex}`,
    [id],
  );

  const getCaseTargetElementId = useCallback(
    (targetIndex: number): string =>
      `session-map-question-details-branching-target-${id}-${targetIndex}`,
    [id],
  );

  const getCaseMatchElementId = useCallback(
    (matchIndex: number): string =>
      `session-map-question-details-branching-match-${id}-${matchIndex}`,
    [id],
  );

  const renderSubtargets = (
    subtargets: Target<QuestionFormulaTargetType>[],
    targetIndex: number,
  ): JSX.Element[] =>
    subtargets.map(({ id: targetId, probability, type }, subtargetIndex) => {
      const subtargetName =
        type === SessionTargetType.SESSION
          ? sessions.find(({ id: sessionId }) => sessionId === targetId)?.name
          : questions.find(({ id: questionId }) => questionId === targetId)
              ?.subtitle;

      const displayedName = isNullOrUndefined(subtargetName)
        ? ''
        : `"${htmlToPlainText(subtargetName)}"`;

      return (
        <Text
          color={colors.manatee}
          fontWeight="bold"
          key={getCaseSubtargetElementId(targetIndex, subtargetIndex)}
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
      <Column gap={15}>
        {formulas.map((formula, formulaIndex) => (
          <Column key={`${formula.payload}-${formulaIndex}`}>
            <Formula payload={formula.payload} />
            <Row>
              <Column width="auto">
                {formula.patterns.map(({ match }, index) => (
                  <CaseMatch
                    match={match}
                    key={getCaseMatchElementId(index)}
                    caseTargetElementId={getCaseTargetElementId(index)}
                  />
                ))}
              </Column>
              <Column>
                {formula.patterns.map(({ target }, index) => (
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
          </Column>
        ))}
      </Column>
    </>
  );
};

export default BranchingFormulaAndCases;
