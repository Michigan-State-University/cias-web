import {
  createElement,
  ReactElement,
  JSXElementConstructor,
  ComponentProps,
} from 'react';

type Component = keyof JSX.IntrinsicElements | JSXElementConstructor<any>;

type Props<T extends Component> = {
  if: Nullable<boolean>;
  with: T;
  wrapperProps: ComponentProps<T>;
  children: ReactElement;
};

const ConditionalWrapper = <T extends Component>({
  if: condition,
  with: wrapper,
  wrapperProps,
  children,
}: Props<T>) =>
  condition ? createElement(wrapper, wrapperProps, [children]) : children;

export default ConditionalWrapper;
