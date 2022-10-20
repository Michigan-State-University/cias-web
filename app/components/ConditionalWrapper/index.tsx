import {
  createElement,
  FunctionComponent,
  ComponentClass,
  ReactElement,
} from 'react';

type Props = {
  if?: boolean;
  with: string | FunctionComponent<any> | ComponentClass<any, any>;
  wrapperProps: object;
  children: ReactElement;
};

const ConditionalWrapper = ({
  if: condition,
  with: wrapper,
  wrapperProps,
  children,
}: Props) =>
  condition ? createElement(wrapper, wrapperProps, [children]) : children;

export default ConditionalWrapper;
