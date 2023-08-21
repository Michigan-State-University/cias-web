import { ThirdPartyReportQuestionDataDTO } from 'models/Question';

export const formatThirdPartyReportRecipientsData = (
  questionData: ThirdPartyReportQuestionDataDTO[],
): Map<string, Set<string>> => {
  const recipientsData = new Map<string, Set<string>>();

  questionData.forEach(({ value, report_template_ids: reportTemplateIds }) => {
    const recipients = value.split(',');

    if (recipients.length === 0) {
      recipients.push('');
    }

    recipients.forEach((recipient) => {
      const recipientTemplateIds =
        recipientsData.get(recipient) ?? new Set<string>();
      if (reportTemplateIds.length === 0) {
        recipientTemplateIds.add('');
      } else {
        reportTemplateIds.forEach((templateId) => {
          recipientTemplateIds.add(templateId);
        });
      }
      recipientsData.set(recipient, recipientTemplateIds);
    });
  });

  return recipientsData;
};
