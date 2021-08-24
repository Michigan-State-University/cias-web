import React from 'react';
import { useIntl } from 'react-intl';

import { htmlToPlainText } from 'utils/htmlToPlainText';
import { QuestionTypes } from 'models/Session/QuestionTypes';
import globalMessages from 'global/i18n/globalMessages';
import { Question } from 'global/types/question';

import { themeColors } from 'theme';
import StyledCircle from 'components/Circle/StyledCircle';
import Text from 'components/Text';
import Divider from 'components/Divider';
import Switch from 'components/Switch';
import EllipsisText from 'components/Text/EllipsisText';
import Row from 'components/Row';

import messages from '../messages';

type Props = {
  question: Question;
  showDetails: boolean;
  onShowDetailsChange: (showDetails: boolean, is: string) => void;
};

const SessionMapQuestionNodeDetailedInfo = ({
  question,
  showDetails,
  onShowDetailsChange,
}: Props): JSX.Element => {
  const { formatMessage } = useIntl();

  const { id, subtitle, type } = question;

  const handleToggle = (isToggled: boolean) =>
    onShowDetailsChange(isToggled, id);

  return (
    <div>
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
        width={160}
      />
      <Divider my={16} />
      <Row align="center">
        <Switch
          checked={showDetails}
          onToggle={handleToggle}
          id={`show-details-switch-${id}`}
        >
          <Text
            ml={5}
            fontSize={12}
            fontWeight="bold"
            color={themeColors.comment}
          >
            {formatMessage(messages.showDetails)}
          </Text>
        </Switch>
      </Row>
    </div>
  );
};

export default SessionMapQuestionNodeDetailedInfo;
