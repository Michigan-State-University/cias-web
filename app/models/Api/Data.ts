export interface ApiData<DTO> {
  data: [
    {
      attributes: DTO;
      id: string;
      type: string;
      relationships?: [];
    },
  ];
  included?: [];
}
