/* eslint-disable no-unused-vars */
import Answer from './Answer';

class Question {
  /**
   * @param  {string} text
   * @param  {Answer[]} answers=[]
   */
  constructor(text, answers = []) {
    this.text = text;
    this.answers = answers;
  }
}

export default Question;
