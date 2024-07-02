import { GroupType } from 'models/QuestionGroup';

export const NON_MANAGEABLE_GROUPS = [GroupType.FINISH, GroupType.INITIAL];

export const NON_DRAGGABLE_GROUPS = [GroupType.FINISH, GroupType.INITIAL];

// groups whose screens are not draggable
export const SCREENS_NON_DRAGGABLE_GROUPS = [GroupType.TLFB, GroupType.FINISH];
