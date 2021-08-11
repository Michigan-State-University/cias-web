import React, { useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { Markup } from 'interweave';

import { CLASSIC_SESSION } from 'models/Session/constants';
import Text from 'components/Text';
import Button from 'components/Button';
import Box from 'components/Box';
import Radio from 'components/Radio';
import { colors } from 'theme';

import messages from './messages';
import { prepareSessionTypes } from './constants';

type Props = {
  onCreateSession: (sessionType: string) => void;
};

const SessionTypeChooser = ({ onCreateSession }: Props): JSX.Element => {
  const { formatMessage } = useIntl();
  const [selectedSessionType, setSelectedSessionType] =
    useState(CLASSIC_SESSION);

  const sessionTypes = useMemo(
    () => prepareSessionTypes(formatMessage),
    [formatMessage],
  );

  return (
    <div>
      <Text>{formatMessage(messages.selectSessionType)}</Text>
      {sessionTypes.map(({ description, title, type }) => {
        const isChecked = type === selectedSessionType;
        return (
          <Box
            mt={20}
            key={type}
            display="flex"
            onClick={() => setSelectedSessionType(type)}
            align="center"
            padding={20}
            clickable
            border={`1px solid ${colors.linkWater}`}
            background={isChecked ? colors.zirkon : colors.white}
            borderRadius={5}
          >
            <Radio mr={10} checked={isChecked} />
            <div>
              <Box fontSize={15} fontWeight={isChecked ? 'bold' : 'regular'}>
                <Markup content={title}></Markup>
              </Box>
              <Text
                color={colors.bluewood}
                textOpacity={isChecked ? 1 : 0.5}
                fontSize={13}
                mt={15}
              >
                {description}
              </Text>
            </div>
          </Box>
        );
      })}
      <Box display="flex" justify="end">
        {/* @ts-ignore */}
        <Button
          width={150}
          mt={20}
          onClick={() => onCreateSession(selectedSessionType)}
        >
          {formatMessage(messages.create)}
        </Button>
      </Box>
    </div>
  );
};

export default SessionTypeChooser;
