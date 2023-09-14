export type Data<DTO> = {
  attributes: Omit<DTO, 'id'>;
  id: string;
  type: string;
  relationships?: [];
};

export interface ApiDataCollection<DTO> {
  data: [Data<DTO>];
  included?: [];
}

export interface ApiData<DTO> {
  data: Data<DTO>;
  included?: [];
}
