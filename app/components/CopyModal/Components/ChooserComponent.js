import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, IntlShape } from 'react-intl';

import Column from 'components/Column';
import Box from 'components/Box';
import Row from 'components/Row';
import Img from 'components/Img';
import EllipsisText from 'components/Text/EllipsisText';
import Text from 'components/Text';
import Icon from 'components/Icon';
import Divider from 'components/Divider';
import Loader from 'components/Loader';
import Radio from 'components/Radio';

import arrowRightActive from 'assets/svg/arrow-right-active.svg';
import arrowBack from 'assets/svg/arrow-back.svg';
import { hexToRgb, themeColors, colors } from 'theme';
import isNullOrUndefined from 'utils/isNullOrUndefined';
import messages from './messages';

const ChooserComponent = ({
  intl: { formatMessage },
  elementId,
  items,
  selectedItem,
  backAction,
  backText,
  changeViewAction,
  selectAction,
  loading,
  currentPlaceTitle,
  currentPlaceName,
  disableCopy,
  listIcon,
}) => {
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
    disableCopy && !isNullOrUndefined(count) && count === 0;

  return (
    <Column data-testid={`${elementId}-select-target-session`} height={280}>
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
      <Box maxHeight="300px" overflow="scroll">
        <Column bg={colors.zirkon}>
          {loading && (
            <Box width="100%">
              <Loader type="inline" hidden={false} />
            </Box>
          )}
          {!loading &&
            !!items?.length &&
            items.map(({ id, name, sessions_size: sessionsSize }, index) => (
              <Column
                key={`${elementId}-select-target-question-group-${index}`}
              >
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
                  {index !== items.length - 1 && (
                    <Divider color={colors.linkWater} />
                  )}
                </Row>
              </Column>
            ))}
          {!loading && !items?.length && (
            <Column>
              <Row px={25} py={15}>
                <Text fontSize={12}>
                  {formatMessage(messages.noValidQuestionGroups)}
                </Text>
              </Row>
            </Column>
          )}
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
};

export default injectIntl(ChooserComponent);
