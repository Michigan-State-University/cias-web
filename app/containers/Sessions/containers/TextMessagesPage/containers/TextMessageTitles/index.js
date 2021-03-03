import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Row } from 'react-grid-system';
import { connect } from 'react-redux';

import TileMapper from 'components/TileMapper';
import Text from 'components/Text';
import Column from 'components/Column';
import Img from 'components/Img';
import Loader from 'components/Loader';

import addSign from 'assets/svg/addSign.svg';
import { TextMessagesBuilder } from 'models/TextMessage';
import { createTextMessageRequest } from 'global/reducers/textMessages';
import { colors } from 'theme';

import { compose } from 'redux';
import {
  EMPTY_TILE,
  ADD_TILE,
  itemsMapper,
} from 'containers/Sessions/containers/TextMessagesPage/containers/TextMessageTitles/utils';
import { TextMessagesContext } from '../../utils';
import {
  StyledTile,
  StyledTilesContainer,
  StyledEmptyTile,
  StyledCreateTile,
} from './styled';
import messages from './messages';

const SmsTiles = ({ createTextMessage }) => {
  const {
    textMessages,
    formatMessage,
    loaders: { fetchTextMessagesLoading, createTextMessagesLoading },
    changeSelectedId,
    selectedMessageId,
    sessionId,
    editingPossible,
  } = useContext(TextMessagesContext);

  const handleCreateTextMessages = () => {
    if (!editingPossible) return;
    const newTextMessage = new TextMessagesBuilder().buildNewTextMessage(
      formatMessage(messages.defaultName),
      sessionId,
    );
    createTextMessage(newTextMessage);
  };

  const renderTile = ({ id, type, name, schedule, schedulePayload }) => {
    if (type === EMPTY_TILE)
      return <StyledEmptyTile key={`id-empty-tile-text-message-${id}`} />;
    if (type === ADD_TILE)
      return (
        <StyledCreateTile key={`id-empty-tile-text-message-${id}`}>
          <Column
            onClick={handleCreateTextMessages}
            disabled={createTextMessagesLoading || !editingPossible}
            align="center"
            justify="center"
            height="100%"
          >
            <Img src={addSign} />
            <Text mt={10} fontWeight="bold" fontSize={15} color={colors.white}>
              {formatMessage(messages.createTextMessage)}
            </Text>
          </Column>
        </StyledCreateTile>
      );
    return (
      <StyledTile
        active={selectedMessageId === id}
        onClick={() => changeSelectedId(id)}
        key={`id-tile-text-message-${id}`}
      >
        {id ? (
          <>
            <Text fontSize={18} fontWeight="bold">
              {name}
            </Text>
            <Text mt={5}>
              {formatMessage(messages[schedule], {
                days: schedulePayload ?? '_',
              })}
            </Text>
          </>
        ) : (
          <Loader type="inline" />
        )}
      </StyledTile>
    );
  };

  return (
    <StyledTilesContainer>
      <Row xs={12} md={6} xxl={4} style={{ justifyContent: 'center' }}>
        <TileMapper
          items={itemsMapper(textMessages)}
          component={renderTile}
          loading={fetchTextMessagesLoading}
        />
      </Row>
    </StyledTilesContainer>
  );
};

SmsTiles.propTypes = {
  createTextMessage: PropTypes.func,
};

const mapDispatchToProps = {
  createTextMessage: createTextMessageRequest,
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(SmsTiles);