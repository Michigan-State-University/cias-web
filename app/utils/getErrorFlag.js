import XRegExp from 'xregexp';

const getErrorFlag = (error) => {
  const message = error.response?.data?.message;
  if (!message) return null;
  const matchedRegexp = XRegExp.exec(message, /ERROR_FLAG:([a-zA-Z]*)/);
  if (!matchedRegexp || matchedRegexp.length < 2) return null;
  return matchedRegexp[1];
};

export default getErrorFlag;
