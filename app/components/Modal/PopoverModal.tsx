/**
 *
 * PopoverModal
 *
 */

import React, { useEffect, ReactNode, useRef, useLayoutEffect } from 'react';
import {
  arrow,
  shift,
  offset,
  useFloating,
  autoUpdate,
  flip,
} from '@floating-ui/react-dom';
import capitalize from 'lodash/capitalize';

import useKeyPress from 'utils/useKeyPress';
import { KeyCodes } from 'utils/constants';
import { GeometryHelper } from 'utils/mathUtils';

import { MODAL_PORTAL_ID } from 'containers/App/constants';
import Portal from 'components/Portal';

import {
  DimBackground,
  StyledArrow,
  StyledPopover,
  StyledPopoverContent,
} from './styled';
import {
  popoverMainAxisPlacement,
  popoverCrossAxisPlacement,
} from './constants';
import { PopoverPlacement } from './types';

export type Props = {
  children: ReactNode;
  referenceElement?: string;
  onClose?: () => void;
  portalId?: string;
  forceMobile?: boolean;
  width?: string;
  disableClose?: boolean;
};

const PopoverModal = ({
  children,
  referenceElement,
  onClose,
  portalId,
  forceMobile,
  width,
  disableClose = false,
}: Props): JSX.Element => {
  const arrowRef = useRef<HTMLElement>();

  const {
    x,
    y,
    reference,
    floating,
    strategy,
    middlewareData: { arrow: arrowMiddleware },
    refs: { floating: floatingRef, reference: referenceRef },
    placement,
    update,
  } = useFloating({
    placement: 'right',
    middleware: [
      offset(8),
      shift({
        padding: 16,
      }),
      flip({
        fallbackPlacements: ['left', 'top', 'bottom'],
        fallbackStrategy: 'bestFit',
      }),
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
    if (onClose && !disableClose) onClose();
  };

  // must be synchronous to properly detect outside clicks
  useLayoutEffect(() => {
    if (!referenceElement) {
      reference(null);
      return;
    }

    const currentElement = document.getElementById(referenceElement);
    if (currentElement) {
      reference(currentElement);
    }
  }, [referenceElement]);

  useEffect(() => {
    if (referenceRef.current) {
      window.addEventListener('click', handleClick, false);

      return () => {
        window.removeEventListener('click', handleClick, false);
      };
    }
  }, [referenceRef.current]);

  // Update on scroll and resize for all relevant nodes
  useEffect(() => {
    if (!referenceRef.current || !floatingRef.current) {
      return;
    }

    return autoUpdate(referenceRef.current, floatingRef.current, update);
  }, [referenceRef.current, floatingRef.current]);

  useKeyPress(KeyCodes.ESC, handleClose);

  const handleClick = (event: MouseEvent) => {
    const { target } = event;

    const isInside =
      !!referenceRef.current &&
      GeometryHelper.doesRectContainPoint(
        referenceRef.current.getBoundingClientRect() as DOMRect,
        {
          x: event.x,
          y: event.y,
        },
      );

    if (
      floatingRef &&
      !isInside &&
      !floatingRef.current?.contains(target as Node)
    )
      handleClose();
  };

  if (!referenceElement) return <></>;

  return (
    <Portal id={portalId ?? MODAL_PORTAL_ID}>
      <DimBackground $forceMobile={forceMobile} />
      <StyledPopover
        ref={floating}
        id="popover"
        $forceMobile={forceMobile}
        style={{
          width,
          position: strategy,
          top: y ?? '',
          left: x ?? '',
        }}
      >
        <StyledArrow
          ref={arrowRef}
          $forceMobile={forceMobile}
          style={{
            left: xArrow,
            top: yArrow,
            [arrowMainAxisPlacement]: -4.5,
            [`border${capitalize(arrowMainAxisPlacement)}Width`]: 1,
            [`border${capitalize(arrowCrossAxisPlacement)}Width`]: 1,
          }}
        />
        <StyledPopoverContent $forceMobile={forceMobile}>
          {children}
        </StyledPopoverContent>
      </StyledPopover>
    </Portal>
  );
};

export default PopoverModal;
