import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { Markup } from 'interweave';

import { colors } from 'theme';
import Text from 'components/Text';

import messages from './messages';
import { formatCaseMatch } from './utils';

type Props = {
  match: string;
  caseTargetElementId: string;
};

const CaseMatch = ({ match, caseTargetElementId }: Props): JSX.Element => {
  const { formatMessage } = useIntl();

  const formattedMatch = useMemo(
    () =>
      `<span style='color: ${colors.azure};'>${formatCaseMatch(match)}</span>`,
    [match],
  );

  const [height, setHeight] = useState<Nullable<number>>(null);

  const updateHeight = useCallback(() => {
    setHeight(document.getElementById(caseTargetElementId)?.clientHeight);
  }, [caseTargetElementId]);

  useEffect(() => {
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <Text
      color={colors.manatee}
      fontWeight="bold"
      whiteSpace="nowrap"
      width="auto"
      mt={15}
      mr={30}
      height={height}
    >
      <Markup
        content={formatMessage(messages.if, {
          match: formattedMatch,
        })}
        noWrap
      />
    </Text>
  );
};

export default CaseMatch;
