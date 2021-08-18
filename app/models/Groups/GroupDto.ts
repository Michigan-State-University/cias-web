export enum GroupTypes {
  PLAIN = 'QuestionGroup::Plain',
  FINISH = 'QuestionGroup::Finish',
}

export interface GroupDto {
  id: string;
  position: number;
  sessionId: string;
  title: string;
  type: GroupTypes;
}
