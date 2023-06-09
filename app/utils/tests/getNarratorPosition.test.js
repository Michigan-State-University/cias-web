/**
 * Test getNarratorPosition
 */

import shuffle from 'lodash/shuffle';
import cloneDeep from 'lodash/cloneDeep';

import { elements } from 'theme';
import {
  bodyAnimationType,
  speechType,
  headAnimationType,
  readQuestionBlockType,
  reflectionType,
  pauseType,
} from 'models/Narrator/BlockTypes';

import {
  findLastPositionInPreviousQuestions,
  getNarratorPositionForANewBlock,
  getNarratorPositionWhenQuestionIsChanged,
  getNarratorPositionWhenBlockIsRemoved,
  getNarratorPositionWhenQuestionIsAdded,
} from '../getNarratorPosition';

const bodyAnimationTypeBlock = {
  type: bodyAnimationType,
  endPosition: { x: 0, y: 0 },
  animation: 'standStill',
};

const speechTypeBlock = {
  type: speechType,
  endPosition: { x: 0, y: 0 },
  animation: 'rest',
  text: [],
  audio_urls: [],
  sha256: [],
};

const reflectionTypeBlock = {
  type: reflectionType,
  endPosition: { x: 0, y: 0 },
  question_id: '',
  reflections: [],
  animation: 'rest',
};

const headAnimationTypeBlock = {
  type: headAnimationType,
  endPosition: { x: 0, y: 0 },
  animation: 'standStill',
};

const readQuestionBlockTypeBlock = {
  type: readQuestionBlockType,
  endPosition: { x: 0, y: 0 },
  animation: 'rest',
  text: ['Hello'],
  audio_urls: [],
  sha256: [],
};

const pauseTypeBlock = {
  type: pauseType,
  endPosition: { x: 0, y: 0 },
  animation: 'standStill',
  pauseDuration: 2,
};

const allBlockTypes = shuffle([
  bodyAnimationTypeBlock,
  speechTypeBlock,
  reflectionTypeBlock,
  headAnimationTypeBlock,
  readQuestionBlockTypeBlock,
  pauseTypeBlock,
]);

const getRandomInt = (max, min = 0) =>
  Math.floor(Math.random() * Math.floor(max)) + min;

const getRandomBlockPosition = () => ({
  x: getRandomInt(601),
  y: getRandomInt(601),
});

const getBlock = (position) => {
  const number = getRandomInt(6);
  const copiedBlock = cloneDeep(allBlockTypes[number]);
  if (position) copiedBlock.endPosition = position;
  else copiedBlock.endPosition = getRandomBlockPosition();
  return copiedBlock;
};

const mockQuestion = ({
  noBlocks = false,
  blocksSize = 5,
  lastPosition = null,
  firstPosition = null,
  customPosition = { index: null, position: null },
  id,
  position,
  questionGroupId,
} = {}) => {
  const newBlocks = [];

  if (!noBlocks) {
    for (let i = 0; i < blocksSize; i += 1) {
      if (i === 0 && firstPosition) newBlocks.push(getBlock(firstPosition));
      else if (i === blocksSize - 1 && lastPosition)
        newBlocks.push(getBlock(lastPosition));
      else if (i === customPosition.index && customPosition.position)
        newBlocks.push(getBlock(customPosition.position));
      else newBlocks.push(getBlock());
    }
  }
  return {
    id,
    question_group_id: questionGroupId,
    position,
    narrator: {
      blocks: newBlocks,
    },
  };
};

const initialPosition = elements.characterInitialPosition;

const questionId = 'test-id';
const questionGroupId = 'test-group';
const groupIds = [questionGroupId];

