import { all } from 'redux-saga/effects';

import duplicateReportTemplate from './duplicateReportTemplate';
import addReportTemplate from './addReportTemplate';
import fetchReportTemplates from './fetchReportTemplates';
import updateReportTemplate from './updateReportTemplate';
import deleteReportTemplate from './deleteReportTemplate';
import deleteReportTemplateLogo from './deleteReportTemplateLogo';
import fetchSingleReportTemplate from './fetchSingleReportTemplate';
import addSectionCase from './addSectionCase';
import addTemplateSection from './addTemplateSection';
import deleteSectionCase from './deleteSectionCase';
import deleteSectionCaseImage from './deleteSectionCaseImage';
import deleteTemplateSection from './deleteTemplateSection';
import updateSectionCase from './updateSectionCase';
import updateTemplateSection from './updateTemplateSection';
import generateTestReport from './generateTestReport';
import reorderTemplateSections from './reorderTemplateSections';
import reorderSectionCases from './reorderSectionCases';

export default function* reportTemplatesSaga() {
  yield all([
    fetchReportTemplates(),
    duplicateReportTemplate(),
    addReportTemplate(),
    updateReportTemplate(),
    deleteReportTemplate(),
    deleteReportTemplateLogo(),
    fetchSingleReportTemplate(),
    addSectionCase(),
    addTemplateSection(),
    deleteSectionCase(),
    deleteSectionCaseImage(),
    deleteTemplateSection(),
    updateSectionCase(),
    updateTemplateSection(),
    generateTestReport(),
    reorderTemplateSections(),
    reorderSectionCases(),
  ]);
}
