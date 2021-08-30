import React from 'react';
import { useIntl } from 'react-intl';
import { Markup } from 'interweave';

import { Question } from 'global/types/question';

import { colors } from 'theme';
import Text from 'components/Text';
import Comment from 'components/Text/Comment';
import Row from 'components/Row';
import Column from 'components/Column';

import messages from './messages';
import Formula from './Formula';
import CaseMatch from './CaseMatch';

type Props = {
  question: Question;
};

const FeedbackFormulaAndCases = ({
  question: { body },
}: Props): JSX.Element => {
  const { formatMessage } = useIntl();
  const { spectrum } = body.data[0];

  const getCaseTargetElementId = (index: number): string =>
    `session-map-question-details-feedback-target-${index}`;

  return (
    <>
      <Comment mt={30} mb={15} fontWeight="bold">
        {formatMessage(messages.feedbackFormulaAndCases)}
      </Comment>
      <Formula payload={spectrum?.payload} />
      <Row>
        <Column width="auto">
          {spectrum?.patterns?.map(({ match }, index) => (
            <CaseMatch
              match={match}
              caseTargetElementId={getCaseTargetElementId(index)}
              key={`session-map-question-details-feedback-match-${index}`}
            />
          ))}
        </Column>
        <Column>
          {spectrum?.patterns?.map(({ target }, index) => (
            <Text
              color={colors.manatee}
              fontWeight="bold"
              key={getCaseTargetElementId(index)}
              id={getCaseTargetElementId(index)}
              mt={15}
            >
              <Markup
                content={formatMessage(messages.endUserValueIs, {
                  endUserValue: `<span style='color: ${colors.jungleGreen};'>${target}</span>`,
                })}
                noWrap
              />
            </Text>
          ))}
        </Column>
      </Row>
    </>
  );
};

export default FeedbackFormulaAndCases;

// <Column>
//   <Text color={colors.manatee} fontWeight="bold">
//     <Markup
//       content={formatMessage(messages.endUserValueIs, {
//         endUserValue: `<span style='color: ${colors.jungleGreen};'>${target}</span>`,
//       })}
//       noWrap
//     />
//   </Text>
// </Column>
