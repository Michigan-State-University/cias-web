import React, { useRef, memo } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import { themeColors, colors } from 'theme';

import arrowBack from 'assets/svg/arrow-back.svg';

import Column from 'components/Column';
import Box from 'components/Box';
import Row from 'components/Row';
import EllipsisText from 'components/Text/EllipsisText';
import Text from 'components/Text';
import Icon from 'components/Icon';
import Loader from 'components/Loader';
import { VirtualGrid } from 'components/VirtualList';

import { InfiniteScrollContext } from '../utils';
import messages from './messages';
import CopyItem from './CopyItem';
import { chooserPanelMaxHeight, itemHeight } from './constants';

const ChooserComponent = ({
  elementId,
  items,
  backAction,
  backText,
  loading,
  currentPlaceTitle,
  currentPlaceName,
  selectedItem,
  changeViewAction,
  selectAction,
  disableCopy,
  listIcon,
  infiniteLoader,
  disabledItemsIds,
}) => {
  const { formatMessage } = useIntl();
  const infiniteLoaderRef = useRef();

  return (
    <Column data-testid={`${elementId}-select-target-session`} height="100%">
      <Column px={25} mb={15}>
        {backText && (
          <Row align="center" clickable onClick={() => backAction()}>
            <Icon src={arrowBack} />
            <Text ml={5} mt={2} color={themeColors.secondary}>
              {backText}
            </Text>
          </Row>
        )}
        <Row mt={10}>
          <Text fontWeight="bold" fontSize={15}>
            {currentPlaceTitle}
          </Text>
          <Row ml={5} flex={1} align="center">
            <EllipsisText
              fontWeight="bold"
              color={themeColors.secondary}
              fontSize={15}
              lineHeight={1.3}
              text={currentPlaceName}
            />
          </Row>
        </Row>
      </Column>
      <Box maxHeight={chooserPanelMaxHeight} overflow="scroll">
        <Column
          bg={colors.zirkon}
          height={(items?.length || 0) * itemHeight}
          maxHeight={chooserPanelMaxHeight}
        >
          <Box filled>
            {!!items?.length && (
              <InfiniteScrollContext.Provider
                value={{
                  selectedItem,
                  changeViewAction,
                  selectAction,
                  disableCopy,
                  listIcon,
                  disabledItemsIds,
                }}
              >
                <VirtualGrid
                  ref={infiniteLoaderRef}
                  columnCount={1}
                  rowCount={items?.length || 0}
                  rowHeight={itemHeight}
                  items={items}
                  gutterHeight={0}
                  gutterWidth={0}
                  infiniteLoader={
                    infiniteLoader
                      ? {
                          ...infiniteLoader,
                        }
                      : null
                  }
                >
                  {CopyItem}
                </VirtualGrid>
              </InfiniteScrollContext.Provider>
            )}
            {!loading && !items?.length && (
              <Column>
                <Row px={25} py={15}>
                  <Text fontSize={12}>
                    {formatMessage(messages.noValidQuestionGroups)}
                  </Text>
                </Row>
              </Column>
            )}
            {loading && !items?.length && (
              <Box width="100%">
                <Loader type="inline" />
              </Box>
            )}
          </Box>
        </Column>
      </Box>
    </Column>
  );
};

ChooserComponent.propTypes = {
  items: PropTypes.array,
  selectedItem: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  elementId: PropTypes.string,
  backAction: PropTypes.func,
  selectAction: PropTypes.func,
  changeViewAction: PropTypes.func,
  loading: PropTypes.bool,
  currentPlaceTitle: PropTypes.string,
  currentPlaceName: PropTypes.string,
  disableCopy: PropTypes.bool,
  backText: PropTypes.string,
  listIcon: PropTypes.string,
  infiniteLoader: PropTypes.object,
  disabledItemsIds: PropTypes.array,
};

export default memo(ChooserComponent);
