import { QuestionData } from 'global/types/question';

export const formatThirdPartyReportQuestionData = (
  questionData: QuestionData[],
): Map<string, Set<string>> => {
  const formattedData = new Map<string, Set<string>>();

  questionData.forEach(({ value, report_template_ids: reportTemplateIds }) => {
    const emails = value ? value.split(',') : [];

    if (emails.length === 0) {
      emails.push('');
    }

    emails.forEach((email) => {
      const emailTemplatesIds = formattedData.get(email) ?? new Set<string>();
      if (!reportTemplateIds || reportTemplateIds.length === 0) {
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
