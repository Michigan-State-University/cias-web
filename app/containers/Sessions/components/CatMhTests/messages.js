/*
 * CatMhTests Messages
 *
 * This contains all the text for the CatMhTests component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.CatMhTests';

export default defineMessages({
  variablesAndScores: {
    id: `${scope}.variablesAndScores`,
    defaultMessage: 'Variables & scores',
  },
  diagnosis: {
    id: `${scope}.diagnosis`,
    defaultMessage: 'Diagnosis of test',
  },
  confidence: {
    id: `${scope}.confidence`,
    defaultMessage: 'Confidence of results',
  },
  severity: {
    id: `${scope}.severity`,
    defaultMessage: 'Severity of results',
  },
  category: {
    id: `${scope}.category`,
    defaultMessage: 'Result category',
  },
  precision: {
    id: `${scope}.precision`,
    defaultMessage: 'Precision of results',
  },
  prob: {
    id: `${scope}.prob`,
    defaultMessage: 'Probability of results',
  },
  percentile: {
    id: `${scope}.percentile`,
    defaultMessage: 'Percentile of results',
  },
});
