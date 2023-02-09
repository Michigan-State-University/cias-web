import React, { memo, useContext, useMemo } from 'react';
import { useIntl } from 'react-intl';

import webpage from 'assets/svg/webpage-mouseover.svg';

import {
  ReflectableQuestion,
  ReflectableQuestionDTO,
} from 'models/ReflectableQuestion/ReflectableQuestion';
import { ApiDataCollection } from 'models/Api';

import useGet from 'utils/useGet';
import { jsonApiToArray } from 'utils/jsonApiMapper';
import { htmlToPlainText } from 'utils/htmlToPlainText';
import { mapQuestionsToReflectableQuestions } from 'utils/questions';

import NoContent from 'components/NoContent';
import Box from 'components/Box';
import Loader from 'components/Loader';
import ErrorAlert from 'components/ErrorAlert';
import { EllipsisText } from 'components/Text';
import Row from 'components/Row';
import Img from 'components/Img';
import Column from 'components/Column';

import ViewWrapper from './ViewWrapper';

import messages from '../messages';
import { VariableChooserContext, VIEWS } from '../constants';

interface Props {
  onClick: (question: ReflectableQuestion) => void;
}

const ReflectableQuestionView = ({ onClick }: Props) => {
  const { formatMessage } = useIntl();

  const {
    selectedSessionId,
    currentSessionId,
    currentView,
    setCurrentView,
    currentSessionPreviousQuestions,
  } = useContext(VariableChooserContext);

  const isCurrentSessionSelected = selectedSessionId === currentSessionId;

  const url = useMemo(() => {
    if (isCurrentSessionSelected) return '';
    return `/v1/sessions/${selectedSessionId}/reflectable_questions`;
  }, [isCurrentSessionSelected, selectedSessionId]);

  const {
    data: otherSessionReflectableQuestions,
    error,
    isFetching,
  } = useGet<ApiDataCollection<ReflectableQuestionDTO>, ReflectableQuestion[]>(
    url,
    (data) => jsonApiToArray(data, 'reflectableQuestion'),
  );

  const questions = useMemo(() => {
    if (currentSessionId && isCurrentSessionSelected)
      return mapQuestionsToReflectableQuestions(
        currentSessionPreviousQuestions ?? [],
        currentSessionId,
      );
    return otherSessionReflectableQuestions;
  }, [
    isCurrentSessionSelected,
    currentSessionPreviousQuestions,
    otherSessionReflectableQuestions,
  ]);

  const toSessionView = () => {
    if (currentView === VIEWS.SESSION) return;
    setCurrentView(VIEWS.SESSION);
  };

  if (isFetching) {
    // @ts-ignore
    return <Loader type="inline" />;
  }

  if (error) {
    return <ErrorAlert errorText={error} fullPage={false} />;
  }

  if (!questions?.length)
    return (
      <ViewWrapper goBack={toSessionView}>
        <Box padding={30}>
          {/* @ts-ignore */}
          <NoContent text={formatMessage(messages.noReflectableQuestions)} />
        </Box>
      </ViewWrapper>
    );

  return (
    <ViewWrapper goBack={toSessionView}>
      <Column gap={15}>
        {questions.map((question) => (
          <Row
            key={`reflectable-question-${question.id}`}
            align="center"
            clickable
            gap={15}
            onClick={() => onClick(question)}
          >
            <Img src={webpage} />
            <EllipsisText text={htmlToPlainText(question.subtitle)} />
          </Row>
        ))}
      </Column>
    </ViewWrapper>
  );
};

export default memo(ReflectableQuestionView);
