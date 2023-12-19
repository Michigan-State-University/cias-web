import { defineMessages } from 'react-intl';

import { NarratorAnimation } from 'models/Narrator';

export const scope = 'app.global.Animations';

export default defineMessages<NarratorAnimation>({
  [NarratorAnimation.UNCERTAIN]: {
    id: `${scope}.uncertain`,
    defaultMessage: 'Uncertain',
  },
  [NarratorAnimation.WAVE]: {
    id: `${scope}.wave`,
    defaultMessage: 'Wave',
  },
  [NarratorAnimation.GREET]: {
    id: `${scope}.greet`,
    defaultMessage: 'Greet',
  },
  [NarratorAnimation.OTOH_LEFT_HAND]: {
    id: `${scope}.otohLeftHand`,
    defaultMessage: 'On the other hand (left)',
  },
  [NarratorAnimation.OTOH_RIGHT_HAND]: {
    id: `${scope}.otohRightHand`,
    defaultMessage: 'On the other hand (right)',
  },
  [NarratorAnimation.POINT_RIGHT]: {
    id: `${scope}.pointRight`,
    defaultMessage: 'Point right',
  },
  [NarratorAnimation.POINT_LEFT]: {
    id: `${scope}.pointLeft`,
    defaultMessage: 'Point left',
  },
  [NarratorAnimation.POINT_UP]: {
    id: `${scope}.pointUp`,
    defaultMessage: 'Point up',
  },
  [NarratorAnimation.POINT_DOWN]: {
    id: `${scope}.pointDown`,
    defaultMessage: 'Point down',
  },
  [NarratorAnimation.POINT_LEFT_UP]: {
    id: `${scope}.pointLeftUp`,
    defaultMessage: 'Point left up',
  },
  [NarratorAnimation.POINT_RIGHT_UP]: {
    id: `${scope}.pointRightUp`,
    defaultMessage: 'Point right up',
  },
  [NarratorAnimation.EXPLAIN]: {
    id: `${scope}.explain`,
    defaultMessage: 'Explain',
  },
  [NarratorAnimation.REST]: {
    id: `${scope}.rest`,
    defaultMessage: 'Rest',
  },
  [NarratorAnimation.REST_SHOULDER_RUBBING]: {
    id: `${scope}.restShoulderRubbing`,
    defaultMessage: 'Rest shoulder rubbing',
  },
  [NarratorAnimation.REST_STRETCHING]: {
    id: `${scope}.restStretching`,
    defaultMessage: 'Rest stretching',
  },
  [NarratorAnimation.REST_WEIGHT_SHIFT]: {
    id: `${scope}.restWeightShift`,
    defaultMessage: 'Rest weight shift',
  },
  [NarratorAnimation.READ]: {
    id: `${scope}.read`,
    defaultMessage: 'Read',
  },
  [NarratorAnimation.READING]: {
    id: `${scope}.reading`,
    defaultMessage: 'Reading',
  },
  [NarratorAnimation.CONFUSED]: {
    id: `${scope}.confused`,
    defaultMessage: 'Confused',
  },
  [NarratorAnimation.DO_MAGIC]: {
    id: `${scope}.doMagic`,
    defaultMessage: 'Do magic',
  },
  [NarratorAnimation.GET_ATTENTION]: {
    id: `${scope}.getAttention`,
    defaultMessage: 'Get attention',
  },
  [NarratorAnimation.SEARCH]: {
    id: `${scope}.search`,
    defaultMessage: 'Search',
  },
  [NarratorAnimation.SUGGEST]: {
    id: `${scope}.suggest`,
    defaultMessage: 'Suggest',
  },
  [NarratorAnimation.SURPRISED]: {
    id: `${scope}.surprised`,
    defaultMessage: 'Surprised',
  },
  [NarratorAnimation.CONGRATULATE]: {
    id: `${scope}.congratulate`,
    defaultMessage: 'Congratulate',
  },
  [NarratorAnimation.FLY_IN]: {
    id: `${scope}.flyIn`,
    defaultMessage: 'Fly in',
  },
  [NarratorAnimation.FLY_OUT]: {
    id: `${scope}.flyOut`,
    defaultMessage: 'Fly out',
  },
  [NarratorAnimation.STAND_STILL]: {
    id: `${scope}.standStill`,
    defaultMessage: 'Stand still',
  },
  [NarratorAnimation.PROCESS]: {
    id: `${scope}.process`,
    defaultMessage: 'Process',
  },
  [NarratorAnimation.LISTEN]: {
    id: `${scope}.listen`,
    defaultMessage: 'Listen',
  },
  [NarratorAnimation.THINK]: {
    id: `${scope}.think`,
    defaultMessage: 'Think',
  },
  [NarratorAnimation.WRITE]: {
    id: `${scope}.write`,
    defaultMessage: 'Write',
  },
  [NarratorAnimation.IDLE]: {
    id: `${scope}.idle`,
    defaultMessage: 'Idle',
  },
  [NarratorAnimation.TURN_PAGE]: {
    id: `${scope}.turnPage`,
    defaultMessage: 'Turn page',
  },
  [NarratorAnimation.OPEN_BOOK]: {
    id: `${scope}.openBook`,
    defaultMessage: 'Open book',
  },
  [NarratorAnimation.CLOSE_BOOK]: {
    id: `${scope}.closeBook`,
    defaultMessage: 'Close book',
  },
  [NarratorAnimation.ANNOUNCE]: {
    id: `${scope}.announce`,
    defaultMessage: 'Announce',
  },
  [NarratorAnimation.BLINK]: {
    id: `${scope}.blink`,
    defaultMessage: 'Blink',
  },
  [NarratorAnimation.ACKNOWLEDGE]: {
    id: `${scope}.acknowledge`,
    defaultMessage: 'Acknowledge',
  },
  [NarratorAnimation.ACKNOWLEDGE_THOUGHTFUL]: {
    id: `${scope}.acknowledgeThoughtful`,
    defaultMessage: 'Acknowledge thoughtful',
  },
  [NarratorAnimation.BROWS_UP]: {
    id: `${scope}.browsUp`,
    defaultMessage: 'Brows up',
  },
  [NarratorAnimation.DECLINE]: {
    id: `${scope}.decline`,
    defaultMessage: 'Decline',
  },
  [NarratorAnimation.DECLINE_ANNOYED]: {
    id: `${scope}.declineAnnoyed`,
    defaultMessage: 'Decline annoyed',
  },
  [NarratorAnimation.DECLINE_THOUGHTFUL]: {
    id: `${scope}.declineThoughtful`,
    defaultMessage: 'Decline thoughtful',
  },
  [NarratorAnimation.PLEASED]: {
    id: `${scope}.pleased`,
    defaultMessage: 'Pleased',
  },
  [NarratorAnimation.SAD]: {
    id: `${scope}.sad`,
    defaultMessage: 'Sad',
  },
  [NarratorAnimation.HEAR_LEFT_EAR]: {
    id: `${scope}.hearLeftEar`,
    defaultMessage: 'Hear left ear',
  },
  [NarratorAnimation.HEAR_RIGHT_EAR]: {
    id: `${scope}.hearRightEar`,
    defaultMessage: 'Hear right ear',
  },
  [NarratorAnimation.HEAR_BOTH_EARS]: {
    id: `${scope}.hearBothEars`,
    defaultMessage: 'Hear both ears',
  },
  [NarratorAnimation.YAWN]: {
    id: `${scope}.yawn`,
    defaultMessage: 'Yawn',
  },
  [NarratorAnimation.EAT_CRACKER]: {
    id: `${scope}.eatCracker`,
    defaultMessage: 'Eat cracker',
  },
  [NarratorAnimation.WEAR_SUNGLASSES]: {
    id: `${scope}.wearSunglasses`,
    defaultMessage: 'Wear sunglasses',
  },
  [NarratorAnimation.LOOK_DOWN]: {
    id: `${scope}.lookDown`,
    defaultMessage: 'Look down',
  },
  [NarratorAnimation.LOOK_DOWN_AND_BLINK]: {
    id: `${scope}.lookDownAndBlink`,
    defaultMessage: 'Look down and blink',
  },
  [NarratorAnimation.GLANCE_UP]: {
    id: `${scope}.glanceUp`,
    defaultMessage: 'Glance up',
  },
  [NarratorAnimation.GLANCE_DOWN]: {
    id: `${scope}.glanceDown`,
    defaultMessage: 'Glance down',
  },
  [NarratorAnimation.GLANCE_LEFT]: {
    id: `${scope}.glanceLeft`,
    defaultMessage: 'Glance left',
  },
  [NarratorAnimation.GLANCE_RIGHT]: {
    id: `${scope}.glanceRight`,
    defaultMessage: 'Glance right',
  },
  [NarratorAnimation.MOVE_LEFT]: {
    id: `${scope}.moveLeft`,
    defaultMessage: 'Move left',
  },
  [NarratorAnimation.MOVE_RIGHT]: {
    id: `${scope}.moveRight`,
    defaultMessage: 'Move right',
  },
});
