/**
 * @param  {string} text text to be split
 * @param  {Array<string>} delimiters delimiters by which text has to be split
 * @returns {Array<string>} array of strings with included delimiters
 */
export const splitAndKeep = (text, delimiters) => {
  const pattern = `${delimiters
    .map((delimiter, index) => {
      let prefix = '';
      if (index !== 0) prefix = '|';

      return `${prefix}([${delimiter}])`;
    })
    .join('')}`;

  const regex = new RegExp(pattern, 'g');

  return text
    .split(regex)
    .filter(el => el && el.trim())
    .reduce((chunks, item, index, original) => {
      if (!item.match(regex)) {
        chunks.push(`${item}${original[index + 1] || ''}`);
      }

      return chunks;
    }, []);
};
