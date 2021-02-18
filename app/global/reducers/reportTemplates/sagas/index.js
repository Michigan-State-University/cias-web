import { all } from 'redux-saga/effects';

import addReportTemplate from './addReportTemplate';
import fetchReportTemplates from './fetchReportTemplates';
import updateReportTemplate from './updateReportTemplate';
import deleteReportTemplate from './deleteReportTemplate';
import deleteReportTemplateLogo from './deleteReportTemplateLogo';

export default function* reportTemplatesSaga() {
  yield all([
    fetchReportTemplates(),
    addReportTemplate(),
    updateReportTemplate(),
    deleteReportTemplate(),
    deleteReportTemplateLogo(),
  ]);
}
