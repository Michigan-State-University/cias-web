export interface LinksRendered {
  url: string;
  variable: string;
  linkType: string;
}

interface SmsLinkApi {
  attributes: {
    url: string;
    variable: string;
    link_type: string;
  };
}

export interface SmsLinksApiResponse {
  data: SmsLinkApi[];
}
