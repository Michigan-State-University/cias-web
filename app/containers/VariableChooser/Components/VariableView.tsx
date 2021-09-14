import React, { memo, useCallback, useContext, useMemo } from 'react';
import { useIntl } from 'react-intl';

import NoContent from 'components/NoContent';
import Box from 'components/Box';

import useGet from 'utils/useGet';
import { QuestionDto } from 'models/Question/QuestionDto';
import Loader from 'components/Loader';
import ErrorAlert from 'components/ErrorAlert';
import VariableRow from './VariableRow';
import ViewWrapper from './ViewWrapper';

import messages from '../messages';
import { VariableChooserContext, VIEWS } from '../constants';

interface Props {
  onClick: (variable: string) => void;
}

interface VariablesRendered {
  subtitle: string;
  variable: string;
}

interface VariableApiResponse {
  session_variable: string;
  variable_names: { subtitle: string; variables: string[] }[];
}

const VariableView = ({ onClick }: Props) => {
  const { formatMessage } = useIntl();

  const {
    currentSessionId,
    currentView,
    includeAllVariables,
    includeCurrentQuestion,
    includeNonDigitVariables,
    initialSessionId,
    isMultiIntervention,
    isMultiSession,
    questionTypeWhitelist,
    selectedQuestion,
    setCurrentView,
  } = useContext(VariableChooserContext);

  const url = useMemo(() => {
    const baseUrl = `v1/sessions/${currentSessionId}/variables/`;
    let suffix = '';
    if (!includeAllVariables) suffix = (selectedQuestion as QuestionDto).id;
    const urlParams = new URLSearchParams();
    if (!includeNonDigitVariables)
      urlParams.append('only_digit_variables', `${true}`);
    if (includeCurrentQuestion)
      urlParams.append('include_current_question', `${true}`);
    if (questionTypeWhitelist && questionTypeWhitelist.length) {
      for (let i = 0; i < questionTypeWhitelist.length; i++) {
        urlParams.append('allow_list[]', questionTypeWhitelist[i]);
      }
    }

    return `${baseUrl}${suffix}?${urlParams.toString()}`;
  }, [
    currentSessionId,
    selectedQuestion,
    includeAllVariables,
    includeNonDigitVariables,
    questionTypeWhitelist,
    includeCurrentQuestion,
  ]);

  const state = useGet<any, VariableApiResponse>(
    url,
    (d: unknown) => d as VariableApiResponse,
  );

  const apiVariables = useMemo(() => {
    const { data } = state;
    if (!data) return null;
    const variables: VariablesRendered[] = [];
    data.variable_names.map(({ subtitle, variables: varNames }) =>
      varNames.map((varName) =>
        variables.push({ subtitle, variable: varName }),
      ),
    );
    return variables;
  }, [state.data]);

  const toSessionView = () => {
    if (!isMultiSession && !isMultiIntervention) return;
    if (currentView === VIEWS.SESSION) return;
    setCurrentView(VIEWS.SESSION);
  };

  const handleOnClick = useCallback(
    (variable) => {
      const variableToAdd =
        currentSessionId === initialSessionId
          ? variable
          : `${state.data?.session_variable}.${variable}`;

      onClick(variableToAdd);
    },
    [currentSessionId, initialSessionId, state.data],
  );

  if (state.isFetching) {
    // @ts-ignore
    return <Loader type="inline" />;
  }

  if (state.error) {
    return <ErrorAlert errorText={state.error} fullPage={false} />;
  }

  if (!apiVariables || !apiVariables.length)
    return (
      <ViewWrapper goBack={toSessionView}>
        <Box padding={30}>
          {/* @ts-ignore */}
          <NoContent text={formatMessage(messages.noVariables)} />
        </Box>
      </ViewWrapper>
    );

  return (
    <ViewWrapper goBack={toSessionView}>
      {apiVariables.map(({ subtitle, variable }, index) => (
        <VariableRow
          key={`${variable}-select-variable-${index}`}
          id={variable}
          isLast={index === apiVariables.length - 1}
          onClick={handleOnClick}
          subtitle={subtitle}
          variable={variable}
        />
      ))}
    </ViewWrapper>
  );
};

export default memo(VariableView);
