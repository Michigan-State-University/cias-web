import { SelectModalOption } from 'components/SelectModal';

export enum DuplicateReportTemplateOptionId {
  DUPLICATE_HERE = 'duplicateHere',
  DUPLICATE_INTERNALLY = 'duplicateInternally',
}

export type DuplicateReportTemplateOption =
  SelectModalOption<DuplicateReportTemplateOptionId>;
