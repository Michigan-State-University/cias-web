export const getSessionMapUserPreviewUrl = (userSessionId: string): string => {
  const {
    location: { pathname },
  } = window;
  const previewIndex = pathname.indexOf('preview');
  const sessionUrl = pathname.slice(0, previewIndex - 1);
  return `${sessionUrl}/map?userSessionId=${userSessionId}`;
};

const generateGridCellId = (prefix: string, index: number) =>
  `${prefix}-${index}`;

export const generateGridAnswerId = (index: number) =>
  `${generateGridCellId('answer', index)}`;
export const generateGridQuestionId = (index: number) =>
  `${generateGridCellId('question', index)}`;
