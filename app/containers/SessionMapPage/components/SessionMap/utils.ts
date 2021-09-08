import { Edge, Node } from 'react-flow-renderer';
import cloneDeep from 'lodash/cloneDeep';

import { QuestionGroup } from 'global/types/questionGroup';
import { Question } from 'global/types/question';
import { SessionDto } from 'models/Session/SessionDto';

import { QuestionTileData, SessionTileData } from '../../types';
import {
  NodeType,
  sessionNodesVerticalDistanceRatio,
  questionNodesVerticalDistanceRatio,
  baseEdgeSharedAttributes,
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
  showDetails: boolean,
  onShowDetailsChange: (showDetails: boolean, questionId: string) => void,
  showDetailedInfo: boolean,
  index: number,
): Node<QuestionTileData> => ({
  id: question.id,
  type: NodeType.QUESTION,
  position: { x: 0, y: 0 },
  data: {
    question,
    showDetails,
    onShowDetailsChange,
    showDetailedInfo,
    index,
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
        type: NodeType.SESSION,
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
): Node<QuestionTileData | SessionTileData>[] =>
  questions.flatMap((question, index) => {
    const nodes: Node<QuestionTileData | SessionTileData>[] = [
      createQuestionNode(
        question,
        question.id === showDetailsId,
        onShowDetailsChange,
        showDetailedInfo,
        index,
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

const createMapEdgesFromNextQuestions = (questions: Question[]): Edge[] =>
  questions.flatMap(({ id }, index) => {
    const nextNodeId = questions[index + 1]?.id;
    if (!nextNodeId) return [];
    // @ts-ignore
    return {
      id: createEdgeId(id, nextNodeId),
      source: id,
      target: nextNodeId,
      ...baseEdgeSharedAttributes,
    } as Edge;
  });

const createMapEdgesFromBranching = (
  questions: Question[],
  existingEdges: Edge[],
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

        // @ts-ignore
        const edge = {
          id: edgeId,
          source: nodeId,
          target: targetNodeId,
          ...baseEdgeSharedAttributes,
        } as Edge;
        edges.push(edge);
      }),
    ),
  );
  return edges;
};

export const createMapEdges = (questions: Question[]): Edge[] => {
  const edges: Edge[] = createMapEdgesFromNextQuestions(questions);
  return createMapEdgesFromBranching(questions, edges);
};

export const getNodeVerticalDistanceRatio = (nodeType?: string): number =>
  nodeType === NodeType.SESSION
    ? sessionNodesVerticalDistanceRatio
    : questionNodesVerticalDistanceRatio;
