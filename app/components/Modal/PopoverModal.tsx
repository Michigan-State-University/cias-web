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
  CSSProperties,
  useCallback,
} from 'react';
import {
  arrow,
  shift,
  offset,
  useFloating,
  autoUpdate,
  flip,
  Placement,
  Padding,
} from '@floating-ui/react-dom';
import { Options as OffsetOptions } from '@floating-ui/core/src/middleware/offset';
import capitalize from 'lodash/capitalize';

import { ZIndex } from 'theme';

import useKeyPress from 'utils/useKeyPress';
import { KeyCodes } from 'utils/constants';
import { GeometryHelper } from 'utils/mathUtils';
import { applyStyle } from 'utils/applyStyle';
import { callback } from 'utils/callback';

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
  DIM_ELEMENT_STYLE,
} from './constants';
import { PopoverPlacement } from './types';

export type Props = {
  children: ReactNode;
  referenceElement?: string;
  onClose?: () => void;
  portalId?: string;
  specialMobileView?: boolean;
  forceMobile?: boolean;
  forceDim?: boolean;
  hideArrow?: boolean;
  excludeRefDim?: boolean | Partial<CSSProperties>;
  width?: string;
  disableClose?: boolean;
  defaultPlacement?: Placement;
  offsetOptions?: OffsetOptions;
  modalStyle?: Partial<CSSProperties>;
  contentPadding?: CSSProperties['padding'];
  shiftPadding?: Padding;
  zIndex?: number;
};

const PopoverModal = ({
  children,
  referenceElement,
  onClose,
  portalId,
  specialMobileView = false,
  forceMobile,
  forceDim = false,
  excludeRefDim = false,
  width,
  disableClose = false,
  defaultPlacement = 'right',
  offsetOptions = 8,
  modalStyle,
  contentPadding,
  hideArrow,
  shiftPadding = 16,
  zIndex = ZIndex.POPOVER_MODAL,
}: Props): JSX.Element => {
  const arrowRef = useRef<HTMLElement>();
  const portalRef = useRef<HTMLElement>(null);

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
    placement: defaultPlacement,
    middleware: [
      offset(offsetOptions),
      shift({
        padding: shiftPadding,
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

  // must be synchronous to properly detect outside clicks
  useLayoutEffect(() => {
    if (!referenceElement) {
      reference(null);
      return;
    }

    referenceElementForModal(referenceElement);
  }, [referenceElement]);

  const referenceElementForModal = (referenceString: string) => {
    const currentElement = document.getElementById(referenceString);

    if (currentElement) {
      reference(currentElement);
    }
  };

  const updateModal = useCallback(() => {
    const canUpdateOrReferenceNewElement =
      referenceElement && portalRef.current;

    if (!canUpdateOrReferenceNewElement) return;

    const hasElementChangedReference = !portalRef.current.contains(
      referenceRef.current as Element,
    );

    if (hasElementChangedReference) {
      referenceElementForModal(referenceElement);
    }

    update();
  }, [update, referenceElement, portalRef.current, referenceRef.current]);

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

    return callback(
      autoUpdate(referenceRef.current, floatingRef.current, updateModal),
      applyStyle(referenceRef.current as HTMLElement, {
        ...DIM_ELEMENT_STYLE,
        ...(typeof excludeRefDim === 'object' ? excludeRefDim : {}),
      }),
    );
  }, [referenceRef.current, floatingRef.current, updateModal, excludeRefDim]);

  const handleClose = () => {
    if (onClose && !disableClose) onClose();
  };

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
    <Portal id={portalId ?? MODAL_PORTAL_ID} ref={portalRef}>
      <DimBackground
        $specialMobileView={specialMobileView}
        $forceMobile={forceMobile}
        $forceDim={forceDim}
      />
      <StyledPopover
        ref={floating}
        id="popover"
        $specialMobileView={specialMobileView}
        $forceMobile={forceMobile}
        style={{
          width,
          position: strategy,
          top: y ?? '',
          left: x ?? '',
          ...modalStyle,
        }}
        zIndex={zIndex}
      >
        {!hideArrow && (
          <StyledArrow
            ref={arrowRef}
            $specialMobileView={specialMobileView}
            $forceMobile={forceMobile}
            style={{
              left: xArrow,
              top: yArrow,
              [arrowMainAxisPlacement]: -4.5,
              [`border${capitalize(arrowMainAxisPlacement)}Width`]: 1,
              [`border${capitalize(arrowCrossAxisPlacement)}Width`]: 1,
              borderColor: modalStyle?.borderColor,
            }}
          />
        )}
        <StyledPopoverContent
          $specialMobileView={specialMobileView}
          $forceMobile={forceMobile}
          padding={contentPadding}
        >
          {children}
        </StyledPopoverContent>
      </StyledPopover>
    </Portal>
  );
};

export default PopoverModal;
