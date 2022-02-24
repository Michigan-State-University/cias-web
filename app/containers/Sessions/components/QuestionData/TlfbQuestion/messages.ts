import { defineMessages } from 'react-intl';

export const scope = 'app.containers.TlfbEvents';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Question Information',
  },
  substancesTitle: {
    id: `${scope}.substancesTitle`,
    defaultMessage: 'Substances with groups',
  },
  questionTitle: {
    id: `${scope}.questionTitle`,
    defaultMessage: 'Question title',
  },
  headTitle: {
    id: `${scope}.headTitle`,
    defaultMessage: 'Head Question',
  },
  substanceTitle: {
    id: `${scope}.substanceTitle`,
    defaultMessage: 'Substance Question',
  },
  questionTitlePlaceholder: {
    id: `${scope}.questionTitlePlaceholder`,
    defaultMessage: 'E.g. Sample question title',
  },
  headTitlePlaceholder: {
    id: `${scope}.headTitlePlaceholder`,
    defaultMessage:
      'E.g. Mark the days when you used substances, specify its type and amount',
  },
  substanceTitlePlaceholder: {
    id: `${scope}.substanceTitlePlaceholder`,
    defaultMessage: 'E.g. Did you consume any substances on that day?',
  },
  addNewSubstance: {
    id: `${scope}.addNewSubstance`,
    defaultMessage: 'Add new substance',
  },
  editSubstance: {
    id: `${scope}.editSubstance`,
    defaultMessage: 'Edit the substance',
  },
  addNewSubstanceDescription: {
    id: `${scope}.addNewSubstanceDescription`,
    defaultMessage: 'Type the name of the substance and its variable',
  },
  substanceName: {
    id: `${scope}.substanceName`,
    defaultMessage: 'Substance name',
  },
  substanceNamePlaceholder: {
    id: `${scope}.substanceNamePlaceholder`,
    defaultMessage: 'e.g. Alcohol',
  },
  substanceVariable: {
    id: `${scope}.substanceVariable`,
    defaultMessage: 'Substance variable',
  },
  substanceVariablePlaceholder: {
    id: `${scope}.substanceVariablePlaceholder`,
    defaultMessage: 'e.g. alcohol',
  },
  cancel: {
    id: `${scope}.cancel`,
    defaultMessage: 'Cancel',
  },
  addSubstance: {
    id: `${scope}.addSubstance`,
    defaultMessage: 'Add substance',
  },
  variableRequired: {
    id: `${scope}.variableRequired`,
    defaultMessage: 'Variable is required',
  },
  nameRequired: {
    id: `${scope}.nameRequired`,
    defaultMessage: 'Name is required',
  },
});
