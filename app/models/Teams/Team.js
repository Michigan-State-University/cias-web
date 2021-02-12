/* eslint-disable no-unused-vars,camelcase */

class Team {
  /**
   * @param  {string} id
   * @param  {string} name
   * @param  {object} teamAdmin
   */
  constructor({ id, name, teamAdmin }) {
    this.id = id;
    this.name = name;
    this.teamAdmin = teamAdmin;
  }
}

export default Team;
