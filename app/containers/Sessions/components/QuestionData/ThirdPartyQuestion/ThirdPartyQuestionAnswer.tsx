import React, { FC, useCallback } from 'react';
import { useIntl } from 'react-intl';

import ReorderIcon from 'assets/svg/reorder-hand.svg';
import bin from 'assets/svg/bin-red.svg';
import radio from 'assets/svg/radio-button.svg';

import globalMessages from 'global/i18n/globalMessages';
import { numericValidator } from 'utils/validators';
import { colors } from 'theme';

import { ThirdPartyReportQuestionDataDTO } from 'models/Question';

import FlexibleWidthApprovableInput from 'components/Input/FlexibleWidthApprovableInput';
import Box from 'components/Box';
import Column from 'components/Column';
import HoverableBox from 'components/Box/HoverableBox';
import Img from 'components/Img';
import Row from 'components/Row';
import OriginalTextHover from 'components/OriginalTextHover';
import BadgeInput from 'components/Input/BadgeInput';
import { TDragHandleProps } from 'components/DragAndDrop/types';

import ReportChooser from './ReportChooser';
import messages from './messages';
import { RecipientsChooser } from './RecipientsChooser';

export type Props = {
  questionId: string;
  answer: ThirdPartyReportQuestionDataDTO;
  isNarratorTabOrEditNotPossible: boolean;
  isNarratorTab: boolean;
  editingPossible: boolean;
  index: number;
  dragHandleProps: TDragHandleProps;
  onMouseEnter: (index: number) => void;
  onMouseLeave: () => void;
  hoveredIndex: number;
  canDeleteAnswer: boolean;
  onChange: (index: number, answer: ThirdPartyReportQuestionDataDTO) => void;
  onRemove: (index: number) => void;
};

export const ThirdPartyQuestionAnswer: FC<Props> = ({
  questionId,
  answer,
  isNarratorTabOrEditNotPossible,
  isNarratorTab,
  editingPossible,
  index,
  dragHandleProps,
  onMouseEnter,
  onMouseLeave,
  hoveredIndex,
  canDeleteAnswer,
  onChange,
  onRemove,
}) => {
  const { formatMessage } = useIntl();

  const handleMouseEnter = useCallback(() => {
    if (!isNarratorTabOrEditNotPossible) onMouseEnter(index);
  }, [index]);

  const handleChangeTitle = (payload: string) =>
    onChange(index, { ...answer, payload });

  const handleRemove = () => onRemove(index);

  const handleChangeScore = (numeric_value: string) => {
    onChange(index, { ...answer, numeric_value });
  };

  const handleChangeRecipients = useCallback(
    (value: string) => {
      onChange(index, { ...answer, value });
    },
    [index, answer],
  );

  const handleChangeReportTemplateIds = (report_template_ids: string[]) => {
    onChange(index, { ...answer, report_template_ids });
  };

  return (
    <Row mb={12}>
      <HoverableBox
        hoverColor={isNarratorTabOrEditNotPossible ? null : undefined}
        px={21}
        py={14}
        width="100%"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={onMouseLeave}
        clickable={false}
      >
        <Column>
          <Row
            align="center"
            justify="between"
            mb={isNarratorTabOrEditNotPossible ? 0 : 10}
          >
            <Row width="90%">
              {!isNarratorTabOrEditNotPossible && (
                <Img
                  alt={formatMessage(messages.reorderIconAlt, {
                    index,
                  })}
                  mr={10}
                  src={ReorderIcon}
                  disabled={false}
                  cursor="grab"
                  {...dragHandleProps}
                />
              )}
              <Img width="max-content" src={radio} mr={15} />
              <OriginalTextHover
                id={`question-${questionId}-answer-${index}`}
                text={answer.original_text}
                hidden={isNarratorTab}
              >
                <FlexibleWidthApprovableInput
                  fontSize={18}
                  type="singleline"
                  placeholder={
                    !isNarratorTab
                      ? formatMessage(messages.placeholder, {
                          index: index + 1,
                        })
                      : ''
                  }
                  value={answer.payload}
                  onCheck={handleChangeTitle}
                  richText
                  disabled={isNarratorTabOrEditNotPossible}
                  emptyWidth={110}
                />
              </OriginalTextHover>
            </Row>
            {canDeleteAnswer && (
              <Row>
                <Box
                  onClick={handleRemove}
                  hidden={hoveredIndex !== index}
                  clickable
                >
                  <Img src={bin} mr={16} />
                </Box>
              </Row>
            )}
          </Row>
          <Column
            mb={10}
            ml={40}
            align="left"
            hidden={isNarratorTab}
            gap={10}
            width="auto"
          >
            <BadgeInput
              data-cy={`score-${index}-input`}
              disabled={!editingPossible}
              px={0}
              py={12}
              textAlign="center"
              validator={numericValidator}
              keyboard="tel"
              placeholder={formatMessage(
                // @ts-ignore
                globalMessages.variables.variableScorePlaceholder,
              )}
              value={answer.numeric_value}
              color={colors.azure}
              onBlur={handleChangeScore}
            />
            <RecipientsChooser
              disabled={!editingPossible}
              recipients={answer.value}
              modalTitle={answer.payload}
              onChange={handleChangeRecipients}
            />
          </Column>
        </Column>

        {!isNarratorTab && (
          <ReportChooser
            formatMessage={formatMessage}
            value={answer.report_template_ids}
            onChange={handleChangeReportTemplateIds}
            disabled={!editingPossible}
          />
        )}
      </HoverableBox>
    </Row>
  );
};
