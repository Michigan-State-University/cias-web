import unescape from 'lodash/unescape';

export const htmlToPlainText = html => {
  const text = html ? html.replace(/<[^>]*>?/gm, '') : '';
  return unescape(text);
};
