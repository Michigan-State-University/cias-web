import { defineMessages } from 'react-intl';

export const scope = 'app.containers.NavigatorsAvailabilityModal';

export default defineMessages({
  navigatorsAvailabilityDialogTitle: {
    id: `${scope}.navigatorsAvailabilityDialogTitle`,
    defaultMessage: 'Open to live chat messages?',
  },
  navigatorsAvailabilityDialogSubtitle: {
    id: `${scope}.navigatorsAvailabilityDialogSubtitle`,
    defaultMessage:
      "You can decide if you want to reveive a new messages from live chat or stay focus on researcher's work.",
  },
  noOptionTitle: {
    id: `${scope}.noOptionTitle`,
    defaultMessage: "I want to do researcher's work",
  },
  noOptionDescription: {
    id: `${scope}.noOptionDescription`,
    defaultMessage:
      "You will be able to fully concentrate on the researcher's work because new people who want to receive help won't be assigned to you. You will still receive new messages from existing conversations.",
  },
  yesOptionTitle: {
    id: `${scope}.yesOptionTitle`,
    defaultMessage: 'I am able to talk via live chat',
  },
  yesOptionDescription: {
    id: `${scope}.yesOptionDescription`,
    defaultMessage:
      "By choosing this option you will still be able to do the researcher's work, but additionally, if someone asks a question on a live chat this person may be assigned to you.",
  },
  startUsingApp: {
    id: `${scope}.startUsingApp`,
    defaultMessage: 'Start using an app',
  },
});
