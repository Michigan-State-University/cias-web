/* eslint-disable no-unused-vars,camelcase */

export class TextMessage {
  /**
   * @param  {string} id
   * @param  {string} name
   * @param  {string} schedule
   * @param  {string} schedule_payload
   * @param  {string} frequency
   * @param  {string} sessionId
   * @param  {string} endAt
   * @param  {string} formula
   */
  constructor({
    id,
    name,
    sessionId,
    schedule,
    schedulePayload,
    frequency,
    endAt,
    formula,
  }) {
    this.id = id;
    this.name = name;
    this.sessionId = sessionId;
    this.schedule = schedule;
    this.schedulePayload = schedulePayload;
    this.frequency = frequency;
    this.endAt = endAt;
    this.formula = formula;
  }
}
