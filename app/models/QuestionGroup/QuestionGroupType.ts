import { GroupType } from './QuestionGroup';

class QuestionGroupType {
  id: GroupType;

  name: string;

  color: string;

  constructor(id: GroupType, name: string, color: string) {
    this.id = id;
    this.name = name;
    this.color = color;
  }
}

export default QuestionGroupType;
