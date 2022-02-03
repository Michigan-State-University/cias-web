import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { TlfbQuestionWithConfigDTO as TlfbQuestionWithConfig } from 'models/Question';
import globalMessages from 'global/i18n/globalMessages';

import Text from 'components/Text';
import Radio from 'components/Radio';
import Box from 'components/Box';
import Divider from 'components/Divider';
import Button from 'components/Button';

import { SharedProps } from './sharedProps';
import messages from '../messages';
import TlfbCalendarLayout from '../layouts/TlfbCalendarLayout';

const TlfbQuestion = ({
  question,
  isMobile,
  isMobilePreview,
}: SharedProps<TlfbQuestionWithConfig>) => {
  const [dayId, setDayId] = useState<string | undefined>(undefined);
  // TODO: connect it with backend it can stay for now will be removed in #2088
  console.log(dayId);
  const {
    body: {
      config,
      data: [
        {
          payload: {
            head_question: headQuestion,
            question_title: questionTitle,
            substance_question: substanceQuestion,
          },
        },
      ],
    },
  } = question;
  return (
    <TlfbCalendarLayout
      bigText={headQuestion}
      smallText={questionTitle}
      isMobile={isMobile}
      isMobilePreview={isMobilePreview}
      tlfbConfig={config}
      setDayId={setDayId}
    >
      <>
        <Text fontWeight="bold" fontSize={16}>
          {substanceQuestion}
        </Text>
        <Box my={25} display="flex">
          <Radio id="RADIO" onChange={() => {}} checked={false}>
            <Text mr={32}>
              <FormattedMessage {...globalMessages.yes} />
            </Text>
          </Radio>
          <Radio id="RADIO" onChange={() => {}} checked={false}>
            <Text>
              <FormattedMessage {...globalMessages.no} />
            </Text>
          </Radio>
        </Box>
        <Divider mb={25} />
        {/* @ts-ignore */}
        <Button width="auto" px={30}>
          <FormattedMessage {...messages.goToNextDay} />
        </Button>
      </>
    </TlfbCalendarLayout>
  );
};

export default TlfbQuestion;
