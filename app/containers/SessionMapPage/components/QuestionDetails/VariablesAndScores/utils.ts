import { ThirdPartyReportQuestionDataDTO } from 'models/Question';

export const formatThirdPartyReportQuestionData = (
  questionData: ThirdPartyReportQuestionDataDTO[],
): Map<string, Set<string>> => {
  const formattedData = new Map<string, Set<string>>();

  questionData.forEach(({ value, report_template_ids: reportTemplateIds }) => {
    const emails = value.split(',');

    if (emails.length === 0) {
      emails.push('');
    }

    emails.forEach((email) => {
      const emailTemplatesIds = formattedData.get(email) ?? new Set<string>();
      if (reportTemplateIds.length === 0) {
        emailTemplatesIds.add('');
      } else {
        reportTemplateIds.forEach((templateId) => {
          emailTemplatesIds.add(templateId);
        });
      }
      formattedData.set(email, emailTemplatesIds);
    });
  });

  return formattedData;
};
