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

import { Label } from './styled';

type BoxCollapseType = {
  id?: string;
  children: ReactElement;
  label: string;
  onEdit?: () => void;
  onDelete?: () => void;
  disableAnimation?: boolean;
} & Record<string, unknown>;

export const BoxCollapse = ({
  id,
  children,
  label,
  onEdit,
  onDelete,
  disableAnimation,
  ...styleProps
}: BoxCollapseType) => {
  const [isOpened, setOpened] = useState(false);
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
        isBinInCollapse
        color={colors.lightBlue}
        binImage={BinIcon}
        onDelete={handleDelete}
        onToggle={toggleOpen}
        onHideImg={ArrowDown}
        onShowImg={ArrowUp}
        binMargin={20}
        px={16}
        py={0}
        height={null}
        label={
          <Label
            display="flex"
            justify="between"
            width="100%"
            align="center"
            py={16}
          >
            <Text fontSize="16px" fontWeight="bold" id={id}>
              {label}
            </Text>
            {onEdit && (
              <ImageButton
                src={EditIcon}
                onClick={(e: MouseEvent) => {
                  e.stopPropagation();
                  onEdit();
                }}
                mr={8}
                title="Edit item"
                fill={colors.heather}
              />
            )}
          </Label>
        }
        disableAnimation={disableAnimation}
      >
        <Box width="100%" px={16} pb={16}>
          <Divider mb={16} mt={1} />
          {children}
        </Box>
      </Collapse>
    </Box>
  );
};

export default BoxCollapse;
