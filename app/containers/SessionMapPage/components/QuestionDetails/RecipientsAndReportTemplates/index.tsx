import React, { FC } from 'react';
import { useIntl } from 'react-intl';

import { ThirdPartyReportQuestionDTO } from 'models/Question';
import { ReportTemplate } from 'models/ReportTemplate';

import Comment from 'components/Text/Comment';

import { ChipsContainer } from '../styled';
import { formatThirdPartyReportRecipientsData } from './utils';
import RecipientAndReportTemplateChip from './RecipientAndReportTemplateChip';
import messages from './messages';

type Props = {
  question: ThirdPartyReportQuestionDTO;
  reportTemplates: ReportTemplate[];
};

export const RecipientsAndReportTemplates: FC<Props> = ({
  question,
  reportTemplates,
}) => {
  const { formatMessage } = useIntl();

  const recipientsData = formatThirdPartyReportRecipientsData(
    question.body.data,
  );

  return (
    <>
      <Comment mt={30} mb={15} fontWeight="bold">
        {formatMessage(messages.recipientsAndReportTemplates)}
      </Comment>
      <ChipsContainer>
        {Array.from(recipientsData).flatMap(([recipient, templatesIds]) => {
          if (templatesIds.size === 0) {
            return (
              <RecipientAndReportTemplateChip
                key={`session-map-recipients-${recipient}`}
                recipient={recipient}
              />
            );
          }
          return Array.from(templatesIds).map((templateId) => (
            <RecipientAndReportTemplateChip
              key={`session-map-recipients-${recipient}-${templateId}`}
              recipient={recipient}
              template={
                reportTemplates.find(({ id }) => id === templateId)?.name ??
                templateId
              }
            />
          ));
        })}
      </ChipsContainer>
    </>
  );
};
