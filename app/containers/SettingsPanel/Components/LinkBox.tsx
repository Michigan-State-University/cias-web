import React, { useState, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Column from 'components/Column';
import BoxCollapse from 'components/BoxCollapse';
import Text from 'components/Text';
import { FormikHookInput } from 'components/FormikInput';

import { Link, LinkData } from 'models/NavigatorSetup';

import { themeColors } from 'theme';
import { requiredValidationSchema } from 'utils/validators';

import messages from '../messages';

type Props = {
  link: Link;
  updateLink: (data: LinkData) => void;
  removeLink: () => void;
};

export const LinkBox = ({ link, updateLink, removeLink }: Props) => {
  const { formatMessage } = useIntl();
  const [open, setOpen] = useState(!(link.displayName && link.url));

  const validationSchema = Yup.object().shape({
    displayName: requiredValidationSchema,
    url: requiredValidationSchema.url(
      formatMessage(messages.urlValidationError),
    ),
  });

  const initialValues = useMemo(
    () => ({
      displayName: link.displayName || '',
      url: link.url || '',
    }),
    [],
  );

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnMount: false,
    onSubmit: updateLink,
  });

  const { submitForm, values } = formik;

  return (
    <BoxCollapse
      label={
        <Text
          color={themeColors.primary}
          fontWeight="bold"
          textDecoration="underline"
          lineHeight={1}
        >
          {values.displayName || formatMessage(messages.newLink)}
        </Text>
      }
      onEdit={() => setOpen((prev) => !prev)}
      saving={link.saving}
      onDelete={removeLink}
      deleting={link.deleting}
      showArrow={false}
      isOpen={open}
      setOpen={() => setOpen((prev) => !prev)}
      labelPadding={5}
      binMargin={0}
      showDivider
      showHoverEffect
      shouldBeOpenOnStart
      iconProps={{ width: 16, height: 16 }}
    >
      <Column px={8} gap={12}>
        {/* @ts-ignore */}
        <FormikHookInput
          formikKey="displayName"
          formikState={formik}
          placeholder={formatMessage(messages.displayName)}
          label={formatMessage(messages.displayName)}
          inputProps={{ width: '100%' }}
          onBlur={submitForm}
        />
        {/* @ts-ignore */}
        <FormikHookInput
          formikKey="url"
          formikState={formik}
          placeholder={formatMessage(messages.linkPlaceholder)}
          label={formatMessage(messages.link)}
          inputProps={{ width: '100%' }}
          onBlur={submitForm}
        />
      </Column>
    </BoxCollapse>
  );
};

export default LinkBox;
