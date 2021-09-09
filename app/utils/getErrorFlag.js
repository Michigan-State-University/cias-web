import XRegExp from 'xregexp';

const getErrorFlag = (error) => {
  const message = error.response?.data?.message;
  if (!message) return null;
  const matchedRegexp = XRegExp.exec(message, /(?<=ERROR_FLAG:).*/);
  if (!matchedRegexp || matchedRegexp.length === 0) return null;
  return matchedRegexp[0];
};

export default getErrorFlag;
