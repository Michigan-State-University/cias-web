export const FEEDBACK_FORM_URL =
  'https://msu.co1.qualtrics.com/jfe/form/SV_6S9MV7pPpoqFwTY';

export const WEB_HOST = process.env.WEB_URL
  ? new URL(process.env.WEB_URL).host
  : '';
