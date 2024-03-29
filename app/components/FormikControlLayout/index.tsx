import React, { ComponentProps, PropsWithChildren, ReactElement } from 'react';

import Column from 'components/Column';
import Text from 'components/Text';

import { themeColors } from 'theme';

import { ErrorText } from './styled';

export type Props = PropsWithChildren<{
  formikKey?: string;
  label?: string | ReactElement;
  touched: boolean;
  error: Nullable<string>;
  labelProps?: Partial<ComponentProps<typeof Text>>;
  required?: boolean;
  hideErrorMessages?: boolean;
}> &
  Record<string, unknown>;

const FormikControlLayout = ({
  formikKey,
  label,
  touched,
  error,
  labelProps,
  children,
  required,
  hideErrorMessages,
  ...columnStyleProps
}: Props) => {
  const showErrorMessage = touched && error && !hideErrorMessages;

  return (
    <Column {...columnStyleProps}>
      {label && (
        <label htmlFor={formikKey}>
          <Text mb={5} fontSize="12px" width="fit-content" {...labelProps}>
            {label}
            {required && (
              <Text color={themeColors.warning} as="span">
                *
              </Text>
            )}
          </Text>
        </label>
      )}
      {children}
      {showErrorMessage && <ErrorText>{error.toString()}</ErrorText>}
    </Column>
  );
};

export default FormikControlLayout;
export { ErrorText };
