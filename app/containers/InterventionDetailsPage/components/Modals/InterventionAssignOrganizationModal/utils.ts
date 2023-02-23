import { Organization } from 'models/Organization';

import { SelectOption } from 'components/Select/types';

export const organizationSelectOptionFormatter = ({
  id: value,
  name: label,
}: Organization): SelectOption<string> => ({
  value,
  label,
});
