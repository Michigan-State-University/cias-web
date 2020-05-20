/* eslint-disable no-unused-vars */
import Screen from './Screen';

class Intervention {
  /**
   * @param  {string} name
   * @param  {Screen[]} screens=[]
   */
  constructor(name, screens = []) {
    this.name = name;
    this.screens = screens;
  }
}

export default Intervention;
