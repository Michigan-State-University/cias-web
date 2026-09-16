export const hasAnswerImage = (answerImages, answerId) =>
  answerImages.some((img) => img.answer_id === answerId);

export const getOriginalAnswerImageText = (originalText, answerId) => {
  if (!originalText || typeof originalText !== 'object') {
    return undefined;
  }

  const answerImagesArray =
    originalText.answer_images || originalText.answerImages;

  if (!Array.isArray(answerImagesArray) || answerImagesArray.length === 0) {
    return undefined;
  }

  const matchingEntry = answerImagesArray.find(
    (entry) =>
      entry && typeof entry === 'object' && entry.answer_id === answerId,
  );

  if (!matchingEntry) return undefined;

  const text = matchingEntry.description;

  return text && typeof text === 'string' && text.trim() !== ''
    ? text
    : undefined;
};
