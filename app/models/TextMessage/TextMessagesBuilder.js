/* eslint-disable camelcase */
import { defaultMapper } from 'utils/mapResponseObjects';
import objectToCamelCase from 'utils/objectToCamelCase';
import { ReportFor } from 'global/reducers/reportTemplates/constants';
import { TextMessage } from 'models/TextMessage/TextMessage';
import {
  MESSAGES_SCHEDULE_OPTIONS,
  MESSAGES_SCHEDULE_FREQUENCIES,
} from 'models/TextMessage/constants';

export class TextMessagesBuilder {
  reportFor = ReportFor.participant;

  /**
   * @param  {string} id
   * @returns  {TextMessagesBuilder}
   */
  withId = (id) => {
    this.id = id;

    return this;
  };

  /**
   * @param  {string} name
   * @returns  {TextMessagesBuilder}
   */
  withName = (name) => {
    this.name = name;

    return this;
  };

  /**
   * @param  {string} sessionId
   * @returns  {TextMessagesBuilder}
   */
  withSessionId = (sessionId) => {
    this.sessionId = sessionId;

    return this;
  };

  /**
   * @param  {string} schedule
   * @param  {string} schedulePayload
   * @param  {string} frequency
   * @param  {string} endAt
   * @param  {string} formula
   * @returns  {TextMessagesBuilder}
   */
  withSchedule = (schedule, schedulePayload, frequency, endAt, formula) => {
    this.schedule = schedule;
    this.schedulePayload = schedulePayload;
    this.frequency = frequency;
    this.endAt = endAt;
    this.formula = formula;
    this.isUsedFormula = true;

    return this;
  };

  /**
   * @param  {object} json
   * @returns  {TextMessagesBuilder}
   */
  fromJson = (json) => {
    const textMessage = objectToCamelCase(defaultMapper(json));

    this.id = textMessage.id;
    this.name = textMessage.name;
    this.sessionId = textMessage.sessionId;
    this.schedule = textMessage.schedule;
    this.schedulePayload = textMessage.schedulePayload;
    this.frequency = textMessage.frequency;
    this.endAt = textMessage.endAt;
    this.formula = textMessage.formula;
    this.isUsedFormula = textMessage.isUsedFormula;
    this.noFormulaText = textMessage.noFormulaText;

    return this;
  };

  /**
   * @returns  {TextMessage}
   */
  build = () =>
    new TextMessage({
      id: this.id,
      name: this.name,
      sessionId: this.sessionId,
      schedule: this.schedule,
      schedulePayload: this.schedulePayload,
      frequency: this.frequency,
      endAt: this.endAt,
      formula: this.formula,
      isUsedFormula: this.isUsedFormula,
      noFormulaText: this.noFormulaText,
    });

  /**
   * @param  {string} name
   * @param  {string} sessionId
   * @returns  {TextMessage}
   */
  buildNewTextMessage = (name, sessionId) =>
    new TextMessage({
      id: null,
      name,
      sessionId,
      schedule: MESSAGES_SCHEDULE_OPTIONS.afterFill,
      frequency: MESSAGES_SCHEDULE_FREQUENCIES.once,
    });
}
