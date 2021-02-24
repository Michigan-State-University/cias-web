/* eslint-disable no-unused-vars,camelcase */

import { ReportFor } from 'global/reducers/reportTemplates/constants';
import { TemplateSection } from './TemplateSection';

export class ReportTemplate {
  /**
   * @param  {string} id
   * @param  {string} name
   * @param  {ReportFor.participant | ReportFor.thirdParty} reportFor
   * @param  {string} logoUrl
   * @param  {string} summary
   * @param  {string} sessionId
   * @param  {TemplateSection[]} sections
   */
  constructor({ id, name, reportFor, logoUrl, summary, sessionId, sections }) {
    this.id = id;
    this.name = name;
    this.reportFor = reportFor;
    this.logoUrl = logoUrl;
    this.summary = summary;
    this.sessionId = sessionId;
    this.sections = sections;
  }
}
