export interface SmsLinkAttributes {
  attributes: {
    type: string;
    url: string;
    variable: string;
  };
}

export interface SmsLink extends SmsLinkAttributes {
  id: string;
}
