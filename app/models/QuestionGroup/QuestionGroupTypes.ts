import { colors } from 'theme';

import QuestionGroupType from './QuestionGroupType';
import { GroupTypes } from './QuestionGroup';

const tlfbGroup = new QuestionGroupType(
  GroupTypes.TLFB,
  'Timeline Followback',
  colors.surfieGreen,
);

const AddableGroups = [tlfbGroup];

export { AddableGroups };
