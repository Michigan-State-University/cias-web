import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-grid-system';
import { compose } from 'redux';
import { injectReducer, injectSaga } from 'redux-injectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';

import Row from 'components/Row';

import {
  textMessagesReducer,
  allTextMessagesSagas,
  makeSelectTextMessages,
  makeSelectLoaders,
  makeSelectErrors,
  fetchTextMessagesRequest,
  makeSelectSelectedMessageId,
  changeSelectedMessageId,
  makeSelectSelectedMessage,
} from 'global/reducers/textMessages';
import {
  makeSelectInterventionStatus,
  interventionReducer,
  fetchInterventionSaga,
  fetchInterventionRequest,
} from 'global/reducers/intervention';

import { canEdit } from 'models/Status/statusPermissions';

import TextMessageTiles from './containers/TextMessageTitles';
import TextMessageSettings from './containers/TextMessageSettings';
import { TextMessagesContext } from './utils';
const TextMessagingPage = ({
  intl: { formatMessage },
  match: {
    params: { sessionId, interventionId },
  },
  fetchTextMessages,
  textMessages,
  loaders,
  errors,
  selectedMessageId,
  changeSelectedId,
  selectedMessage,
  status,
  fetchIntervention,
}) => {
  useEffect(() => {
    fetchTextMessages(sessionId);
  }, [sessionId]);

  useEffect(() => {
    fetchIntervention(interventionId);
  }, [interventionId]);

  const editingPossible = canEdit(status);
  return (
    <TextMessagesContext.Provider
      value={{
        formatMessage,
        textMessages,
        loaders,
        errors,
        selectedMessageId,
        changeSelectedId,
        sessionId,
        selectedMessage,
        editingPossible,
      }}
    >
      <Row maxHeigh="100%" style={{ justifyContent: 'center' }}>
        <Col md={8}>
          <TextMessageTiles />
        </Col>
        {selectedMessageId && selectedMessage && (
          <Col>
            <TextMessageSettings />
          </Col>
        )}
      </Row>
    </TextMessagesContext.Provider>
  );
};

TextMessagingPage.propTypes = {
  intl: intlShape,
  fetchTextMessages: PropTypes.func,
  textMessages: PropTypes.array,
  loaders: PropTypes.object,
  errors: PropTypes.object,
  selectedMessageId: PropTypes.string,
  changeSelectedId: PropTypes.func,
  match: PropTypes.object,
  selectedMessage: PropTypes.object,
  status: PropTypes.string,
  fetchIntervention: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  textMessages: makeSelectTextMessages(),
  selectedMessageId: makeSelectSelectedMessageId(),
  selectedMessage: makeSelectSelectedMessage(),
  loaders: makeSelectLoaders(),
  errors: makeSelectErrors(),
  status: makeSelectInterventionStatus(),
});

const mapDispatchToProps = {
  fetchTextMessages: fetchTextMessagesRequest,
  changeSelectedId: changeSelectedMessageId,
  fetchIntervention: fetchInterventionRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  injectReducer({ key: 'textMessages', reducer: textMessagesReducer }),
  injectReducer({ key: 'intervention', reducer: interventionReducer }),
  injectSaga({ key: 'textMessagesSaga', saga: allTextMessagesSagas }),
  injectSaga({ key: 'fetchIntervention', saga: fetchInterventionSaga }),
)(injectIntl(TextMessagingPage));
