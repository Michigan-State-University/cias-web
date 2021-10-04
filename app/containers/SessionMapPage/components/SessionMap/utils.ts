import { Edge, Node } from 'react-flow-renderer';
import cloneDeep from 'lodash/cloneDeep';
import intersection from 'lodash/intersection';

import { QuestionGroup } from 'global/types/questionGroup';

import { QuestionTypes, Question } from 'models/Question';
import { SessionDto } from 'models/Session/SessionDto';
import { Answer } from 'models/Answer';

import {
  EdgeSharedAttributesGetter,
  QuestionTileData,
  SessionTileData,
} from '../../types';
import {
  baseEdgeSharedAttributes,
  directConnectionEdgeSharedAttributes,
  grayedOutEdgeSharedAttributes,
  highlightedEdgeSharedAttributes,
  SessionMapHeadType,
  SessionMapNodeType,
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
  selectedNodesIds: string[],
  onSelectedChange: (selected: boolean, nodeId: string) => void,
  selectableOnClick: boolean,
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
    selected: selectedNodesIds.includes(question.id),
    onSelectedChange,
    selectableOnClick,
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
  selectedNodesIds: string[],
  onSelectedChange: (selected: boolean, nodeId: string) => void,
  selectableOnClick: boolean,
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
          selected: selectedNodesIds.includes(sessionNodeId),
          onSelectedChange,
          selectableOnClick,
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
  selectedNodesIds: string[],
  onSelectedChange: (selected: boolean, nodeId: string) => void,
  selectableOnClick: boolean,
): Node<QuestionTileData | SessionTileData>[] =>
  questions.flatMap((question, index) => {
    const nodes: Node<QuestionTileData | SessionTileData>[] = [
      createQuestionNode(
        question,
        showDetailsId,
        onShowDetailsChange,
        showDetailedInfo,
        index,
        selectedNodesIds,
        onSelectedChange,
        selectableOnClick,
      ),
    ];

    // creates a separate session node for each redirection from question to session
    nodes.push(
      ...createSessionNodesFromBranching(
        question,
        sessions,
        showDetailedInfo,
        selectedNodesIds,
        onSelectedChange,
        selectableOnClick,
      ),
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

const createEdgeObject = (
  id: string,
  source: string,
  target: string,
  selectedNodesIds: string[],
  edgeSharedAttributesGetter: EdgeSharedAttributesGetter,
): Edge => {
  const edge: Edge = {
    id,
    source,
    target,
  };

  const edgeSharedAttributes = edgeSharedAttributesGetter(
    selectedNodesIds,
    source,
    target,
  );

  return {
    ...edge,
    ...edgeSharedAttributes,
  };
};

const createMapEdgesFromNextQuestions = (
  questions: Question[],
  selectedQuestionsIds: string[],
  edgeSharedAttributesGetter: EdgeSharedAttributesGetter,
): Edge[] =>
  questions.flatMap(({ id: questionId }, index) => {
    const nextQuestionId = questions[index + 1]?.id;
    if (!nextQuestionId) return [];

    return createEdgeObject(
      createEdgeId(questionId, nextQuestionId),
      questionId,
      nextQuestionId,
      selectedQuestionsIds,
      edgeSharedAttributesGetter,
    );
  });

const createMapEdgesFromBranching = (
  questions: Question[],
  existingEdges: Edge[],
  selectedQuestionsIds: string[],
  edgeSharedAttributesGetter: EdgeSharedAttributesGetter,
): Edge[] => {
  const edges: Edge[] = cloneDeep(existingEdges);
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

        edges.push(
          createEdgeObject(
            edgeId,
            nodeId,
            targetNodeId,
            selectedQuestionsIds,
            edgeSharedAttributesGetter,
          ),
        );
      }),
    ),
  );
  return edges;
};

