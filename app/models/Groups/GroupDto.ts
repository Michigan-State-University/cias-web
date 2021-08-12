export enum GroupTypes {
  PLAIN = 'QuestionGroup::Plain',

  FINISH = 'QuestionGroup::Finish',
}

export type GroupDto = {
  id: string;
  position: number;
  sessionId: string;
  title: string;
  type: GroupTypes;
};
