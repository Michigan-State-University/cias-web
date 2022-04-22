import React, { useContext, memo } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import isNullOrUndefined from 'utils/isNullOrUndefined';
import arrowRightActive from 'assets/svg/arrow-right-active.svg';
import { colors, hexToRgb, themeColors } from 'theme';

import Box from 'components/Box';
import Column from 'components/Column';
import Divider from 'components/Divider';
import Icon from 'components/Icon';
import Img from 'components/Img';
import Radio from 'components/Radio';
import Row from 'components/Row';
import Text from 'components/Text';
import EllipsisText from 'components/Text/EllipsisText';

import messages from './messages';
import { InfiniteScrollContext } from '../utils';

const CopyItem = ({ data, index }) => {
  const {
    selectedItem,
    changeViewAction,
    selectAction,
    disableCopy,
    listIcon,
    disabledItemsIds,
  } = useContext(InfiniteScrollContext);
  const { formatMessage } = useIntl();
  const { items } = data;
  const element = items?.[index];
  const { id, name, sessions_size: sessionsSize } = element || {};
  const renderSizeLabel = (value, valueMsg, noValueMsg) => {
    if (!isNullOrUndefined(value)) {
      if (value === 0) return <Text fontSize={12}>{noValueMsg}</Text>;
      return (
        <Text fontSize={12}>
          {valueMsg}: {value}
        </Text>
      );
    }
  };
  const isDisabled = count =>
    disabledItemsIds?.includes(id) ||
    (disableCopy && !isNullOrUndefined(count) && count === 0);
  return (
    <Column key={`${id}-select-target-question-group-${index}`}>
      <Row
        width="100%"
        disabled={isDisabled(sessionsSize)}
        clickable
        align="center"
        justify="start"
        hoverColor={`rgba(${hexToRgb(themeColors.secondary)}, 0.1)`}
        onClick={() =>
          disableCopy
            ? changeViewAction({ id, name })
            : selectAction({ id, name })
        }
        px={25}
        py={15}
      >
        <Img src={listIcon} mr={10} />
        <Row mr={10} width="100%" justify="between" align="center">
          <Column>
            <Box maxWidth={170}>
              <EllipsisText text={name} fontSize={16} />
            </Box>
            {renderSizeLabel(
              sessionsSize,
              formatMessage(messages.sessions),
              formatMessage(messages.noSessions),
            )}
          </Column>
          <Row justify="center" align="center" mr={10}>
            {!disableCopy ? (
              <Radio checked={id === selectedItem?.id} />
            ) : (
              <Icon src={arrowRightActive} />
            )}
          </Row>
        </Row>
      </Row>
      <Row mx={25}>
        {index !== items.length - 1 && <Divider color={colors.linkWater} />}
      </Row>
    </Column>
  );
};

CopyItem.propTypes = {
  data: PropTypes.object,
  index: PropTypes.number,
};

export default memo(CopyItem);
