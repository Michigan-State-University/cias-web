export const COPY_QUESTIONS_REQUEST =
  'app/EditSessionPage/COPY_QUESTIONS_REQUEST';
export const COPY_QUESTIONS_SUCCESS =
  'app/EditSessionPage/COPY_QUESTIONS_SUCCESS';
export const COPY_QUESTIONS_ERROR = 'app/EditSessionPage/COPY_QUESTIONS_ERROR';

export const GROUP_QUESTIONS_REQUEST =
  'app/EditSessionPage/GROUP_QUESTIONS_REQUEST';
export const GROUP_QUESTIONS_SUCCESS =
  'app/EditSessionPage/GROUP_QUESTIONS_SUCCESS';
export const GROUP_QUESTIONS_ERROR =
  'app/EditSessionPage/GROUP_QUESTIONS_ERROR';

export const SHARE_QUESTIONS_TO_RESEARCHERS_REQUEST =
  'app/EditSessionPage/SHARE_QUESTIONS_TO_RESEARCHERS_REQUEST';
export const SHARE_QUESTIONS_TO_RESEARCHERS_SUCCESS =
  'app/EditSessionPage/SHARE_QUESTIONS_TO_RESEARCHERS_SUCCESS';
export const SHARE_QUESTIONS_TO_RESEARCHERS_ERROR =
  'app/EditSessionPage/SHARE_QUESTIONS_TO_RESEARCHERS_ERROR';

export const CHANGE_GROUP_NAME_REQUEST =
  'app/EditSessionPage/CHANGE_GROUP_NAME_REQUEST';
export const CHANGE_GROUP_NAME_SUCCESS =
  'app/EditSessionPage/CHANGE_GROUP_NAME_SUCCESS';
export const CHANGE_GROUP_NAME_ERROR =
  'app/EditSessionPage/CHANGE_GROUP_NAME_ERROR';

export const GET_QUESTION_GROUPS_REQUEST =
  'app/EditSessionPage/GET_QUESTION_GROUPS_REQUEST';
export const GET_QUESTION_GROUPS_SUCCESS =
  'app/EditSessionPage/GET_QUESTION_GROUPS_SUCCESS';
export const GET_QUESTION_GROUPS_ERROR =
  'app/EditSessionPage/GET_QUESTION_GROUPS_ERROR';

export const CREATE_QUESTION_IN_GROUP =
  'app/EditSessionPage/CREATE_QUESTION_IN_GROUP';

export const REORDER_GROUP_LIST_REQUEST =
  'app/EditSessionPage/REORDER_GROUP_LIST_REQUEST';
export const REORDER_GROUP_LIST_SUCCESS =
  'app/EditSessionPage/REORDER_GROUP_LIST_SUCCESS';
export const REORDER_GROUP_LIST_ERROR =
  'app/EditSessionPage/REORDER_GROUP_LIST_ERROR';

export const CLEAN_GROUPS = 'app/EditSessionPage/CLEAN_GROUPS';

export const SAVED_ACTIONS = [
  GET_QUESTION_GROUPS_SUCCESS,
  GET_QUESTION_GROUPS_ERROR,
  CHANGE_GROUP_NAME_ERROR,
  CHANGE_GROUP_NAME_SUCCESS,
  SHARE_QUESTIONS_TO_RESEARCHERS_SUCCESS,
  SHARE_QUESTIONS_TO_RESEARCHERS_ERROR,
  GROUP_QUESTIONS_SUCCESS,
  GROUP_QUESTIONS_ERROR,
  COPY_QUESTIONS_ERROR,
  COPY_QUESTIONS_SUCCESS,
  REORDER_GROUP_LIST_SUCCESS,
  REORDER_GROUP_LIST_ERROR,
];

export const SAVING_ACTIONS = [
  GET_QUESTION_GROUPS_REQUEST,
  GROUP_QUESTIONS_REQUEST,
  SHARE_QUESTIONS_TO_RESEARCHERS_REQUEST,
  COPY_QUESTIONS_REQUEST,
  CHANGE_GROUP_NAME_REQUEST,
  REORDER_GROUP_LIST_REQUEST,
];
