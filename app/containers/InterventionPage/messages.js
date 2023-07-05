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
  myInterventionsHelp: {
    id: `${scope}.myInterventionsHelp`,
    defaultMessage:
      'Learn more about how your dashboard functions <a href="https://www.cias.app/_files/ugd/afc5c9_81850ac9ecd842dc989c11f8f4fb0efa.pdf" target="_blank">here</a>. For more help resources, visit <a href="https://www.cias.app/resources" target="_blank">www.cias.app/resources</a>.',
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
  importIntervention: {
    id: `${scope}.importIntervention`,
    defaultMessage: `Import Intervention`,
  },
  uploadIntervention: {
    id: `${scope}.uploadIntervention`,
    defaultMessage: `Upload Intervention JSON file to add it to CIAS`,
  },
  uploadInterventionInstruction: {
    id: `${scope}.uploadInterventionInstruction`,
    defaultMessage: `Drag & drop intervention file here to start uploading`,
  },
  statusFilterPlaceholder: {
    id: `${scope}.statusFilterPlaceholder`,
    defaultMessage: `Filter by status`,
  },
});
