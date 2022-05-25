/*
 * QuickExit Messages
 *
 * This contains all the text for the QuickExit component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.QuickExit';

export default defineMessages({
  exit: {
    id: `${scope}.exit`,
    defaultMessage: `Exit`,
  },
  exitButtonTitle: {
    id: `${scope}.exitButtonTitle`,
    defaultMessage: `Quickly close the intervention`,
  },
  exitIconAlt: {
    id: `${scope}.exitIconAlt`,
    defaultMessage: `Quick Exit button icon`,
  },
  onboardingTitle: {
    id: `${scope}.buttonOnboardingTitle`,
    defaultMessage: `Leave this site safely`,
  },
  buttonOnboardingText: {
    id: `${scope}.buttonOnboardingText`,
    defaultMessage: `In case of a dangerous situation, you can quickly close the intervention by <b>clicking the “X” in the top right corner</b> or by <b>double pressing Escape</b> on your keyboard. Additionally, we recommend you complete Interventions in Incognito mode to not save your browsing history.`,
  },
  gestureOnboardingText: {
    id: `${scope}.gestureOnboardingText`,
    defaultMessage: `In case of a dangerous situation, you can quickly close the intervention <b>by two-finger long press (1s)</b> anywhere on the screen. Additionally, we recommend you complete Interventions in Incognito mode to not save your browsing history.`,
  },
  gestureOnboardingIconAlt: {
    id: `${scope}.gestureOnboardingIconAlt`,
    defaultMessage: `Tap and hold two fingers icon`,
  },
  onboardingCloseButtonText: {
    id: `${scope}.onboardingCloseButtonText`,
    defaultMessage: `I understand`,
  },
});
