import join from 'lodash/join';

import {
  readQuestionBlockType,
  reflectionFormulaType,
  reflectionType,
  speechType,
} from 'models/Narrator/BlockTypes';

const ALLOWED_BLOCKS = [
  readQuestionBlockType,
  speechType,
  reflectionType,
  reflectionFormulaType,
];

export const mapBlockToTextWithRealIndex = (blocks) => {
  const blocksWithRealIndexMapped = blocks.map((block, index) => ({
    ...block,
    realIndex: index,
  }));

  const allowedBlocks = filterAllowedBlocks(blocksWithRealIndexMapped);

  return allowedBlocks.map((block) => {
    const text = extractBlocksText(block);

    return {
      text,
      realIndex: block.realIndex,
    };
  });
};

export const filterAllowedBlocks = (blocks) =>
  blocks.filter((block) => ALLOWED_BLOCKS.includes(block.type));

export const extractBlocksText = (block) => {
  switch (block.type) {
    case speechType:
    case readQuestionBlockType:
      return extractTextFromStandardSpeech(block);

    case reflectionType:
    case reflectionFormulaType:
      return extractTextFromReflectionSpeech(block);

    default:
      return '';
  }
};

const extractTextFromStandardSpeech = (block) => join(block.text, '');

const extractTextFromReflectionSpeech = (block) => {
  const { target_value: targetValue } = block;

  if (!targetValue) return '';

  switch (targetValue.constructor) {
    case Array:
      const mergedReflectionsTextArray = targetValue.map(
        extractTextFromStandardSpeech,
      );
      return join(mergedReflectionsTextArray, '');

    case Object:
    default:
      return extractTextFromStandardSpeech(targetValue);
  }
};
