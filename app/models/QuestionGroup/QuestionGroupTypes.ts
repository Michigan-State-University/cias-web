import { colors } from 'theme';

import QuestionGroupType from './QuestionGroupType';
import { GroupType } from './QuestionGroup';

const tlfbGroup = new QuestionGroupType(
  GroupType.TLFB,
  'Timeline Followback',
  colors.asparagus,
);

const AddableGroups = [tlfbGroup];

export { AddableGroups };
