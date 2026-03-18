import { AppFile } from 'models/File';
import { SmsLink } from 'models/SmsLink';

export interface VariantOriginalText {
  content: string;
}

export interface TextMessageVariant {
  id: string;
  content: string;
  formulaMatch: string;
  originalText: string;
  attachment: Nullable<AppFile>;
  smsLinks: SmsLink[];
}
