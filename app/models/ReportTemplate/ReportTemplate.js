/* eslint-disable no-unused-vars,camelcase */

import { ReportFor } from 'global/reducers/reportTemplates/constants';

export class ReportTemplate {
  /**
   * @param  {string} id
   * @param  {string} name
   * @param  {ReportFor.participant | ReportFor.thirdParty} reportFor
   * @param  {string} logoUrl
   * @param  {string} summary
   * @param  {string} sessionId
   */
  constructor({ id, name, reportFor, logoUrl, summary, sessionId }) {
    this.id = id;
    this.name = name;
    this.reportFor = reportFor;
    this.logoUrl = logoUrl;
    this.summary = summary;
    this.sessionId = sessionId;
  }
}
