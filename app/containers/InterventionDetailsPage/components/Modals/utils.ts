import isEqual from 'lodash/isEqual';

import { FormValues } from './types';

export const organizationSelectOptionFormatter = ({
  id: value,
  name: label,
}: {
  id: string;
  name: string;
}) => ({
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

  const { name, selected } = formValues;

  const oldLinks = [{ name: initialValues.name }];
  const newLinks = selected ? [{ name }] : [];
  const hasLinksChanged = !isEqual(oldLinks, newLinks);

  return {
    hasLinksChanged,
    shortLinks: hasLinksChanged ? newLinks : undefined,
  };
};
