import React, { ComponentProps, PropsWithChildren, ReactElement } from 'react';

import Column from 'components/Column';
import Text from 'components/Text';

import { ErrorText } from './styled';

export type Props = PropsWithChildren<{
  formikKey?: string;
  label?: string | ReactElement;
  touched: boolean;
  error: Nullable<string>;
  labelProps?: Partial<ComponentProps<typeof Text>>;
}> &
  Record<string, unknown>;

const FormikControlLayout = ({
  formikKey,
  label,
  touched,
  error,
  labelProps,
  children,
  ...columnStyleProps
}: Props) => {
  const showErrorMessage = touched && error;

  return (
    <Column {...columnStyleProps}>
      {label && (
        <label htmlFor={formikKey}>
          <Text mb={5} width="fit-content" {...labelProps}>
            {label}
          </Text>
        </label>
      )}
      {children}
      {showErrorMessage && <ErrorText>{error.toString()}</ErrorText>}
    </Column>
  );
};

export default FormikControlLayout;
