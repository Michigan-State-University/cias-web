export const formatCaseMatch = (match: string): string =>
  match.replace(/([^\d])(\d)/, '$1 $2');
