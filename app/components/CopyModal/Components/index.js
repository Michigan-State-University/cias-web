import React, { useState, useEffect, useMemo, useContext } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, IntlShape } from 'react-intl';

import Column from 'components/Column';
import Button from 'components/Button';
import Row from 'components/Row';
import questionGroupIcon from 'assets/svg/question-group-icon.svg';
import sessionIcon from 'assets/svg/session-icon.svg';
import interventionIcon from 'assets/svg/intervention-icon.svg';

import { makeSelectSession } from 'global/reducers/session';
import { makeSelectIntervention } from 'global/reducers/intervention';

import {
  makeSelectSessions,
  fetchSessionsRequest,
  fetchQuestionGroupsRequest,
  makeSelectQuestionGroups,
  makeSelectCopyModalLoaders,
  changeViewAction,
  fetchInterventionsRequest,
  makeSelectInterventions,
} from 'global/reducers/copyModalReducer';
import { makeSelectSavedIds } from 'global/reducers/copyModalReducer/selectors';
import ChooserComponent from './ChooserComponent';
import messages from './messages';
import { CopyModalContext } from '../utils';

export const VIEWS = {
  QUESTION_GROUP: 'QuestionGroup',
  SESSION: 'Session',
  INTERVENTION: 'Intervention',
};

const CopyChooser = ({
  intl: { formatMessage },
  onClick,
  session: { id: sessionId, name },
  intervention: { id: interventionId, name: interventionName },
  interventions,
  loaders,
  questionGroups,
  sessions,
  fetchSessions,
  fetchQuestionGroups,
  fetchInterventions,
  defaultView,
  disableQuestionGroupCopy,
  disableSessionCopy,
  disableInterventionCopy,
  changeView,
  pasteText,
  savedIds,
}) => {
  const { interventionStatusFilter } = useContext(CopyModalContext);

  const [currentView, setCurrentView] = useState(defaultView);
  const [selectedItem, setSelectedItem] = useState(null);

  const [currentIntervention, setCurrentIntervention] = useState({
    id: interventionId,
    name: interventionName,
  });

  const [currentSession, setCurrentSession] = useState({
    id: sessionId,
    name,
  });

  useEffect(() => {
    if (currentView === VIEWS.INTERVENTION && !interventions) {
      fetchInterventions();
    } else if (
      currentView === VIEWS.SESSION &&
      currentIntervention &&
      (!sessions || savedIds.interventions !== currentIntervention.id)
    ) {
      fetchSessions(currentIntervention.id);
    } else if (
      currentView === VIEWS.QUESTION_GROUP &&
      currentSession &&
      (!questionGroups, savedIds.session !== currentSession.id)
    ) {
      fetchQuestionGroups(currentSession.id);
    }
  }, [currentView, currentIntervention, currentSession]);

  const filteredInterventions = useMemo(
    () =>
      interventions
        ? interventions.filter(({ status }) =>
            interventionStatusFilter.includes(status),
          )
        : [],
    [interventions, interventionStatusFilter],
  );

  const handleCopyCurrent = () => {
    if (!selectedItem?.id) return;
    if (currentView === VIEWS.INTERVENTION)
      onClick({ type: VIEWS.INTERVENTION, id: selectedItem.id });
    if (currentView === VIEWS.SESSION)
      onClick({ type: VIEWS.SESSION, id: selectedItem.id });
    if (currentView === VIEWS.QUESTION_GROUP)
      onClick({
        type: VIEWS.QUESTION_GROUP,
        id: selectedItem.id,
        sessionId: currentSession.id,
      });
  };

  const handleSelectAction = selectedId => {
    setSelectedItem(selectedId);
  };

  const changeToInterventionView = () => {
    setSelectedItem(null);
    setCurrentView(VIEWS.INTERVENTION);
  };
  const changeToSessionView = targetIntervention => {
    setSelectedItem(null);
    if (
      targetIntervention?.id &&
      targetIntervention?.id !== currentIntervention?.id
    ) {
      changeView();
      setCurrentIntervention(targetIntervention);
    }
    setCurrentView(VIEWS.SESSION);
  };
  const changeToQuestionGroupsView = targetSession => {
    setSelectedItem(null);
    if (targetSession?.id) {
      changeView();
      setCurrentSession(targetSession);
    }
    setCurrentView(VIEWS.QUESTION_GROUP);
  };

  const renderChooserType = () => {
    switch (currentView) {
      case VIEWS.INTERVENTION:
        return (
          <ChooserComponent
            elementId={selectedItem?.id}
            loading={loaders.interventions}
            items={filteredInterventions}
            selectedItem={selectedItem}
            changeViewAction={changeToSessionView}
            selectAction={handleSelectAction}
            disableCopy={disableInterventionCopy}
            currentPlaceTitle={formatMessage(messages.interventionsListHeader)}
            listIcon={interventionIcon}
          />
        );
      case VIEWS.SESSION:
        return (
          <ChooserComponent
            elementId={selectedItem?.id}
            backAction={changeToInterventionView}
            loading={loaders.sessions}
            items={sessions}
            changeViewAction={changeToQuestionGroupsView}
            selectAction={handleSelectAction}
            disableCopy={disableSessionCopy}
            currentPlaceName={currentIntervention?.name}
            backText={formatMessage(messages.interventions)}
            currentPlaceTitle={formatMessage(messages.sessionListHeader)}
            listIcon={sessionIcon}
          />
        );
      case VIEWS.QUESTION_GROUP:
        return (
          <ChooserComponent
            elementId={selectedItem?.id}
            backAction={changeToSessionView}
            loading={loaders.questionGroups}
            items={questionGroups}
            selectAction={handleSelectAction}
            currentPlaceName={currentSession?.name}
            disableCopy={disableQuestionGroupCopy}
            selectedItem={selectedItem}
            backText={formatMessage(messages.sessions)}
            currentPlaceTitle={formatMessage(messages.questionGroupsListHeader)}
            listIcon={questionGroupIcon}
          />
        );
      default:
        return <></>;
    }
  };

  return (
    <Column justify="between" filled>
      <Row>{renderChooserType()}</Row>
      {currentView === defaultView && (
        <Row mt={20}>
          <Button mx={25} disabled={!selectedItem} onClick={handleCopyCurrent}>
            {pasteText}
          </Button>
        </Row>
      )}
    </Column>
  );
};

