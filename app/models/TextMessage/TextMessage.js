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
   * @param  {boolean} isUsedFormula
   * @param  {string} noFormulaText
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
    isUsedFormula,
    noFormulaText,
  }) {
    this.id = id;
    this.name = name;
    this.sessionId = sessionId;
    this.schedule = schedule;
    this.schedulePayload = schedulePayload;
    this.frequency = frequency;
    this.endAt = endAt;
    this.formula = formula;
    this.isUsedFormula = isUsedFormula;
    this.noFormulaText = noFormulaText;
  }
}
