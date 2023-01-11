import React, { ReactElement, ReactNode, useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import isNil from 'lodash/isNil';

import Collapse from 'components/Collapse';
import CollapseIcon from 'components/Collapse/CollapseIcon';
import Text from 'components/Text';
import Box from 'components/Box';
import Divider from 'components/Divider';

import { colors } from 'theme';

import BinIcon from 'assets/svg/bin-no-bg.svg';
import EditIcon from 'assets/svg/edit.svg';
import ArrowDown from 'assets/svg/arrow-down-grey.svg';
import ArrowUp from 'assets/svg/arrow-up-grey.svg';

import messages from './messages';

type BoxCollapseType = {
  id?: string;
  children: ReactNode;
  label: ReactElement | string;
  onEdit?: () => void;
  saving?: boolean;
  onDelete?: () => void;
  deleting?: boolean;
  disableAnimation?: boolean;
  disabled?: boolean;
  labelBgColor?: string;
  labelBgOpacity?: number;
  labelPadding?: number;
  showDivider?: boolean;
  binFillColor?: string;
  arrowColor?: string;
  binProps?: object;
  contentStyle?: object;
  shouldBeOpenOnStart?: boolean;
  extraIcons?: ReactElement[];
  isOpen?: boolean;
  showArrow?: boolean;
  setOpen?: () => void;
  binMargin?: number;
  showHoverEffect?: boolean;
  iconProps?: object;
  labelOpenBgColor?: string;
} & Record<string, unknown>;

export const BoxCollapse = ({
  id,
  children,
  label,
  onEdit,
  saving,
  onDelete,
  deleting,
  disableAnimation,
  disabled = false,
  extraIcons,
  labelBgColor = colors.lightBlue,
  labelBgOpacity,
  binFillColor,
  binProps,
  arrowColor,
  labelPadding = 16,
  contentStyle,
  showDivider,
  shouldBeOpenOnStart,
  isOpen = undefined,
  showArrow = true,
  setOpen,
  binMargin,
  showHoverEffect,
  iconProps,
  labelOpenBgColor,
  ...styleProps
}: BoxCollapseType) => {
  const [isOpened, setOpened] = useState(!!shouldBeOpenOnStart);
  const toggleOpen = () => setOpened((prev) => !prev);
  const { formatMessage } = useIntl();

  useEffect(() => {
    if (!isNil(isOpen)) {
      setOpened(isOpen);
    }
  }, [isOpen]);

  const EditButton = (
    <CollapseIcon
      mr={showHoverEffect ? 4 : 8}
      icon={EditIcon}
      onClick={onEdit}
      title={formatMessage(messages.editItem)}
      fill={colors.heather}
      disabled={disabled}
      showHoverEffect={showHoverEffect}
      active={isOpened}
      iconProps={iconProps}
      loading={saving}
      buttonProps={saving ? { width: 28 } : undefined}
    />
  );

  return (
    <Box bg={colors.lightBlue} width="100%" {...styleProps}>
      <Collapse
        isOpened={isOpened}
        extraIcons={extraIcons}
        isBinInCollapse
        color={isOpened && labelOpenBgColor ? labelOpenBgColor : labelBgColor}
        bgOpacity={labelBgOpacity}
        // @ts-ignore
        binImage={BinIcon}
        binFillColor={binFillColor}
        onDelete={onDelete}
        deleting={deleting}
        onToggle={setOpen || toggleOpen}
        onHideImg={showArrow && ArrowDown}
        onShowImg={showArrow && ArrowUp}
        binMargin={binMargin ?? 20}
        px={16}
        py={0}
        height={null}
        binProps={{ ...binProps, ...iconProps }}
        arrowColor={arrowColor}
        showHoverEffect={showHoverEffect}
        label={
          <Box
            display="flex"
            justify="between"
            width="100%"
            align="center"
            py={labelPadding}
            color={colors.bluewood}
          >
            {typeof label === 'string' ? (
              <Text fontSize="16px" fontWeight="bold">
                {label}
              </Text>
            ) : (
              label
            )}
            {onEdit && EditButton}
          </Box>
        }
        disableAnimation={disableAnimation}
        disabled={disabled}
      >
        <Box width="100%" px={16} pb={16} {...contentStyle}>
          {showDivider && <Divider mb={16} mt={1} />}
          {children}
        </Box>
      </Collapse>
    </Box>
  );
};

export default BoxCollapse;
