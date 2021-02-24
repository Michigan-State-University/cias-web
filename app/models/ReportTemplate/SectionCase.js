/* eslint-disable no-unused-vars,camelcase */

export class SectionCase {
  /**
   * @param  {string} id
   * @param  {boolean} preview
   * @param  {string} formulaMatch
   * @param  {string} title
   * @param  {string} content
   * @param  {string} reportTemplateSectionId
   * @param  {string} imageUrl
   */
  constructor({
    id,
    preview,
    formulaMatch,
    title,
    content,
    reportTemplateSectionId,
    imageUrl,
  }) {
    this.id = id;
    this.preview = preview;
    this.formulaMatch = formulaMatch;
    this.title = title;
    this.content = content;
    this.reportTemplateSectionId = reportTemplateSectionId;
    this.imageUrl = imageUrl;
  }
}
