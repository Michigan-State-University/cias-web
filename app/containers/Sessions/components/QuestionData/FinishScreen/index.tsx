import React from 'react';
import { useIntl } from 'react-intl';

import { InterventionSharedTo } from 'models/Intervention';

import Column from 'components/Column';
import Row from 'components/Row';
import Button from 'components/Button';

import messages from './messages';

import { CommonQuestionProps } from '../types';

type Props = CommonQuestionProps;

const FinishScreen = ({ sharedTo }: Props) => {
  const { formatMessage } = useIntl();
  return (
    <Column mt={10}>
      <Row mt={50} justify="center" width="100%">
        <Button disabled px={20} width="auto">
          {formatMessage(
            messages[
              sharedTo !== InterventionSharedTo.ANYONE
                ? 'dashboard'
                : 'closeMySession'
            ],
          )}
        </Button>
      </Row>
    </Column>
  );
};

export default FinishScreen;