CopyChooser.propTypes = {
  intl: PropTypes.shape(IntlShape),
  onClick: PropTypes.func.isRequired,
  session: PropTypes.object,
  intervention: PropTypes.object,
  sessions: PropTypes.array,
  loaders: PropTypes.object,
  questionGroups: PropTypes.array,
  interventions: PropTypes.array,
  fetchSessions: PropTypes.func,
  fetchQuestionGroups: PropTypes.func,
  fetchInterventions: PropTypes.func,
  defaultView: PropTypes.string,
  disableQuestionGroupCopy: PropTypes.bool,
  disableSessionCopy: PropTypes.bool,
  disableInterventionCopy: PropTypes.bool,
  changeView: PropTypes.func,
  savedIds: PropTypes.object,
  pasteText: PropTypes.string,
};

CopyChooser.defaultProps = {
  defaultView: VIEWS.QUESTION_GROUP,
  disableQuestionGroupCopy: false,
  disableSessionCopy: false,
  disableInterventionCopy: false,
};

const mapStateToProps = createStructuredSelector({
  session: makeSelectSession(),
  sessions: makeSelectSessions(),
  loaders: makeSelectCopyModalLoaders(),
  intervention: makeSelectIntervention(),
  questionGroups: makeSelectQuestionGroups(),
  interventions: makeSelectInterventions(),
  savedIds: makeSelectSavedIds(),
});

const mapDispatchToProps = {
  fetchSessions: fetchSessionsRequest,
  fetchQuestionGroups: fetchQuestionGroupsRequest,
  changeView: changeViewAction,
  fetchInterventions: fetchInterventionsRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(CopyChooser));
