import React, { useState, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Box from 'components/Box';
import BoxCollapse from 'components/BoxCollapse';
import Text from 'components/Text';
import { FormikHookInput } from 'components/FormikInput';

import { ParticipantLink } from 'models/NavigatorSetup';

import { themeColors } from 'theme';
import { requiredValidationSchema } from 'utils/validators';

import messages from '../messages';

type Props = {
  link: ParticipantLink;
  updateParticipantLink: (data: Partial<Omit<ParticipantLink, 'id'>>) => void;
  removeParticipantLink: () => void;
};

export const NavigatorLinkBox = ({
  link,
  updateParticipantLink,
  removeParticipantLink,
}: Props) => {
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

  const handleBlur = () => {
    updateParticipantLink(formik.values);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnMount: false,
    onSubmit: handleBlur,
  });

  return (
    <BoxCollapse
      label={
        <Text
          color={themeColors.primary}
          fontWeight="bold"
          textDecoration="underline"
        >
          {formik.values.displayName || formatMessage(messages.newLink)}
        </Text>
      }
      onEdit={() => setOpen((prev) => !prev)}
      onDelete={removeParticipantLink}
      showArrow={false}
      isOpen={open}
      setOpen={() => setOpen((prev) => !prev)}
      labelPadding={6}
      binMargin={0}
      showDivider
      showHoverEffect
      shouldBeOpenOnStart
      iconProps={{ width: 16, height: 16 }}
    >
      <Box mb={12}>
        {/* @ts-ignore */}
        <FormikHookInput
          formikKey="displayName"
          formikState={formik}
          placeholder={formatMessage(messages.displayName)}
          label={formatMessage(messages.displayName)}
          inputProps={{ width: '100%' }}
          onBlur={handleBlur}
        />
      </Box>
      {/* @ts-ignore */}
      <FormikHookInput
        formikKey="url"
        formikState={formik}
        placeholder={formatMessage(messages.linkPlaceholder)}
        label={formatMessage(messages.link)}
        inputProps={{ width: '100%' }}
        onBlur={handleBlur}
      />
    </BoxCollapse>
  );
};

export default NavigatorLinkBox;
