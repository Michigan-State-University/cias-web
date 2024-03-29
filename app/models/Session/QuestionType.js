import { QuestionTypes } from 'models/Question';

class QuestionType {
  /**
   * @param  {QuestionTypes} id
   * @param  {string} name
   * @param  {string} color
   * @param  {string} reservedVariable
   */
  constructor(id, name, color, reservedVariable = '') {
    this.id = id;
    this.name = name;
    this.color = color;
    this.reservedVariable = reservedVariable;
  }
}

export default QuestionType;
