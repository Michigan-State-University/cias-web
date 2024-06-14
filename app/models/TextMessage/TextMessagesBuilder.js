/* eslint-disable camelcase */
import { defaultMapper } from 'utils/mapResponseObjects';
import objectToCamelCase from 'utils/objectToCamelCase';

import { ReportFor } from 'global/reducers/reportTemplates/constants';

import { TextMessage } from './TextMessage';
import { TextMessageType } from './TextMessageType';
import { TextMessageScheduleFrequency } from './TextMessageScheduleFrequency';
import { TextMessageScheduleOption } from './TextMessageScheduleOption';

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
   * @param  {TextMessageType} type
   * @returns  {TextMessagesBuilder}
   */
  withType = (type) => {
    this.type = type;

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
    this.originalText = textMessage.originalText;
    this.availableLinkVariableNumber = textMessage.availableLinkVariableNumber;
    this.type = textMessage.type;
    this.includeFirstName = textMessage.includeFirstName;
    this.includeLastName = textMessage.includeLastName;
    this.includePhoneNumber = textMessage.includePhoneNumber;
    this.includeEmail = textMessage.includeEmail;

    return this;
  };

  /**
   * @returns  {TextMessage}
   */
  build = () => ({
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
    originalText: this.originalText,
    availableLinkVariableNumber: this.availableLinkVariableNumber,
    type: this.type,
    includeFirstName: this.includeFirstName,
    includeLastName: this.includeLastName,
    includePhoneNumber: this.includePhoneNumber,
    includeEmail: this.includeEmail,
  });

  /**
   * @param  {string} name
   * @param  {string} sessionId
   * @returns  {TextMessage}
   */
  buildNewTextMessage = (name, sessionId) => ({
    id: null,
    name,
    sessionId,
    schedule: TextMessageScheduleOption.AFTER_FILL,
    frequency: TextMessageScheduleFrequency.ONCE,
    type: TextMessageType.NORMAL,
  });
}
