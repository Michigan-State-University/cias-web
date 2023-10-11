import { defineMessages } from 'react-intl';

import { NarratorBlockTypes } from 'models/Narrator';

export const scope = 'app.global.BlockTypes';

export default defineMessages<NarratorBlockTypes>({
  [NarratorBlockTypes.BODY_ANIMATION]: {
    id: `${scope}.BodyAnimation`,
    defaultMessage: 'Body Animation',
  },
  [NarratorBlockTypes.SPEECH]: {
    id: `${scope}.Speech`,
    defaultMessage: 'Speech',
  },
  [NarratorBlockTypes.REFLECTION]: {
    id: `${scope}.Reflection`,
    defaultMessage: 'Speech',
  },
  [NarratorBlockTypes.REFLECTION_FORMULA]: {
    id: `${scope}.ReflectionFormula`,
    defaultMessage: 'Speech',
  },
  [NarratorBlockTypes.HEAD_ANIMATION]: {
    id: `${scope}.HeadAnimation`,
    defaultMessage: 'Head Animation',
  },
  [NarratorBlockTypes.READ_QUESTION]: {
    id: `${scope}.ReadQuestion`,
    defaultMessage: 'Read question',
  },
  [NarratorBlockTypes.PAUSE]: {
    id: `${scope}.Pause`,
    defaultMessage: 'Pause',
  },
  [NarratorBlockTypes.FEEDBACK]: {
    id: `${scope}.Feedback`,
    defaultMessage: 'Show Spectrum',
  },
});
