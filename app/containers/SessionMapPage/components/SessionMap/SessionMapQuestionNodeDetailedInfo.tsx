import React from 'react';
import { useIntl } from 'react-intl';

import { htmlToPlainText } from 'utils/htmlToPlainText';
import { Question } from 'global/types/question';

import { themeColors } from 'theme';
import Text from 'components/Text';
import Divider from 'components/Divider';
import Switch, { LabelPosition } from 'components/Switch';
import EllipsisText from 'components/Text/EllipsisText';
import Row from 'components/Row';
import QuestionTypeIndicator from 'components/QuestionTypeIndicator';

import messages from '../../messages';
import { SHOW_DETAILS_CLASSNAME, DIVIDER_CLASSNAME } from '../../constants';

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
      <QuestionTypeIndicator
        type={type}
        iconSize="7px"
        fontSize={10}
        fontWeight="medium"
        mb={9}
        gap={6}
      />
      <EllipsisText
        text={htmlToPlainText(subtitle)}
        dataFor={id}
        lines={2}
        fontSize={12}
        fontWeight="bold"
        width={160}
      />
      <Divider my={16} className={DIVIDER_CLASSNAME} />
      <Row className={SHOW_DETAILS_CLASSNAME}>
        <div onClick={(e) => e.stopPropagation()}>
          <Switch
            checked={showDetails}
            onToggle={handleToggle}
            id={`show-details-switch-${id}`}
            labelPosition={LabelPosition.Right}
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
        </div>
      </Row>
    </div>
  );
};

export default SessionMapQuestionNodeDetailedInfo;
