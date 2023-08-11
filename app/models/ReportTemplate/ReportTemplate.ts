export enum ReportForEnum {
  PARTICIPANT = 'participant',
  THIRD_PARTY = 'third_party',
}

export interface ReportTemplateVariantOriginalText {
  title: string;
  content: string;
}

export interface ReportTemplateSection {
  id: string;
  type?: string;
  formula?: string;
  reportTemplateId?: string;
  variants?: ReportTemplateVariant[];
}

export interface ReportTemplateVariant {
  id: string;
  type?: string;
  preview?: boolean;
  formulaMatch?: string;
  title?: string;
  content?: string;
  reportTemplateSectionId?: string;
  originalText?: ReportTemplateVariantOriginalText;
  imageUrl?: string;
  position: number;
}

export interface ReportTemplateOriginalText {
  name: string;
  summary: string;
}

export interface ReportTemplate {
  id: string;
  name: string;
  reportFor: ReportForEnum;
  logoUrl: Nullable<string>;
  summary: Nullable<string>;
  sessionId: string;
  originalText: ReportTemplateOriginalText;
  sections: ReportTemplateSection[];
  variants: ReportTemplateVariant[];
  isDuplicatedFromOtherSession: boolean;
  duplicatedFromOtherSessionWarningDismissed: boolean;
}
