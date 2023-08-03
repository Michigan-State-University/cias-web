export type Recipients = { emails: string[]; faxes: string[] };

export type RecipientsFormItem = {
  value: string;
  old: boolean;
};

export type RecipientsFormValues = {
  emails: RecipientsFormItem[];
  faxes: RecipientsFormItem[];
};
