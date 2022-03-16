import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, IntlShape } from 'react-intl';

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
  intl: { formatMessage },
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
}) => {
  const infiniteLoaderRef = useRef();
  return (
    <Column data-testid={`${elementId}-select-target-session`} height="100%">
      <Column mx={25} mb={15}>
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
          <Box ml={5} maxWidth={150}>
            <EllipsisText
              fontWeight="bold"
              color={themeColors.secondary}
              fontSize={15}
              text={currentPlaceName}
            />
          </Box>
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
  intl: PropTypes.shape(IntlShape),
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
};

export default injectIntl(ChooserComponent);
