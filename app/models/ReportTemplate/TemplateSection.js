/* eslint-disable no-unused-vars,camelcase */

import { SectionCase } from './SectionCase';

export class TemplateSection {
  /**
   * @param  {string} id
   * @param  {string} formula
   * @param  {string} reportTemplateId
   * @param  {SectionCase[]} variants
   */
  constructor({ id, formula, reportTemplateId, variants }) {
    this.id = id;
    this.formula = formula;
    this.reportTemplateId = reportTemplateId;
    this.variants = variants;
  }
}