describe('findLastPositionInPreviousQuestions', () => {
  it('Should return initial character position when there is no questions', () => {
    const allQuestions = [];
    const questionIndex = 0;
    const result = findLastPositionInPreviousQuestions(
      allQuestions,
      questionIndex,
    );
    expect(result).toEqual(initialPosition);
  });

  it('Should return initial character position when current question index is 0', () => {
    const allQuestions = [mockQuestion(), mockQuestion(), mockQuestion()];
    const questionIndex = 0;
    const result = findLastPositionInPreviousQuestions(
      allQuestions,
      questionIndex,
    );
    expect(result).toEqual(initialPosition);
  });

  it('Should return initial character position when previous quesitons have no blocks', () => {
    const allQuestions = [
      mockQuestion({ noBlocks: true }),
      mockQuestion({ noBlocks: true }),
      mockQuestion(),
    ];
    const questionIndex = 2;
    const result = findLastPositionInPreviousQuestions(
      allQuestions,
      questionIndex,
    );
    expect(result).toEqual(initialPosition);
  });

  it('Should return character position when there is last block in the previous question', () => {
    const characterPosition = { x: 25, y: 25 };
    const allQuestions = [
      mockQuestion({ lastPosition: characterPosition }),
      mockQuestion(),
      mockQuestion(),
    ];
    const questionIndex = 1;
    const result2 = findLastPositionInPreviousQuestions(
      allQuestions,
      questionIndex,
    );
    expect(result2).toEqual(characterPosition);
  });

  it('Should return character position when there is block in any of the previous questions', () => {
    const characterPosition = { x: 50, y: 50 };
    const allQuestions = [
      mockQuestion({ lastPosition: characterPosition }),
      mockQuestion({ noBlocks: true }),
      mockQuestion(),
    ];
    const questionIndex = 2;
    const result = findLastPositionInPreviousQuestions(
      allQuestions,
      questionIndex,
    );
    expect(result).toEqual(characterPosition);
  });
});

describe('getNarratorPositionForANewBlock', () => {
  it('Should return initial character position when there are no blocks in first question', () => {
    const allQuestions = [mockQuestion({ noBlocks: true, id: questionId })];
    const result = getNarratorPositionForANewBlock(allQuestions, questionId);
    expect(result).toEqual(initialPosition);
  });

  it('Should return position of the last block in the same question', () => {
    const characterPosition = { x: 75, y: 75 };
    const allQuestions = [
      mockQuestion(),
      mockQuestion({ lastPosition: characterPosition, id: questionId }),
      mockQuestion(),
    ];
    const result = getNarratorPositionForANewBlock(allQuestions, questionId);
    expect(result).toEqual(characterPosition);
  });

  it('Should return position of the last block in any of the previous questions', () => {
    const characterPosition = { x: 100, y: 100 };
    const allQuestions = [
      mockQuestion({
        lastPosition: characterPosition,
        questionGroupId,
        position: 1,
      }),
      mockQuestion({
        noBlocks: true,
        id: questionId,
        questionGroupId,
        position: 2,
      }),
      mockQuestion(),
    ];
    const result2 = getNarratorPositionForANewBlock(
      allQuestions,
      questionId,
      groupIds,
    );
    expect(result2).toEqual(characterPosition);
  });

  it('Should return initial position when there is no blocks at all', () => {
    const allQuestions = [
      mockQuestion({ noBlocks: true, questionGroupId, position: 1 }),
      mockQuestion({ noBlocks: true, questionGroupId, position: 2 }),
      mockQuestion({
        noBlocks: true,
        id: questionId,
        questionGroupId,
        position: 3,
      }),
    ];
    const result2 = getNarratorPositionForANewBlock(
      allQuestions,
      questionId,
      groupIds,
    );
    expect(result2).toEqual(initialPosition);
  });
});

describe('getNarratorPositionWhenQuestionIsChanged', () => {
  it('Should return position of thef first block in the current question', () => {
    const characterPosition = { x: 125, y: 125 };
    const allQuestions = [
      mockQuestion({ questionGroupId }),
      mockQuestion({
        firstPosition: characterPosition,
        questionGroupId,
        id: questionId,
      }),
      mockQuestion({ questionGroupId }),
    ];
    const result = getNarratorPositionWhenQuestionIsChanged(
      allQuestions,
      questionId,
      groupIds,
    );
    expect(result).toEqual(characterPosition);
  });

  it('Should return position of the last block in any of the previous questions', () => {
    const characterPosition = { x: 150, y: 150 };
    const allQuestions = [
      mockQuestion({ lastPosition: characterPosition, questionGroupId }),
      mockQuestion({ noBlocks: true, questionGroupId, id: questionId }),
      mockQuestion(),
    ];
    const result = getNarratorPositionWhenQuestionIsChanged(
      allQuestions,
      questionId,
      groupIds,
    );
    expect(result).toEqual(characterPosition);
  });

  it('Should return initial position when there is no blocks', () => {
    const allQuestions = [
      mockQuestion({ noBlocks: true, questionGroupId, position: 1 }),
      mockQuestion({ noBlocks: true, questionGroupId, position: 2 }),
      mockQuestion({
        noBlocks: true,
        questionGroupId,
        position: 3,
        id: questionId,
      }),
    ];
    const result = getNarratorPositionWhenQuestionIsChanged(
      allQuestions,
      questionId,
      groupIds,
    );
    expect(result).toEqual(initialPosition);
  });
});

