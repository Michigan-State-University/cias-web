/**
 * Utility functions for formatting and anonymizing HFHS patient data
 */

/**
 * Formats date of birth for display
 * Accepts ISO format from backend and returns US format (MM/DD/YYYY)
 *
 * @param dob - Date of birth in ISO format (YYYY-MM-DD)
 * @returns Formatted date string in US format
 */
export const formatDOB = (dob: string): string => {
  if (!dob) return '';
  // Parse and format DOB (assuming ISO format from backend)
  const date = new Date(dob);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};
