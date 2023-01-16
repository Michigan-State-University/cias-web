import isEqual from 'lodash/isEqual';

import { Organization } from 'models/Organization';

import { SelectOption } from 'components/Select/types';

import { FormValues } from './types';

export const organizationSelectOptionFormatter = ({
  id: value,
  name: label,
}: Organization): SelectOption<string> => ({
  value,
  label,
});

export const mapShortLinks = (
  formValues: Nullable<FormValues>,
  initialValues: FormValues,
) => {
  if (!formValues) {
    return {
      hasLinksChanged: false,
    };
  }

  const hasLinksChanged = !isEqual(formValues, initialValues);
  if (!hasLinksChanged) {
    return {
      hasLinksChanged: false,
    };
  }

  const { name, selected } = formValues;
  const newLinks = selected ? [{ name }] : [];

  return {
    hasLinksChanged,
    shortLinks: hasLinksChanged ? newLinks : undefined,
  };
};
