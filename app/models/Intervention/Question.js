/* eslint-disable no-unused-vars */
import QuestionType from './QuestionType';

class Question {
  /**
   * @param  {string} title
   * @param  {string} subtitle
   * @param  {QuestionType} type
   * @param  {Object} body
   */
  constructor({ title, type, body, subtitle }) {
    this.title = title;
    this.subtitle = subtitle;
    this.type = type;
    this.body = body;
  }
}

export default Question;
