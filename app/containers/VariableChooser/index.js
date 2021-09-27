import React, {
  memo,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { injectReducer, injectSaga } from 'redux-injectors';

import {
  allCopyModalSagas,
  copyModalReducer,
} from 'global/reducers/copyModalReducer';

import { colors, boxShadows } from 'theme';

import { QuestionTypes } from 'models/Session/QuestionTypes';
import Question from 'models/Session/Question';

import useOutsideClick from 'utils/useOutsideClick';

import Row from 'components/Row';
import Box from 'components/Box';

import VariableView from './Components/VariableView';
import SessionView from './Components/SessionView';
import InterventionView from './Components/InterventionView';

import { VariableChooserContext, VIEWS } from './constants';

const VariableChooser = ({
  children,
  disabled,
  includeAllSessions,
  includeAllVariables,
  includeCurrentQuestion,
  includeCurrentSession,
  includeNonDigitVariables,
  interventionId: initialInterventionId,
  isMultiIntervention,
  isMultiSession,
  onClick,
  organizationId,
  placement,
  questionTypeWhitelist,
  selectedQuestion = {},
  sessionId: initialSessionId,
  topPosition,
  setIsOpen: propsSetOpen,
}) => {
  const variableChooser = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  useOutsideClick(variableChooser, close, isOpen);

  const initialView = useMemo(() => {
    if (isMultiIntervention) return VIEWS.INTERVENTION;

    if (isMultiSession && !includeCurrentSession) return VIEWS.SESSION;

    return VIEWS.VARIABLE;
  }, [isMultiIntervention, isMultiSession, includeCurrentSession]);

  const [currentView, setCurrentView] = useState(initialView);
  const toSessionView = () => setCurrentView(VIEWS.SESSION);
  const toVariableView = () => setCurrentView(VIEWS.VARIABLE);

  const [currentInterventionId, setCurrentInterventionId] = useState(
    initialInterventionId,
  );
  const resetCurrentInterventionId = () =>
    currentInterventionId !== initialInterventionId &&
    setCurrentInterventionId(initialInterventionId);

  const [currentSessionId, setCurrentSessionId] = useState(initialSessionId);
  const resetCurrentSessionId = () =>
    currentSessionId !== initialSessionId &&
    setCurrentSessionId(initialSessionId);

  const resetVariableChooser = () => {
    resetCurrentSessionId();
    resetCurrentInterventionId();
    setCurrentView(initialView);
  };

  useLayoutEffect(() => {
    if (isOpen) resetVariableChooser();
    if (propsSetOpen) propsSetOpen(isOpen);
  }, [isOpen]);

  const handleOnVariableClick = useCallback(
    variable => {
      onClick(variable);
      close();
    },
    [onClick],
  );

  const handleOnSessionClick = useCallback(sessionId => {
    setCurrentSessionId(sessionId);
    toVariableView();
  }, []);

  const handleOnInterventionClick = useCallback(interventionId => {
    setCurrentInterventionId(interventionId);
    toSessionView();
  }, []);

  const displayContent = useCallback(() => {
    if (!isOpen) return null;

    switch (currentView) {
      case VIEWS.VARIABLE:
        return <VariableView onClick={handleOnVariableClick} />;

      case VIEWS.SESSION:
        return <SessionView onClick={handleOnSessionClick} />;

      case VIEWS.INTERVENTION:
        return <InterventionView onClick={handleOnInterventionClick} />;

      default:
        return null;
    }
  }, [
    currentView,
    handleOnInterventionClick,
    handleOnSessionClick,
    handleOnVariableClick,
    isOpen,
  ]);

  return (
    <Box position="relative">
      <Box onClick={toggle} disabled={disabled} clickable>
        {children}
      </Box>
      <Box
        ref={variableChooser}
        bg={colors.white}
        borderRadius={10}
        shadow={boxShadows.black}
        position="absolute"
        width="auto"
        top={topPosition}
        {...(isOpen ? { zIndex: 1, [placement]: '0px' } : { display: 'none' })}
      >
        <Row>
          <Box padding={8} filled>
            <VariableChooserContext.Provider
              value={{
                currentInterventionId,
                currentSessionId,
                currentView,
                includeAllSessions,
                includeAllVariables,
                includeCurrentQuestion,
                includeCurrentSession,
                includeNonDigitVariables,
                initialInterventionId,
                initialSessionId,
                isMultiIntervention,
                isMultiSession,
                organizationId,
                questionTypeWhitelist,
                selectedQuestion,
                setCurrentView,
              }}
            >
              {displayContent()}
            </VariableChooserContext.Provider>
          </Box>
        </Row>
      </Box>
    </Box>
  );
};

VariableChooser.propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  includeAllSessions: PropTypes.bool,
  includeAllVariables: PropTypes.bool,
  includeCurrentQuestion: PropTypes.bool,
  includeCurrentSession: PropTypes.bool,
  includeNonDigitVariables: PropTypes.bool,
  interventionId: PropTypes.string,
  isMultiIntervention: PropTypes.bool,
  isMultiSession: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  organizationId: PropTypes.string,
  placement: PropTypes.oneOf(['left', 'right']),
  questionTypeWhitelist: PropTypes.arrayOf(PropTypes.string),
  questions: PropTypes.arrayOf(PropTypes.shape(Question)),
  selectedQuestion: PropTypes.shape(Question),
  sessionId: PropTypes.string,
  topPosition: PropTypes.string,
  setIsOpen: PropTypes.func,
};

VariableChooser.defaultProps = {
  includeCurrentQuestion: true,
  includeCurrentSession: true,
  placement: 'right',
  questionTypeWhitelist: QuestionTypes.map(({ id }) => id),
};

const reduxInjectors = [
  injectReducer({ key: 'copyModal', reducer: copyModalReducer }),
  injectSaga({ key: 'copyModal', saga: allCopyModalSagas }),
];

export default compose(
  ...reduxInjectors,
  memo,
)(VariableChooser);
