/* eslint-disable camelcase,no-unused-vars */
import { defaultMapper } from 'utils/mapResponseObjects';
import objectToCamelCase from 'utils/objectToCamelCase';
import { SectionCase } from './SectionCase';

export class SectionCaseBuilder {
  title = '';

  content = '';

  formulaMatch = '=';

  /**
   * @param  {string} id
   * @returns  {SectionCaseBuilder}
   */
  withId = (id) => {
    this.id = id;

    return this;
  };

  /**
   * @param  {boolean} preview
   * @returns  {SectionCaseBuilder}
   */
  withPreview = (preview) => {
    this.preview = preview;

    return this;
  };

  /**
   * @param  {string} formulaMatch
   * @returns  {SectionCaseBuilder}
   */
  withFormulaMatch = (formulaMatch) => {
    this.formulaMatch = formulaMatch;

    return this;
  };

  /**
   * @param  {string} title
   * @returns  {SectionCaseBuilder}
   */
  withTitle = (title) => {
    this.title = title;

    return this;
  };

  /**
   * @param  {string} content
   * @returns  {SectionCaseBuilder}
   */
  withContent = (content) => {
    this.content = content;

    return this;
  };

  /**
   * @param  {string} reportTemplateSectionId
   * @returns  {SectionCaseBuilder}
   */
  withReportTemplateSectionId = (reportTemplateSectionId) => {
    this.reportTemplateSectionId = reportTemplateSectionId;

    return this;
  };

  /**
   * @param  {string} imageUrl
   * @returns  {SectionCaseBuilder}
   */
  withImageUrl = (imageUrl) => {
    this.imageUrl = imageUrl;

    return this;
  };

  /**
   * @param  {object} json
   * @returns  {SectionCaseBuilder}
   */
  fromJson = (json) => {
    const sectionCase = new SectionCase(objectToCamelCase(defaultMapper(json)));

    this.id = sectionCase.id;
    this.preview = sectionCase.preview;
    this.formulaMatch = sectionCase.formulaMatch;
    this.title = sectionCase.title;
    this.content = sectionCase.content;
    this.reportTemplateSectionId = sectionCase.reportTemplateSectionId;
    this.imageUrl = sectionCase.imageUrl;

    return this;
  };

  /**
   * @returns  {TemplateSection}
   */
  build = () =>
    new SectionCase({
      id: this.id,
      preview: this.preview,
      formulaMatch: this.formulaMatch,
      title: this.title,
      content: this.content,
      reportTemplateSectionId: this.reportTemplateSectionId,
      attachmentUrl: this.imageUrl,
    });
}
