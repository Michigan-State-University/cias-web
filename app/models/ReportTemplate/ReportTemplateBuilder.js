/* eslint-disable camelcase,no-unused-vars */
import { defaultMapper } from 'utils/mapResponseObjects';
import objectToCamelCase from 'utils/objectToCamelCase';
import { ReportFor } from 'global/reducers/reportTemplates/constants';
import { ReportTemplate } from './ReportTemplate';
import { TemplateSection } from './TemplateSection';

export class ReportTemplateBuilder {
  reportFor = ReportFor.participant;

  /**
   * @param  {string} id
   * @returns  {ReportTemplateBuilder}
   */
  withId = id => {
    this.id = id;

    return this;
  };

  /**
   * @param  {string} name
   * @returns  {ReportTemplateBuilder}
   */
  withName = name => {
    this.name = name;

    return this;
  };

  /**
   * @param  {ReportFor.participant | ReportFor.thirdParty} reportFor
   * @returns  {ReportTemplateBuilder}
   */
  withReportFor = reportFor => {
    this.reportFor = reportFor;

    return this;
  };

  /**
   * @param  {string} logoUrl
   * @returns  {ReportTemplateBuilder}
   */
  withLogoUrl = logoUrl => {
    this.logoUrl = logoUrl;

    return this;
  };

  /**
   * @param  {string} summary
   * @returns  {ReportTemplateBuilder}
   */
  withSummary = summary => {
    this.summary = summary;

    return this;
  };

  /**
   * @param  {string} sessionId
   * @returns  {ReportTemplateBuilder}
   */
  withSessionId = sessionId => {
    this.sessionId = sessionId;

    return this;
  };

  /**
   * @param  {TemplateSection[]} sections
   * @returns  {ReportTemplateBuilder}
   */
  withSections = sections => {
    this.sections = sections;

    return this;
  };

  /**
   * @param  {object} json
   * @returns  {ReportTemplateBuilder}
   */
  fromJson = json => {
    const reportTemplate = new ReportTemplate(
      objectToCamelCase(defaultMapper(json)),
    );

    this.id = reportTemplate.id;
    this.name = reportTemplate.name;
    this.reportFor = reportTemplate.reportFor;
    this.summary = reportTemplate.summary;
    this.sessionId = reportTemplate.sessionId;
    this.logoUrl = reportTemplate.logoUrl;
    this.logoUrl = reportTemplate.logoUrl;
    this.sections = reportTemplate.sections ?? [];

    return this;
  };

  /**
   * @returns  {ReportTemplate}
   */
  build = () =>
    new ReportTemplate({
      id: this.id,
      name: this.name,
      reportFor: this.reportFor,
      summary: this.summary,
      logoUrl: this.logoUrl,
      sessionId: this.sessionId,
      sections: this.sections,
    });
}
