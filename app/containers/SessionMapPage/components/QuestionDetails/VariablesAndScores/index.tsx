import React from 'react';
import { useIntl } from 'react-intl';

import {
  GridQuestionPayload,
  Question,
  QuestionBody,
  SliderQuestionPayload,
} from 'global/types/question';
import { ReportTemplate } from 'global/types/reportTemplate';
import { QuestionTypes } from 'models/Question/QuestionDto';

import Comment from 'components/Text/Comment';

import messages from './messages';
import { formatThirdPartyReportQuestionData } from './utils';
import { ChipsContainer } from './styled';
import VariableAndScoreChip from './VariableAndScoreChip';
import EmailAndReportTemplateChip from './EmailAndReportTemplateChip';
import Column from '../../../../../components/Column';

type Props = {
  question: Question;
  reportTemplates: ReportTemplate[];
};

const VariablesAndScores = ({
  question: { body, type },
  reportTemplates,
}: Props): JSX.Element => {
  const { formatMessage } = useIntl();

  const renderChipsByQuestionType = (): JSX.Element[] | JSX.Element => {
    switch (type) {
      case QuestionTypes.FREE_RESPONSE:
      case QuestionTypes.DATE:
      case QuestionTypes.NAME:
      case QuestionTypes.CURRENCY:
      case QuestionTypes.NUMBER:
      case QuestionTypes.EXTERNAL_LINK:
      case QuestionTypes.PARTICIPANT_REPORT:
      case QuestionTypes.PHONE:
        const stringQuestionBody = body as QuestionBody<string>;
        return (
          <VariableAndScoreChip
            variable={stringQuestionBody.variable?.name}
            variableOnly
          />
        );
      case QuestionTypes.SINGLE:
        const singleQuestionBody = body as QuestionBody<string>;
        return singleQuestionBody.data.map(({ value }, index) => (
          <VariableAndScoreChip
            variable={singleQuestionBody.variable?.name}
            score={value}
            key={`session-map-question-details-variable-${index}`}
          />
        ));
      case QuestionTypes.SLIDER:
        const sliderQuestionBody = body as QuestionBody<SliderQuestionPayload>;
        return sliderQuestionBody.data.map((_, index) => (
          <VariableAndScoreChip
            variable={sliderQuestionBody.variable?.name}
            score="0 - 100"
            key={`session-map-question-details-variable-${index}`}
          />
        ));
      case QuestionTypes.MULTIPLE:
        const multipleQuestionBody = body as QuestionBody<string>;
        return multipleQuestionBody.data.map(({ variable }, index) => (
          <VariableAndScoreChip
            variable={variable?.name}
            score={variable?.value}
            key={`session-map-question-details-variable-${index}`}
          />
        ));
      case QuestionTypes.GRID:
        const gridQuestionBody = body as QuestionBody<GridQuestionPayload>;
        const { rows, columns } = gridQuestionBody.data[0]
          .payload as GridQuestionPayload;
        return (
          <Column gap={15}>
            {rows.map(({ variable: { name } }, rowIndex) => (
              <ChipsContainer key={`session-map-variables-row-${rowIndex}`}>
                {columns.map(({ variable: { value } }, columnIndex) => (
                  <VariableAndScoreChip
                    variable={name}
                    score={value}
                    key={`session-map-variable-${rowIndex}-${columnIndex}`}
                  />
                ))}
              </ChipsContainer>
            ))}
          </Column>
        );
      case QuestionTypes.THIRD_PARTY:
        const thirdPartyQuestionBody = body as QuestionBody<string>;
        const formattedData = formatThirdPartyReportQuestionData(
          thirdPartyQuestionBody.data,
        );
        return Array.from(formattedData).flatMap(([email, templatesIds]) => {
          if (templatesIds.size === 0) {
            return (
              <EmailAndReportTemplateChip
                key={`session-map-emails-${email}`}
                email={email}
              />
            );
          }
          return Array.from(templatesIds).map((templateId) => (
            <EmailAndReportTemplateChip
              key={`session-map-emails-${email}-${templateId}`}
              email={email}
              template={
                reportTemplates.find(({ id }) => id === templateId)?.name ??
                templateId
              }
            />
          ));
        });
      default:
        return <></>;
    }
  };

  return (
    <>
      <Comment mt={30} mb={15} fontWeight="bold">
        {formatMessage(messages.variablesAndScores)}
      </Comment>
      <ChipsContainer>{renderChipsByQuestionType()}</ChipsContainer>
    </>
  );
};

export default VariablesAndScores;
