/* eslint-disable no-unused-vars */
import { SessionTypes } from 'models/Session/SessionTypes';
import Question from './Question';

class Session {
  /**
   * @param  {string} name
   * @param  {string} type
   * @param  {Question[]} questions=[]
   * @param  {Object} settings={}
   */
  constructor(name, type = SessionTypes[0], questions = [], settings = {}) {
    this.name = name;
    this.type = type;
    this.questions = questions;
    this.settings = settings;
  }
}

export default Session;
