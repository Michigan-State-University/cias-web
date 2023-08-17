export type ClinicLocation = {
  id: string;
  name: string;
};

export type InterventionClinicLocation = Pick<ClinicLocation, 'id'>;
