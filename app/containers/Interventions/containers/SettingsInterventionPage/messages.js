import { defineMessages } from 'react-intl';

export const scope = 'app.containers.SettingsInterventionPage';

export default defineMessages({
  pageTitle: {
    id: `${scope}.pageTitle`,
    defaultMessage: 'Settings',
  },
  placeholder: {
    id: `${scope}.placeholder`,
    defaultMessage: 'e-Intervention Name',
  },
  nameLabel: {
    id: `${scope}.nameLabel`,
    defaultMessage: 'Name',
  },
  narratorSettings: {
    id: `${scope}.narratorSettings`,
    defaultMessage: 'Narrator Settings',
  },
  narratorActive: {
    id: `${scope}.narratorActive`,
    defaultMessage: 'Narrator Active',
  },
  voice: {
    id: `${scope}.voice`,
    defaultMessage: 'Voice',
  },
  animatedCharacter: {
    id: `${scope}.animatedCharacter`,
    defaultMessage: 'Animated Character',
  },
});
