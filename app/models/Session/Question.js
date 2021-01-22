/* eslint-disable no-unused-vars,camelcase */
import QuestionType from './QuestionType';

class Question {
  /**
   * @param  {string} id
   * @param  {string} title
   * @param  {string} subtitle
   * @param  {QuestionType} type
   * @param  {Object} body
   * @param  {number} position
   * @param  {string} question_group_id
   */
  constructor({
    id,
    title,
    type,
    body,
    subtitle,
    position,
    question_group_id,
  }) {
    this.id = id;
    this.title = title;
    this.subtitle = subtitle;
    this.type = type;
    this.body = body;
    this.position = position;
    this.question_group_id = question_group_id;
  }
}

export default Question;