// if a selected node has direct connections with any other selected nodes,
// remove a highlight from input/output edges other than these creating direct connections
const removeHighlightIfDirectConnectionExists = (edges: Edge[]): Edge[] => {
  const edgesCopy: Edge[] = cloneDeep(edges);
  const directConnections = edgesCopy.filter(
    ({ arrowHeadType }) =>
      // @ts-ignore
      arrowHeadType === SessionMapHeadType.DIRECT_CONNECTION,
  );

  for (let i = 0; i < directConnections.length; i++) {
    const anyRemovableHighlights = edgesCopy.some(
      // @ts-ignore
      (edge) => edge.arrowHeadType === SessionMapHeadType.HIGHLIGHTED,
    );
    if (!anyRemovableHighlights) {
      break;
    }

    // eslint-disable-next-line prefer-destructuring
    const connectingEdge = directConnections[i];

    edgesCopy.forEach((edge, edgeIndex) => {
      if (
        // @ts-ignore
        edge.arrowHeadType === SessionMapHeadType.HIGHLIGHTED &&
        (edge.source === connectingEdge.source ||
          edge.target === connectingEdge.target)
      ) {
        edgesCopy[edgeIndex] = {
          ...edge,
          ...baseEdgeSharedAttributes,
        };
      }
    });
  }

  return edgesCopy;
};

const getEdgeSharedAttributesForSelectableNodes: EdgeSharedAttributesGetter = (
  selectedNodesIds: string[],
  source: string,
  target: string,
): Partial<Edge> => {
  const { length: edgeSelectedNodesCount } = intersection(selectedNodesIds, [
    source,
    target,
  ]);

  switch (edgeSelectedNodesCount) {
    case 1: // if either source or target node is selected
      return highlightedEdgeSharedAttributes;
    case 2: // if both source and target node are selected
      return directConnectionEdgeSharedAttributes;
    case 0: // if neither source nor target node is selected
    default:
      return baseEdgeSharedAttributes;
  }
};

// asserts that the order of selectedNodesIds follows the order of answering questions
const getEdgeSharedAttributesForNonSelectableNodes: EdgeSharedAttributesGetter =
  (
    selectedNodesIds: string[],
    source: string,
    target: string,
  ): Partial<Edge> => {
    const sourceNodeIndex = selectedNodesIds.findIndex((id) => id === source);

    if (sourceNodeIndex === -1) return grayedOutEdgeSharedAttributes;

    const targetNodeIndex = selectedNodesIds.findIndex((id) => id === target);

    if (targetNodeIndex === sourceNodeIndex + 1)
      return directConnectionEdgeSharedAttributes;

    return grayedOutEdgeSharedAttributes;
  };

export const createMapEdges = (
  questions: Question[],
  selectedNodesIds: string[],
  nodesSelectableOnClick: boolean,
): Edge[] => {
  const edgeSharedAttributesGetter: EdgeSharedAttributesGetter =
    nodesSelectableOnClick
      ? getEdgeSharedAttributesForSelectableNodes
      : getEdgeSharedAttributesForNonSelectableNodes;

  const edgesFromNextQuestions: Edge[] = createMapEdgesFromNextQuestions(
    questions,
    selectedNodesIds,
    edgeSharedAttributesGetter,
  );
  const allEdges: Edge[] = createMapEdgesFromBranching(
    questions,
    edgesFromNextQuestions,
    selectedNodesIds,
    edgeSharedAttributesGetter,
  );

  return nodesSelectableOnClick
    ? removeHighlightIfDirectConnectionExists(allEdges)
    : allEdges;
};

export const getNodeOpacity = (
  selectableOnClick: boolean,
  selected: boolean,
): number => {
  // nodes can be selected programmatically while not being
  // selectable on click by the user
  if (selectableOnClick || selected) return 1;
  return 0.5;
};

export const createUserSessionNodesIdsFromAnswers = (
  answers: Answer[],
  questions: Question[],
): string[] => {
  const userSessionNodesIds = answers.map(({ questionId }) => questionId);

  const { questionId: lastAnsweredQuestionId, nextSessionId } =
    answers[answers.length - 1] ?? {};

  if (nextSessionId) {
    userSessionNodesIds.push(
      createSessionNodeId(lastAnsweredQuestionId, nextSessionId),
    );
  } else {
    const finishScreen = questions.find(
      ({ type }) => type === QuestionTypes.FINISH,
    );
    if (finishScreen) userSessionNodesIds.push(finishScreen.id);
  }

  return userSessionNodesIds;
};
