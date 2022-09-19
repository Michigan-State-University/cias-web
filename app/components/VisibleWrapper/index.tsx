import React from 'react';
import { Visible } from 'react-grid-system';

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

type VisibleWrapperProps = {
  children: any;
  start?: Breakpoint;
  end?: Breakpoint;
};

const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

export const VisibleWrapper = ({
  children,
  start,
  end,
}: VisibleWrapperProps) => {
  const breakpointStartIndex = breakpoints.indexOf(start || 'xs');
  const breakpointEndIndex = breakpoints.indexOf(end || 'xxl');
  const visibleBreakpoints = breakpoints.slice(
    breakpointStartIndex,
    breakpointEndIndex + 1,
  );

  const props = visibleBreakpoints.reduce(
    (o, key) => ({ ...o, [key]: true }),
    {},
  );

  return <Visible {...props}>{children}</Visible>;
};
