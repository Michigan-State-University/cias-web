/* eslint-disable camelcase */
import { defaultMapper } from 'utils/mapResponseObjects';
import objectToCamelCase from 'utils/objectToCamelCase';
import { ReportFor } from 'global/reducers/reportTemplates/constants';
import { GeneratedReport } from 'models/GeneratedReport/GeneratedReport';

export class GeneratedReportBuilder {
  reportFor = ReportFor.participant;

  /**
   * @param  {string} id
   * @returns  {GeneratedReportBuilder}
   */
  withId = (id) => {
    this.id = id;

    return this;
  };

  /**
   * @param  {object} json
   * @returns  {GeneratedReportBuilder}
   */
  fromJson = (json) => {
    const generatedReport = objectToCamelCase(defaultMapper(json));

    this.id = generatedReport.id;
    this.name = generatedReport.name;
    this.createdAt = generatedReport.createdAt;
    this.pdfReportUrl = generatedReport.pdfReportUrl;
    this.reportFor = generatedReport.reportFor;

    return this;
  };

  /**
   * @returns  {GeneratedReport}
   */
  build = () =>
    new GeneratedReport({
      id: this.id,
      name: this.name,
      createdAt: this.createdAt,
      pdfReportUrl: this.pdfReportUrl,
      reportFor: this.reportFor,
    });
}
