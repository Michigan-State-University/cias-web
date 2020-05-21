/* eslint-disable no-unused-vars */
import QuestionType from './QuestionType';

/* eslint-disable no-unused-vars */
class Question {
  /**
   * @param  {string} title
   * @param  {QuestionType} type
   * @param  {Object} body
   */
  constructor(title, type, body) {
    this.title = title;
    this.type = type;
    this.body = body;
  }
}

export default Question;
