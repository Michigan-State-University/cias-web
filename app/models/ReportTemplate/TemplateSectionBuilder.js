/* eslint-disable camelcase,no-unused-vars */
import { defaultMapper } from 'utils/mapResponseObjects';
import objectToCamelCase from 'utils/objectToCamelCase';
import { TemplateSection } from './TemplateSection';
import { SectionCase } from './SectionCase';

export class TemplateSectionBuilder {
  formula = '';

  /**
   * @param  {string} id
   * @returns  {TemplateSectionBuilder}
   */
  withId = id => {
    this.id = id;

    return this;
  };

  /**
   * @param  {string} reportTemplateId
   * @returns  {TemplateSectionBuilder}
   */
  withReportTemplateId = reportTemplateId => {
    this.reportTemplateId = reportTemplateId;

    return this;
  };

  /**
   * @param  {string} formula
   * @returns  {TemplateSectionBuilder}
   */
  withFormula = formula => {
    this.formula = formula;

    return this;
  };

  /**
   * @param  {SectionCase[]} variants
   * @returns  {TemplateSectionBuilder}
   */
  withVariants = variants => {
    this.variants = variants;

    return this;
  };

  /**
   * @param  {object} json
   * @returns  {TemplateSectionBuilder}
   */
  fromJson = json => {
    const templateSection = new TemplateSection(
      objectToCamelCase(defaultMapper(json)),
    );

    this.id = templateSection.id;
    this.formula = templateSection.formula;
    this.reportTemplateId = templateSection.reportTemplateId;
    this.variants = templateSection.variants ?? [];

    return this;
  };

  /**
   * @returns  {TemplateSection}
   */
  build = () =>
    new TemplateSection({
      id: this.id,
      formula: this.formula,
      reportTemplateId: this.reportTemplateId,
      variants: this.variants,
    });
}