describe('getNarratorPositionWhenBlockIsRemoved', () => {
  it('Should return initial position when there are no questions at all', () => {
    const allQuestions = [];
    const questionIndex = 0;
    const deletedIndex = 0;
    const openedBlockIndex = 0;
    const result = getNarratorPositionWhenBlockIsRemoved(
      allQuestions,
      questionIndex,
      deletedIndex,
      openedBlockIndex,
    );
    expect(result).toEqual(initialPosition);
  });

  it('Should return first block in the current question when all blocks are closed', () => {
    const characterPosition = { x: 175, y: 175 };
    const allQuestions = [
      mockQuestion(),
      mockQuestion({ firstPosition: characterPosition }),
      mockQuestion(),
    ];
    const questionIndex = 1;
    const deletedIndex = 2;
    const openedBlockIndex = -1;
    const result = getNarratorPositionWhenBlockIsRemoved(
      allQuestions,
      questionIndex,
      deletedIndex,
      openedBlockIndex,
    );
    expect(result).toEqual(characterPosition);
  });

  it('Should return last position in any of the previous question when only block in the current question is deleted and all blocks are closed', () => {
    const characterPosition = { x: 200, y: 200 };

    const allQuestions = [
      mockQuestion({ questionGroupId }),
      mockQuestion({ lastPosition: characterPosition, questionGroupId }),
      mockQuestion({ noBlocks: true, questionGroupId, id: questionId }),
    ];
    const questionIndex = 2;
    const deletedIndex = 0;
    const openedBlockIndex = -1;
    const result = getNarratorPositionWhenBlockIsRemoved(
      allQuestions,
      questionIndex,
      deletedIndex,
      openedBlockIndex,
      groupIds,
    );
    expect(result).toEqual(characterPosition);
  });

  it('Should return initial position when only block was deleted and there is no previous blocks in previous quesitons and all blocks are closed', () => {
    const allQuestions = [
      mockQuestion({ noBlocks: true, questionGroupId }),
      mockQuestion({ noBlocks: true, questionGroupId }),
      mockQuestion({ noBlocks: true, questionGroupId, id: questionId }),
    ];
    const questionIndex = 2;
    const deletedIndex = 0;
    const openedBlockIndex = -1;
    const result = getNarratorPositionWhenBlockIsRemoved(
      allQuestions,
      questionIndex,
      deletedIndex,
      openedBlockIndex,
      groupIds,
    );
    expect(result).toEqual(initialPosition);
  });

  it('Should return last position in any of the previous question when only block in the current question is deleted', () => {
    const characterPosition = { x: 225, y: 225 };
    const allQuestions = [
      mockQuestion({ questionGroupId }),
      mockQuestion({ lastPosition: characterPosition, questionGroupId }),
      mockQuestion({ noBlocks: true, id: questionId, questionGroupId }),
    ];
    const questionIndex = 2;
    const deletedIndex = 0;
    const openedBlockIndex = 0;
    const result = getNarratorPositionWhenBlockIsRemoved(
      allQuestions,
      questionIndex,
      deletedIndex,
      openedBlockIndex,
      groupIds,
    );
    expect(result).toEqual(characterPosition);
  });

  it('Should return initial position when only block was deleted and there is no previous blocks in previous quesitons', () => {
    const allQuestions = [
      mockQuestion({ noBlocks: true, questionGroupId }),
      mockQuestion({ noBlocks: true, questionGroupId }),
      mockQuestion({ noBlocks: true, questionGroupId, id: questionId }),
    ];
    const questionIndex = 2;
    const deletedIndex = 0;
    const openedBlockIndex = 0;
    const result = getNarratorPositionWhenBlockIsRemoved(
      allQuestions,
      questionIndex,
      deletedIndex,
      openedBlockIndex,
      groupIds,
    );
    expect(result).toEqual(initialPosition);
  });

  it('Should return character position of the previous block if the last block was deleted', () => {
    const characterPosition = { x: 250, y: 250 };
    const blocksSize = 4;
    const allQuestions = [
      mockQuestion({ blocksSize }),
      mockQuestion({
        blocksSize,
        customPosition: { index: blocksSize - 1, position: characterPosition },
      }),
      mockQuestion({ blocksSize }),
    ];
    const questionIndex = 1;
    const deletedIndex = blocksSize;
    const openedBlockIndex = blocksSize - 1;
    const result = getNarratorPositionWhenBlockIsRemoved(
      allQuestions,
      questionIndex,
      deletedIndex,
      openedBlockIndex,
    );
    expect(result).toEqual(characterPosition);
  });

  it('Should return character position of the block that current index is the one that was deleted', () => {
    const characterPosition = { x: 275, y: 275 };
    const allQuestions = [
      mockQuestion(),
      mockQuestion({
        customPosition: { index: 3, position: characterPosition },
      }),
      mockQuestion(),
    ];
    const questionIndex = 1;
    const deletedIndex = 3;
    const openedBlockIndex = 3;
    const result = getNarratorPositionWhenBlockIsRemoved(
      allQuestions,
      questionIndex,
      deletedIndex,
      openedBlockIndex,
    );
    expect(result).toEqual(characterPosition);
  });

  describe.only('getNarratorPositionWhenQuestionIsAdded', () => {
    it('Should return initial position when there is only one block', () => {
      const allQuestions = [mockQuestion()];

      expect(
        getNarratorPositionWhenQuestionIsAdded(
          allQuestions,
          mockQuestion(),
          groupIds,
        ),
      ).toEqual(initialPosition);
    });

    it('Should return initial position if no blocks before has position', () => {
      const allQuestions = [
        mockQuestion({ noBlocks: true, questionGroupId }),
        mockQuestion({ noBlocks: true, questionGroupId }),
      ];

      expect(
        getNarratorPositionWhenQuestionIsAdded(
          allQuestions,
          mockQuestion(),
          groupIds,
        ),
      ).toEqual(initialPosition);
    });

    it('Should return correct position', () => {
      const lastPosition = { x: 100, y: 100 };
      const allQuestions = [
        mockQuestion({ noBlocks: true, questionGroupId, position: 2 }),
        mockQuestion({
          questionGroupId,
          position: 1,
          lastPosition,
        }),
      ];

      expect(
        getNarratorPositionWhenQuestionIsAdded(
          allQuestions,
          mockQuestion({ questionGroupId, id: questionId }),
          groupIds,
        ),
      ).toEqual(lastPosition);
    });

    it('Should return correct position for question in another group', () => {
      const lastPosition = { x: 100, y: 100 };
      const someGroup = 'some-group';
      const allQuestions = [
        mockQuestion({ noBlocks: true, questionGroupId, position: 1 }),
        mockQuestion({
          questionGroupId: someGroup,
          position: 1,
          lastPosition,
        }),
      ];

      expect(
        getNarratorPositionWhenQuestionIsAdded(
          allQuestions,
          mockQuestion({ questionGroupId, id: questionId }),
          [someGroup, questionGroupId],
        ),
      ).toEqual(lastPosition);
    });

    it('Should return correct position for question in another group', () => {
      const lastPosition = { x: 100, y: 100 };
      const someGroup = 'some-group';
      const allQuestions = [
        mockQuestion({ noBlocks: true, questionGroupId, position: 1 }),
        mockQuestion({
          questionGroupId: someGroup,
          position: 1,
          lastPosition,
        }),
      ];

      expect(
        getNarratorPositionWhenQuestionIsAdded(
          allQuestions,
          mockQuestion({ questionGroupId, id: questionId }),
          [questionGroupId, someGroup],
        ),
      ).toEqual(initialPosition);
    });
  });
});
