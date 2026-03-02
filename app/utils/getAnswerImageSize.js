/**
 * Maps answer image size setting to pixel values
 * @param {string} size - The size setting: 'small', 'medium', or 'large'
 * @param {boolean} isMobile - Whether the device is mobile
 * @returns {object} Object containing maxWidth and maxHeight pixel values
 */
export const getAnswerImageSize = (size, isMobile = false) => {
  if (isMobile) {
    switch (size) {
      case 'small':
        return { maxHeight: '55px', maxWidth: '200px' };
      case 'large':
        return { maxHeight: '180px', maxWidth: '260px' };
      case 'medium':
      default:
        return { maxHeight: '95px', maxWidth: '230px' };
    }
  }

  switch (size) {
    case 'small':
      return { maxHeight: '100px', maxWidth: '330px' };
    case 'large':
      return { maxHeight: '300px', maxWidth: '450px' };
    case 'medium':
    default:
      return { maxHeight: '180px', maxWidth: '390px' };
  }
};

export default getAnswerImageSize;
