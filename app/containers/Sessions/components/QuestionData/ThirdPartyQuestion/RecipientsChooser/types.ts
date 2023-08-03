export type Recipients = { emails: string[]; faxes: string[] };

export type RecipientsFormValues = {
  oldEmails: string[];
  newEmails: string[];
  oldFaxes: string[];
  newFaxes: string[];
};
