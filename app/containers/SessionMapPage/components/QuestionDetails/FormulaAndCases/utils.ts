import { colors } from 'theme';

export const formatCaseMatch = (match: string): string =>
  match.replace(/([^\d])(\d)/, '$1 $2');

export const highlightTargetText = (text: string) =>
  `<span style='color: ${colors.jungleGreen};'>${text}</span>`;

export const getCaseTargetElementId = (index: number): string =>
  `session-map-question-details-feedback-target-${index}`;
