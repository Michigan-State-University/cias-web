import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Collapse from 'components/Collapse';
import { ImageButton } from 'components/Button/ImageButton';
import Text from 'components/Text';
import Box from 'components/Box';
import Divider from 'components/Divider';

import { colors } from 'theme';

import BinIcon from 'assets/svg/bin-no-bg.svg';
import EditIcon from 'assets/svg/edit.svg';
import ArrowDown from 'assets/svg/arrow-down-grey.svg';
import ArrowUp from 'assets/svg/arrow-up-grey.svg';

export const BoxCollapse = ({
  children,
  label,
  onEdit,
  onDelete,
  labelBgColor,
  labelBgOpacity,
  labelPadding,
  showDivider,
  binFillColor,
  arrowColor,
  binProps,
  contentStyle,
  shouldBeOpenOnStart,
  extraIcons,
  ...styleProps
}) => {
  const [isOpened, setOpened] = useState(!!shouldBeOpenOnStart);
  const toggleOpen = () => setOpened((prev) => !prev);

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
        onDelete={(e) => {
          if (onDelete) {
            e.stopPropagation();
            onDelete();
          }
        }}
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
                onClick={(e) => {
                  if (onEdit) {
                    e.stopPropagation();
                    onEdit();
                  }
                }}
                mr={8}
                title="Edit item"
                fill={colors.heather}
              />
            )}
          </Box>
        }
      >
        <Box width="100%" px={16} pb={16} {...contentStyle}>
          {showDivider && <Divider mb={16} mt={1} />}
          {children}
        </Box>
      </Collapse>
    </Box>
  );
};

BoxCollapse.defaultProps = {
  labelPadding: 16,
  labelBgColor: colors.lightBlue,
};

BoxCollapse.propTypes = {
  children: PropTypes.node,
  label: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  labelBgColor: PropTypes.string,
  labelBgOpacity: PropTypes.number,
  showDivider: PropTypes.bool,
  labelPadding: PropTypes.number,
  binFillColor: PropTypes.string,
  arrowColor: PropTypes.string,
  binProps: PropTypes.object,
  contentStyle: PropTypes.object,
  shouldBeOpenOnStart: PropTypes.bool,
  extraIcons: PropTypes.node,
};

export default BoxCollapse;
