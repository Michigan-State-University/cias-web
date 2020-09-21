import Question from '../Question';

import { getQuestionDataByType } from './getQuestionDataByType';

export class QuestionBuilder {
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
   * @returns  {Question}
   */
  build = () =>
    new Question({
      title: this.title,
      subtitle: this.subtitle,
      type: this.type,
      body: this.body,
    });
}
