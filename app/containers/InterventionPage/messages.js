/*
 * InterventionPage Messages
 *
 * This contains all the text for the InterventionPage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.InterventionPage';

export default defineMessages({
  createIntervention: {
    id: `${scope}.createIntervention`,
    defaultMessage: 'Create a new intervention',
  },
  myInterventions: {
    id: `${scope}.myInterventions`,
    defaultMessage: 'My Dashboard',
  },
  teamName: {
    id: `${scope}.teamName`,
    defaultMessage: '<b>Team</b>: {teamName}',
  },
  noInterventions: {
    id: `${scope}.noInterventions`,
    defaultMessage: `You don't have any interventions`,
  },
  filter: {
    id: `${scope}.filter`,
    defaultMessage: `Filter by name`,
  },
  noFilterResults: {
    id: `${scope}.noFilterResults`,
    defaultMessage: `There are no interventions with this criteria`,
  },
  showArchived: {
    id: `${scope}.showArchived`,
    defaultMessage: `Show Archived`,
  },
  hideArchived: {
    id: `${scope}.hideArchived`,
    defaultMessage: `Hide Archived`,
  },
  feedbackTitle: {
    id: `${scope}.feedbackTitle`,
    defaultMessage: `Something went wrong? Have a new idea?`,
  },
  feedbackDescription: {
    id: `${scope}.feedbackDescription`,
    defaultMessage: `Share your thoughts here!`,
  },
  searchInterventionsLabel: {
    id: `${scope}.searchInterventionsLabel`,
    defaultMessage: `Filter Interventions by name`,
  },
  clearFiltersText: {
    id: `${scope}.clearFiltersText`,
    defaultMessage: `Reset filters to default values`,
  },
  import: {
    id: `${scope}.import`,
    defaultMessage: `Import intervention`,
  },
  importIntervention: {
    id: `${scope}.importIntervention`,
    defaultMessage: `Import intervention`,
  },
  uploadIntervention: {
    id: `${scope}.uploadIntervention`,
    defaultMessage: `Upload Intervention JSON file to add it to CIAS`,
  },
  dragAndDropInstructions: {
    id: `${scope}.dragAndDropInstructions`,
    defaultMessage: `Drag & drop intervention file here to start uploading`,
  },
  dragAndDropError: {
    id: `${scope}.dragAndDropError`,
    defaultMessage: `Couldn't upload a file`,
  },
  or: {
    id: `${scope}.or`,
    defaultMessage: `OR`,
  },
  browseFiles: {
    id: `${scope}.browseFiles`,
    defaultMessage: `Browse files`,
  },
});
