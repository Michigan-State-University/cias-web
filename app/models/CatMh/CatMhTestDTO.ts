export interface CatMhTestDTO {
  name: string;
  short_name: string;
  cat_mh_test_attributes: {
    id: string;
    name: string;
    range: string;
    variable_type: string;
  };
}
