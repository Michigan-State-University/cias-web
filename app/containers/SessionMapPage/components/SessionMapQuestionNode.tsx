import React, { memo, useMemo } from 'react';
import { useIntl } from 'react-intl';

import { htmlToPlainText } from 'utils/htmlToPlainText';
import { finishQuestion, QuestionTypes } from 'models/Session/QuestionTypes';
import globalMessages from 'global/i18n/globalMessages';

import { themeColors } from 'theme';
import Box from 'components/Box';
import Row from 'components/Row';
import StyledCircle from 'components/Circle/StyledCircle';
import Text from 'components/Text';
import Divider from 'components/Divider';
import Switch from 'components/Switch';
import EllipsisText from 'components/Text/EllipsisText';

import messages from '../messages';
import { QuestionTileData } from '../types';
import { sessionMapColors } from '../constants';
import SessionMapNodeHandles from './SessionMapNodeHandles';

const getBorder = (detailsShown: boolean) =>
  detailsShown
    ? `3px solid ${sessionMapColors.nodeDetailsShown}`
    : `1px solid ${sessionMapColors.nodeBase}`;

const SessionMapQuestionNode = ({
  data: { question, showDetails, onShowDetailsChange },
}: {
  data: QuestionTileData;
}): JSX.Element => {
  const { formatMessage } = useIntl();

  const { id, subtitle, type } = question;

  const border = useMemo(() => getBorder(showDetails), [showDetails]);

  const handleToggle = (isToggled: boolean) =>
    onShowDetailsChange(isToggled, id);

  return (
    <>
      <Box
        py={showDetails ? 16 : 18}
        px={showDetails ? 22 : 24}
        width={210}
        maxHeight={146} // workaround to make dagre layout question nodes with ellipsis text correctly, update if necessary
        bg={themeColors.highlight}
        border={border}
        cursor="default"
      >
        <Row align="center" mb={9}>
          <StyledCircle
            background={
              QuestionTypes.find(({ id: typeId }) => typeId === type)?.color
            }
            size="7px"
            mr={6}
          />
          <Text fontSize={10} fontWeight="medium" color={themeColors.comment}>
            {
              // @ts-ignore
              formatMessage(globalMessages.questionTypes[type])
            }
          </Text>
        </Row>
        <EllipsisText
          text={htmlToPlainText(subtitle)}
          dataFor={id}
          lines={2}
          fontSize={12}
          fontWeight="bold"
        />
        <Divider my={16} />
        <Row align="center">
          {
            // @ts-ignore
            <Switch
              checked={showDetails}
              mr={10}
              onToggle={(isToggled: boolean) => handleToggle(isToggled)}
              id={`show-details-switch-${id}`}
            />
          }
          <Text fontSize={12} fontWeight="bold" color={themeColors.comment}>
            {formatMessage(messages.showDetails)}
          </Text>
        </Row>
      </Box>
      <SessionMapNodeHandles
        nodeId={id}
        showSourceHandle={type !== finishQuestion.id}
      />
    </>
  );
};

export default memo(SessionMapQuestionNode);
