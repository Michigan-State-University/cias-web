/* eslint-disable camelcase */
import { mapTeam } from 'utils/mapResponseObjects';
import Team from './Team';

export class TeamBuilder {
  /**
   * @param  {string} id
   * @returns  {TeamBuilder}
   */
  withId = (id) => {
    this.id = id;

    return this;
  };

  /**
   * @param  {string} name
   * @returns  {TeamBuilder}
   */
  withName = (name) => {
    this.name = name;

    return this;
  };

  /**
   * @param  {object} teamAdmin
   * @returns  {TeamBuilder}
   */
  withTeamAdmin = (teamAdmin) => {
    this.teamAdmin = teamAdmin;

    return this;
  };

  /**
   * @param  {object} json
   * @returns  {TeamBuilder}
   */
  fromJson = (json) => {
    const team = mapTeam(json);

    this.id = team.id;
    this.name = team.name;
    this.userId = team.userId;

    return this;
  };

  /**
   * @returns  {Team}
   */
  build = () =>
    new Team({
      id: this.id,
      name: this.name,
      teamAdmin: this.teamAdmin,
    });
}
