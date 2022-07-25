export class GeneratedReport {
  /**
   * @param  {string} id
   * @param  {string} name
   * @param  {string} createdAt
   * @param  {string} pdfReportUrl
   * @param  {string} reportFor
   * @param  {boolean} downloaded
   */
  constructor({ id, name, createdAt, pdfReportUrl, reportFor, downloaded }) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
    this.pdfReportUrl = pdfReportUrl;
    this.reportFor = reportFor;
    this.downloaded = downloaded;
  }
}
