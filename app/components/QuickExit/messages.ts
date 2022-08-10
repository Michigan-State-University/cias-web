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
    defaultMessage: `If needed, you can leave this site quickly by <b>clicking the “X” in the top right corner</b> or by <b>double pressing Escape</b> on your keyboard. You will be redirected to a Google search page.`,
  },
  gestureOnboardingText: {
    id: `${scope}.gestureOnboardingText`,
    defaultMessage: `If needed, you can leave this site quickly with a <b>two-finger long press (1 second) anywhere on the screen.</b> You will be redirected to a Google search page.`,
  },
  gestureOnboardingIcon1Alt: {
    id: `${scope}.gestureOnboardingIcon1Alt`,
    defaultMessage: `Tap and hold two thumbs on the screen illustration`,
  },
  gestureOnboardingIcon2Alt: {
    id: `${scope}.gestureOnboardingIcon2Alt`,
    defaultMessage: `Tap and hold index and middle finger illustration`,
  },
  onboardingCloseButtonText: {
    id: `${scope}.onboardingCloseButtonText`,
    defaultMessage: `I understand`,
  },
  or: {
    id: `${scope}.or`,
    defaultMessage: `OR`,
  },
});
