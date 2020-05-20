import Answer from './Answer';

class Question {
  constructor(text, answers = new Array(Answer)) {
    this.text = text;
    this.answers = answers;
  }
}

export default Question;
