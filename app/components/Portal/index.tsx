/**
 *
 * Portal
 *
 */

import {
  forwardRef,
  memo,
  ReactNode,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';

import { createPortal } from 'react-dom';

type Props = {
  id: string;
  children: ReactNode;
};

const Portal = forwardRef<HTMLElement | null, Props>(
  ({ children, id }: Props, ref) => {
    const portalRef = useRef<HTMLElement | null>(null);

    const component = useMemo(() => {
      const element = document.getElementById(id);

      return element;
    }, [id]);

    portalRef.current = component;

    useImperativeHandle(ref, () => portalRef.current as HTMLElement);

    if (!component) return null;
    return createPortal(children, component);
  },
);

export default memo(Portal);
