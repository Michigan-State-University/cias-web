import { createSelector } from 'reselect';
import { ReportFor } from './constants';
import { initialState } from './reducer';

/**
 * Direct selector to the ReportTemplates state domain
 */

const selectReportTemplatesDomain = state =>
  state.reportTemplates || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ReportTemplates
 */

const makeSelectReportTemplates = () =>
  createSelector(
    selectReportTemplatesDomain,
    substate => substate,
  );

const makeSelectReportTemplatesList = () =>
  createSelector(
    selectReportTemplatesDomain,
    substate => substate.reportTemplates,
  );

const makeSelectReportTemplatesLoaders = () =>
  createSelector(
    selectReportTemplatesDomain,
    substate => substate.loaders,
  );

const makeSelectReportTemplatesErrors = () =>
  createSelector(
    selectReportTemplatesDomain,
    substate => substate.errors,
  );

const makeSelectReportTemplateId = id =>
  createSelector(
    selectReportTemplatesDomain,
    substate =>
      substate.reportTemplates.find(
        ({ id: reportTemplateId }) => reportTemplateId === id,
      ),
  );

const makeSelectSelectedReport = () =>
  createSelector(
    selectReportTemplatesDomain,
    substate =>
      substate.reportTemplates.find(
        ({ id: reportTemplateId }) =>
          reportTemplateId === substate.selectedReportId,
      ),
  );

const makeSelectSelectedReportId = () =>
  createSelector(
    selectReportTemplatesDomain,
    substate => substate.selectedReportId,
  );

const makeSelectSingleReportTemplate = () =>
  createSelector(
    selectReportTemplatesDomain,
    substate => substate.singleReportTemplate,
  );

const makeSelectSelectedSectionTemplate = () =>
  createSelector(
    selectReportTemplatesDomain,
    substate =>
      substate.singleReportTemplate?.sections?.find(
        ({ id: templateSectionId }) =>
          templateSectionId === substate.selectedTemplateSectionId,
      ),
  );

const makeSelectSelectedSectionTemplateId = () =>
  createSelector(
    selectReportTemplatesDomain,
    substate => substate.selectedTemplateSectionId,
  );

const makeSelectThirdPartyReportTemplatesList = () =>
  createSelector(
    selectReportTemplatesDomain,
    substate =>
      substate.reportTemplates.filter(
        ({ reportFor }) => reportFor === ReportFor.thirdParty,
      ),
  );

export default makeSelectReportTemplates;
export {
  selectReportTemplatesDomain,
  makeSelectReportTemplatesList,
  makeSelectReportTemplatesLoaders,
  makeSelectReportTemplatesErrors,
  makeSelectReportTemplateId,
  makeSelectSelectedReport,
  makeSelectSelectedReportId,
  makeSelectSingleReportTemplate,
  makeSelectSelectedSectionTemplate,
  makeSelectSelectedSectionTemplateId,
  makeSelectThirdPartyReportTemplatesList,
};
