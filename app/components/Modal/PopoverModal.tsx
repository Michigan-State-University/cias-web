/**
 *
 * PopoverModal
 *
 */

import React, {
  useEffect,
  ReactNode,
  useRef,
  useLayoutEffect,
  useState,
} from 'react';
import {
  arrow,
  flip,
  shift,
  offset,
  useFloating,
  getScrollParents,
} from '@floating-ui/react-dom';
import capitalize from 'lodash/capitalize';

import useKeyPress from 'utils/useKeyPress';
import { KeyCodes } from 'utils/constants';
import { GeometryHelper } from 'utils/mathUtils';

import { MODAL_PORTAL_ID } from 'containers/App/constants';
import Portal from 'components/Portal';

import { StyledArrow, StyledPopover, StyledPopoverContent } from './styled';
import {
  popoverMainAxisPlacement,
  popoverCrossAxisPlacement,
} from './constants';
import { PopoverPlacement } from './types';

export type Props = {
  children: ReactNode;
  referenceElement?: string;
  onClose?: () => void;
};

const PopoverModal = ({
  children,
  referenceElement,
  onClose,
}: Props): JSX.Element => {
  const arrowRef = useRef<HTMLElement>();
  const [element, setElement] = useState<HTMLElement | null>();

  const {
    x,
    y,
    reference,
    floating,
    strategy,
    middlewareData: { arrow: arrowMiddleware },
    refs: { floating: floatingRef },
    placement,
    update,
  } = useFloating({
    placement: 'right',
    middleware: [
      offset(8),
      flip(),
      shift(),
      ...(arrowRef.current
        ? [arrow({ element: arrowRef.current, padding: 5 })]
        : []),
    ],
  });

  const popoverPlacement = placement.split('-')[0] as PopoverPlacement;
  const { x: xArrow, y: yArrow } = arrowMiddleware ?? {};
  const { [popoverPlacement]: arrowMainAxisPlacement } =
    popoverMainAxisPlacement;
  const { [popoverPlacement]: arrowCrossAxisPlacement } =
    popoverCrossAxisPlacement;

  const handleClose = () => {
    if (onClose) onClose();
  };

  // must be synchronous to properly detect outside clicks
  useLayoutEffect(() => {
    if (!referenceElement) {
      setElement(undefined);
      return;
    }

    const currentElement = document.getElementById(referenceElement);
    if (currentElement) {
      reference(currentElement);
      setElement(currentElement);
    }
  }, [referenceElement]);

  useEffect(() => {
    if (element) {
      window.addEventListener('click', handleClick, false);

      return () => {
        window.removeEventListener('click', handleClick, false);
      };
    }
  }, [element]);

  // Update on scroll and resize for all relevant nodes
  useEffect(() => {
    if (!element || !floatingRef.current) {
      return;
    }

    const parents = [
      ...getScrollParents(element),
      ...getScrollParents(floatingRef.current),
    ];

    parents.forEach((parent) => {
      parent.addEventListener('scroll', update, false);
      parent.addEventListener('resize', update, false);
    });

    return () => {
      parents.forEach((parent) => {
        parent.removeEventListener('scroll', update);
        parent.removeEventListener('resize', update);
      });
    };
  }, [element, floatingRef.current]);

  useKeyPress(KeyCodes.ESC, handleClose);

  const handleClick = (event: MouseEvent) => {
    const { target } = event;

    const isInside =
      !!element &&
      GeometryHelper.doesRectContainPoint(element.getBoundingClientRect(), {
        x: event.pageX,
        y: event.pageY,
      });

    if (
      floatingRef &&
      !isInside &&
      !floatingRef.current?.contains(target as Node)
    )
      handleClose();
  };

  if (!element) return <></>;

  return (
    <Portal id={MODAL_PORTAL_ID}>
      <StyledPopover
        ref={floating}
        id="popover"
        style={{
          zIndex: 1,
          position: strategy,
          top: y ?? '',
          left: x ?? '',
        }}
      >
        <StyledPopoverContent>{children}</StyledPopoverContent>
        <StyledArrow
          ref={arrowRef}
          style={{
            left: xArrow,
            top: yArrow,
            [arrowMainAxisPlacement]: -4.5,
            [`border${capitalize(arrowMainAxisPlacement)}Width`]: 1,
            [`border${capitalize(arrowCrossAxisPlacement)}Width`]: 1,
          }}
        />
      </StyledPopover>
    </Portal>
  );
};

export default PopoverModal;
