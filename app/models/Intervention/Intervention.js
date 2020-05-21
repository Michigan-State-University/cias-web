/* eslint-disable no-unused-vars */
import { InterventionTypes } from './InterventionTypes';
import Question from './Question';

class Intervention {
  /**
   * @param  {string} name
   * @param  {string} type
   * @param  {Question[]} questions=[]
   * @param  {Object} settings={}
   */
  constructor(
    name,
    type = InterventionTypes[0],
    questions = [],
    settings = {},
  ) {
    this.name = name;
    this.type = type;
    this.questions = questions;
    this.settings = settings;
  }
}

export default Intervention;
