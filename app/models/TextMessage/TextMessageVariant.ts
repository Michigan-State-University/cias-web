export interface VariantOriginalText {
  content: string;
}

export interface TextMessageVariant {
  id: string;
  content: string;
  formulaMatch: string;
  originalText: string;
  attachmentUrl: Nullable<string>;
}
