/**
 * Maps answer image size setting to pixel values
 * @param {string} size - The size setting: 'small', 'medium', or 'large'
 * @returns {string} The pixel value for the max width
 */
export const getAnswerImageSize = (size) => {
  switch (size) {
    case 'small':
      return '150px';
    case 'large':
      return '400px';
    case 'medium':
    default:
      return '300px';
  }
};

export default getAnswerImageSize;
