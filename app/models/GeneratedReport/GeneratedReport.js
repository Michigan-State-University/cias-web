export class GeneratedReport {
  /**
   * @param  {string} id
   * @param  {string} name
   * @param  {string} createdAt
   * @param  {string} pdfReportUrl
   * @param  {string} reportFor
   */
  constructor({ id, name, createdAt, pdfReportUrl, reportFor }) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
    this.pdfReportUrl = pdfReportUrl;
    this.reportFor = reportFor;
  }
}
