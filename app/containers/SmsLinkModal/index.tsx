import Box from 'components/Box';
import Row from 'components/Row';
import {
  CSSProperties,
  useState,
  memo,
  useLayoutEffect,
  useCallback,
  useRef,
} from 'react';
import { boxShadows, colors } from 'theme';
import useOutsideClick from 'utils/useOutsideClick';
import ModalView from './Components/ModalView';

export type Props = {
  children: JSX.Element;
  disabled: boolean;
  onClick: (linkType: string, url: string) => void;
  placement?: 'left' | 'right';
  topPosition?: string;
  dropdownWidth?: CSSProperties['width'];
};

const SmsLinkModal = ({
  children,
  disabled,
  onClick,
  placement = 'right',
  topPosition,
  dropdownWidth = 'auto',
}: Props) => {
  const smsLinkModal = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen);
  const closeModal = () => setIsOpen(false);

  useLayoutEffect(() => {}, [isOpen]);

  const handleOnChoose = useCallback(
    (linkType: string, url: string) => {
      onClick(linkType, url);
      closeModal();
    },
    [onClick],
  );

  useOutsideClick(smsLinkModal, closeModal, isOpen);

  const displayContent = useCallback(() => {
    if (!isOpen) return null;

    return <ModalView onClick={handleOnChoose} />;
  }, [handleOnChoose, isOpen]);

  return (
    <Box position="relative" ref={smsLinkModal}>
      <Box onClick={toggleModal} disabled={disabled} clickable>
        {children}
      </Box>
      <Box
        bg={colors.white}
        borderRadius={10}
        shadow={boxShadows.black}
        position="absolute"
        width={dropdownWidth}
        top={topPosition}
        {...(isOpen ? { zIndex: 2, [placement]: '0px' } : { display: 'none' })}
      >
        <Row>
          <Box padding={8} filled maxWidth="100%">
            {displayContent()}
          </Box>
        </Row>
      </Box>
    </Box>
  );
};

export default memo(SmsLinkModal);
