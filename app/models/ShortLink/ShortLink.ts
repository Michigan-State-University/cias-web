export type ShortLinkData = {
  healthClinicId?: Nullable<string>;
  name: string;
};

export type ShortLink = ShortLinkData & {
  id: string;
};
