/* eslint-disable camelcase */
import Question from '../Question';

import { getQuestionDataByType } from './getQuestionDataByType';

export class QuestionBuilder {
  /**
   * @param  {string} id
   * @returns  {QuestionBuilder}
   */
  withId = id => {
    this.id = id;

    return this;
  };

  /**
   * @param  {string} title
   * @returns  {QuestionBuilder}
   */
  withTitle = title => {
    this.title = title;

    return this;
  };

  /**
   * @param  {string} subtitle
   * @returns  {QuestionBuilder}
   */
  withSubtitle = subtitle => {
    this.subtitle = subtitle;

    return this;
  };

  /**
   * @param  {string} type
   * @returns  {QuestionBuilder}
   */
  ofType = type => {
    this.type = type;
    this.body = getQuestionDataByType(type);

    return this;
  };

  /**
   * @param  {object} body
   * @returns  {QuestionBuilder}
   */
  withBody = body => {
    this.body = body;

    return this;
  };

  /**
   * @param  {number} position
   * @returns  {QuestionBuilder}
   */
  withPosition = position => {
    this.position = position;

    return this;
  };

  /**
   * @param  {string} question_group_id
   * @returns  {QuestionBuilder}
   */
  withQuestionGroupId = question_group_id => {
    this.question_group_id = question_group_id;

    return this;
  };

  /**
   * @returns  {Question}
   */
  build = () =>
    new Question({
      id: this.id,
      title: this.title,
      subtitle: this.subtitle,
      type: this.type,
      body: this.body,
      position: this.position,
      question_group_id: this.question_group_id,
    });
}
