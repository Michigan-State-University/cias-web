import Question from './Question';

class Screen {
  /**
   * @param  {string} name
   * @param  {ScreenType} type
   * @param  {Question[]} questions=new Array(Question)
   */
  constructor(name, type, questions = new Array(Question)) {
    this.name = name;
    this.type = type;
    this.questions = questions;
  }
}

export default Screen;
