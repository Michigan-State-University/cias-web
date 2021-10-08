import React, { memo } from 'react';
import { useIntl } from 'react-intl';

import Comment from 'components/Text/Comment';
import Row from 'components/Row';
import H2 from 'components/H2';
import Checkbox from 'components/Checkbox';

import messages from '../messages';

type Props = {
  showWithBranchingOnly: boolean;
  onShowWithBranchingOnlyChange: (newValue: boolean) => void;
  showWithBranchingOnlyEnabled: boolean;
};

const SessionMapHeader = ({
  showWithBranchingOnly,
  onShowWithBranchingOnlyChange,
  showWithBranchingOnlyEnabled,
}: Props): JSX.Element => {
  const { formatMessage } = useIntl();

  const handleCheckboxClick = () => {
    onShowWithBranchingOnlyChange(!showWithBranchingOnly);
  };

  return (
    <div>
      <Row justify="between" mb={15}>
        <H2>{formatMessage(messages.sessionMap)}</H2>
        <Row align="center" gap={10}>
          <Checkbox
            checked={showWithBranchingOnly}
            disabled={!showWithBranchingOnlyEnabled}
            onChange={handleCheckboxClick}
            id="show-only-with-branching-checkbox"
          >
            <Comment>{formatMessage(messages.showWithBranchingOnly)}</Comment>
          </Checkbox>
        </Row>
      </Row>
      <Comment mb={20}>{formatMessage(messages.sessionMapComment)}</Comment>
    </div>
  );
};

export default memo(SessionMapHeader);
