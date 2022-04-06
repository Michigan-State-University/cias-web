import React, { ReactElement, useState } from 'react';

import Collapse from 'components/Collapse';
import { ImageButton } from 'components/Button';
import Text from 'components/Text';
import Box from 'components/Box';
import Divider from 'components/Divider';

import { colors } from 'theme';

import BinIcon from 'assets/svg/bin-no-bg.svg';
import EditIcon from 'assets/svg/edit.svg';
import ArrowDown from 'assets/svg/arrow-down-grey.svg';
import ArrowUp from 'assets/svg/arrow-up-grey.svg';

type BoxCollapseType = {
  id?: string;
  children: ReactElement;
  label: string;
  onEdit?: () => void;
  onDelete?: () => void;
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
} & Record<string, unknown>;

export const BoxCollapse = ({
  id,
  children,
  label,
  onEdit,
  onDelete,
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
  ...styleProps
}: BoxCollapseType) => {
  const [isOpened, setOpened] = useState(!!shouldBeOpenOnStart);
  const toggleOpen = () => setOpened((prev) => !prev);

  const handleDelete = onDelete
    ? (e: MouseEvent) => {
        e.stopPropagation();
        onDelete();
      }
    : undefined;

  return (
    <Box bg={colors.lightBlue} width="100%" {...styleProps}>
      <Collapse
        isOpened={isOpened}
        extraIcons={extraIcons}
        isBinInCollapse
        color={labelBgColor}
        bgOpacity={labelBgOpacity}
        binImage={BinIcon}
        binFillColor={binFillColor}
        onDelete={handleDelete}
        onToggle={toggleOpen}
        onHideImg={ArrowDown}
        onShowImg={ArrowUp}
        binMargin={20}
        px={16}
        py={0}
        height={null}
        binProps={binProps}
        arrowColor={arrowColor}
        label={
          <Box
            display="flex"
            justify="between"
            width="100%"
            align="center"
            py={labelPadding}
            color={colors.bluewood}
          >
            <Text fontSize="16px" fontWeight="bold">
              {label}
            </Text>
            {onEdit && (
              <ImageButton
                src={EditIcon}
                onClick={(e: React.MouseEvent) => {
                  if (onEdit) {
                    e.stopPropagation();
                    onEdit();
                  }
                }}
                mr={8}
                title="Edit item"
                fill={colors.heather}
                disabled={disabled}
              />
            )}
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
