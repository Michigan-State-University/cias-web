/* eslint-disable no-unused-vars */
import Question from './Question';

class Screen {
  /**
   * @param  {string} name
   * @param  {ScreenType} type
   * @param  {Question} question
   */
  constructor(name, type, question) {
    this.name = name;
    this.type = type;
    this.question = question;
  }
}

export default Screen;
