import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-grid-system';
import { compose } from 'redux';
import { injectReducer, injectSaga } from 'redux-injectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { useIntl } from 'react-intl';
import { Helmet } from 'react-helmet';

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
  makeSelectFilters,
  INITIAL_FILTERS,
  setFiltersAction,
  makeSelectSelectedMessageState,
} from 'global/reducers/textMessages';
import {
  interventionReducer,
  fetchInterventionSaga,
  fetchInterventionRequest,
  makeSelectEditingPossible,
} from 'global/reducers/intervention';
import {
  getSessionRequest,
  getSessionSaga,
  sessionReducer,
} from 'global/reducers/session';

import Row from 'components/Row';
import { Filters } from 'components/Filters';

import TextMessageTiles from './containers/TextMessageTitles';
import TextMessageSettings from './containers/TextMessageSettings';
import { TextMessagesContext } from './utils';
import messages from './messages';

const TextMessagingPage = ({
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
  selectedMessageState,
  fetchIntervention,
  fetchSession,
  filters,
  setFilters,
  editingPossible,
}) => {
  const { formatMessage } = useIntl();

  useEffect(() => {
    fetchTextMessages(sessionId);
  }, [filters, sessionId]);

  useEffect(() => {
    fetchIntervention(interventionId);
  }, [interventionId]);

  useEffect(() => {
    fetchSession({ sessionId, interventionId });
  }, [interventionId, sessionId]);

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
        selectedMessageState,
        editingPossible,
        interventionId,
      }}
    >
      <Helmet>
        <title>{formatMessage(messages.pageTitle)}</title>
      </Helmet>

      <Row maxHeight="100%" height="100%" style={{ justifyContent: 'center' }}>
        <Col md={8} style={{ overflowY: 'auto' }}>
          <Filters
            initialFilters={INITIAL_FILTERS}
            filters={filters}
            onChange={setFilters}
            style={{ marginLeft: 20, marginTop: 40 }}
          />
          <TextMessageTiles />
        </Col>
        {selectedMessageId && selectedMessage && (
          <Col style={{ overflowY: 'auto' }}>
            <TextMessageSettings sessionId={sessionId} />
          </Col>
        )}
      </Row>
    </TextMessagesContext.Provider>
  );
};

TextMessagingPage.propTypes = {
  fetchTextMessages: PropTypes.func,
  textMessages: PropTypes.array,
  loaders: PropTypes.object,
  errors: PropTypes.object,
  selectedMessageId: PropTypes.string,
  changeSelectedId: PropTypes.func,
  match: PropTypes.object,
  selectedMessage: PropTypes.object,
  selectedMessageState: PropTypes.object,
  editingPossible: PropTypes.bool,
  fetchIntervention: PropTypes.func,
  fetchSession: PropTypes.func,
  setFilters: PropTypes.func,
  filters: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = createStructuredSelector({
  filters: makeSelectFilters(),
  textMessages: makeSelectTextMessages(),
  selectedMessageId: makeSelectSelectedMessageId(),
  selectedMessage: makeSelectSelectedMessage(),
  selectedMessageState: makeSelectSelectedMessageState(),
  loaders: makeSelectLoaders(),
  errors: makeSelectErrors(),
  editingPossible: makeSelectEditingPossible(),
});

const mapDispatchToProps = {
  fetchTextMessages: fetchTextMessagesRequest,
  changeSelectedId: changeSelectedMessageId,
  fetchIntervention: fetchInterventionRequest,
  fetchSession: getSessionRequest,
  setFilters: setFiltersAction,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  injectReducer({ key: 'textMessages', reducer: textMessagesReducer }),
  injectReducer({ key: 'intervention', reducer: interventionReducer }),
  injectReducer({ key: 'session', reducer: sessionReducer }),
  injectSaga({ key: 'textMessagesSaga', saga: allTextMessagesSagas }),
  injectSaga({ key: 'fetchIntervention', saga: fetchInterventionSaga }),
  injectSaga({ key: 'getSession', saga: getSessionSaga }),
  memo,
)(TextMessagingPage);
