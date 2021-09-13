import { Edge, Node } from 'react-flow-renderer';
import cloneDeep from 'lodash/cloneDeep';
import intersection from 'lodash/intersection';

import { QuestionGroup } from 'global/types/questionGroup';
import { Question } from 'global/types/question';
import { SessionDto } from 'models/Session/SessionDto';

import { QuestionTileData, SessionTileData } from '../../types';
import {
  SessionMapNodeType,
  sessionNodesVerticalDistanceRatio,
  questionNodesVerticalDistanceRatio,
  baseEdgeSharedAttributes,
  selectedLightEdgeSharedAttributes,
} from '../../constants';

export const sortQuestionsByGroupAndPosition = (
  questionGroups: QuestionGroup[],
  questions: Question[],
): Question[] => {
  // sort all question groups itself by position
  const sortedQuestionGroups = questionGroups.sort((groupA, groupB) =>
    groupA.position <= groupB.position ? -1 : 1,
  );
  return sortedQuestionGroups.flatMap(({ id }) => {
    // questions belonging to current group
    const groupQuestions = questions.filter(
      ({ question_group_id }) => question_group_id === id,
    );
    // sort questions belonging to current group by position
    return groupQuestions.sort((questionA, questionB) =>
      questionA.position <= questionB.position ? -1 : 1,
    );
  });
};

const createQuestionNode = (
  question: Question,
  showDetailsId: string,
  onShowDetailsChange: (showDetails: boolean, questionId: string) => void,
  showDetailedInfo: boolean,
  index: number,
  selectedQuestionsIds: string[],
  onSelectedChange: (selected: boolean, questionId: string) => void,
): Node<QuestionTileData> => ({
  id: question.id,
  type: SessionMapNodeType.QUESTION,
  position: { x: 0, y: 0 },
  selectable: true,
  data: {
    question,
    showDetails: question.id === showDetailsId,
    onShowDetailsChange,
    showDetailedInfo,
    index,
    selected: selectedQuestionsIds.includes(question.id),
    onSelectedChange,
  },
});

const createSessionNodeId = (questionId: string, sessionId: string): string =>
  `session-${sessionId}_FROM_${questionId}`;

const nodeExists = (nodes: Node[], nodeId: string): boolean =>
  Boolean(nodes.find(({ id }) => id === nodeId));

const createSessionNodesFromBranching = (
  question: Question,
  sessions: SessionDto[],
  showDetailedInfo: boolean,
): Node<SessionTileData>[] => {
  const nodes: Node<SessionTileData>[] = [];

  question.formula.patterns.forEach(({ target: targets }) =>
    targets.forEach(({ id: targetId, type }) => {
      if (!type.startsWith('Session')) return;

      const sessionIndex = sessions.findIndex(({ id }) => id === targetId);
      if (sessionIndex === -1) return;

      const sessionNodeId = createSessionNodeId(
        question.id,
        sessions[sessionIndex].id,
      );
      if (nodeExists(nodes, sessionNodeId)) return;

      nodes.push({
        id: sessionNodeId,
        type: SessionMapNodeType.SESSION,
        position: { x: 0, y: 0 },
        data: {
          sessionIndex,
          showDetailedInfo,
        },
      });
    }),
  );

  return nodes;
};

export const createMapNodes = (
  questions: Question[],
  showDetailsId: string,
  onShowDetailsChange: (showDetails: boolean, questionId: string) => void,
  showDetailedInfo: boolean,
  sessions: SessionDto[],
  selectedQuestionsIds: string[],
  onSelectedChange: (selected: boolean, questionId: string) => void,
): Node<QuestionTileData | SessionTileData>[] =>
  questions.flatMap((question, index) => {
    const nodes: Node<QuestionTileData | SessionTileData>[] = [
      createQuestionNode(
        question,
        showDetailsId,
        onShowDetailsChange,
        showDetailedInfo,
        index,
        selectedQuestionsIds,
        onSelectedChange,
      ),
    ];

    // creates a separate session node for each redirection from question to session
    nodes.push(
      ...createSessionNodesFromBranching(question, sessions, showDetailedInfo),
    );

    return nodes;
  });

const createEdgeId = (sourceId: string, targetId: string): string =>
  `${sourceId}_TO_${targetId}`;

const findQuestionPosition = (
  questions: Question[],
  questionId: string,
): number => questions.findIndex(({ id }) => id === questionId);

const edgeExists = (edges: Edge[], edgeId: string): boolean =>
  Boolean(edges.find(({ id }) => id === edgeId));

const createMapEdgesFromNextQuestions = (
  questions: Question[],
  selectedQuestionsIds: string[],
): Edge[] =>
  questions.flatMap(({ id }, index) => {
    const nextQuestionId = questions[index + 1]?.id;
    if (!nextQuestionId) return [];

    const edge: Edge = {
      id: createEdgeId(id, nextQuestionId),
      source: id,
      target: nextQuestionId,
    };

    if (intersection(selectedQuestionsIds, [id, nextQuestionId]).length) {
      // @ts-ignore
      return {
        ...edge,
        ...selectedLightEdgeSharedAttributes,
      } as Edge;
    }

    // @ts-ignore
    return {
      ...edge,
      ...baseEdgeSharedAttributes,
    } as Edge;
  });

const createMapEdgesFromBranching = (
  questions: Question[],
  existingEdges: Edge[],
  selectedQuestionsIds: string[],
): Edge[] => {
  const edges = cloneDeep(existingEdges);
  // check every target of every pattern of every question
  questions.forEach(({ id: nodeId, formula: { patterns } }, questionIndex) =>
    patterns.forEach(({ target: targets }) =>
      targets.forEach(({ id: targetId, type }) => {
        if (!targetId) return;

        if (
          type.startsWith('Question') &&
          findQuestionPosition(questions, targetId) < questionIndex
        ) {
          return;
        }

        const targetNodeId = type.startsWith('Question')
          ? targetId
          : createSessionNodeId(nodeId, targetId);

        const edgeId = createEdgeId(nodeId, targetNodeId);

        if (edgeExists(edges, edgeId)) return;

        const edge = {
          id: edgeId,
          source: nodeId,
          target: targetNodeId,
        };

        if (intersection(selectedQuestionsIds, [nodeId, targetNodeId]).length) {
          // @ts-ignore
          edges.push({
            ...edge,
            ...selectedLightEdgeSharedAttributes,
          });
          return;
        }

        // @ts-ignore
        edges.push({
          ...edge,
          ...baseEdgeSharedAttributes,
        });
      }),
    ),
  );
  return edges;
};

export const createMapEdges = (
  questions: Question[],
  selectedQuestionsIds: string[],
): Edge[] => {
  const edges: Edge[] = createMapEdgesFromNextQuestions(
    questions,
    selectedQuestionsIds,
  );
  return createMapEdgesFromBranching(questions, edges, selectedQuestionsIds);
};

export const getNodeVerticalDistanceRatio = (nodeType?: string): number =>
  nodeType === SessionMapNodeType.SESSION
    ? sessionNodesVerticalDistanceRatio
    : questionNodesVerticalDistanceRatio;
