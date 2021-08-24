import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';

import { themeColors, colors } from 'theme';

import arrowBack from 'assets/svg/arrow-back.svg';

import isNullOrUndefined from 'utils/isNullOrUndefined';

import Column from 'components/Column';
import Box from 'components/Box';
import Row from 'components/Row';
import EllipsisText from 'components/Text/EllipsisText';
import Text from 'components/Text';
import Icon from 'components/Icon';
import Divider from 'components/Divider';
import Loader from 'components/Loader';

import messages from './messages';
import CopyRadioRow from './CopyRadioRow';
import CopyNavigationRow from './CopyNavigationRow';

const ChooserComponent = ({
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
  const { formatMessage } = useIntl();

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

  const isDisabled = (count) =>
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
                {!disableCopy ? (
                  <CopyRadioRow
                    checked={id === selectedItem?.id}
                    disabled={isDisabled(sessionsSize)}
                    onClick={() => selectAction({ id, name })}
                    id={id}
                    label={renderSizeLabel(
                      sessionsSize,
                      formatMessage(messages.sessions),
                      formatMessage(messages.noSessions),
                    )}
                    listIcon={listIcon}
                    name={name}
                  />
                ) : (
                  <CopyNavigationRow
                    disabled={isDisabled(sessionsSize)}
                    onClick={() => changeViewAction({ id, name })}
                    label={renderSizeLabel(
                      sessionsSize,
                      formatMessage(messages.sessions),
                      formatMessage(messages.noSessions),
                    )}
                    listIcon={listIcon}
                    name={name}
                  />
                )}
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

export default memo(ChooserComponent);
