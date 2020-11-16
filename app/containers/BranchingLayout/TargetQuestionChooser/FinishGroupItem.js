import React from 'react';
import PropTypes from 'prop-types';
import Box from 'components/Box';
import EllipsisText from 'components/Text/EllipsisText';
import { htmlToPlainText } from 'utils/htmlToPlainText';
import { colors } from 'theme';
import { FinishGroupItemStyled } from 'containers/BranchingLayout/TargetQuestionChooser/styled';

const FinishGroupItem = ({
  onClick,
  target,
  question: { id, subtitle, type },
}) => (
  <FinishGroupItemStyled
    padding={10}
    mt={10}
    mb={5}
    onClick={() => onClick({ type, id })}
    selected={target.id === id}
  >
    <Box maxWidth={230}>
      <EllipsisText text={htmlToPlainText(subtitle)} color={colors.white} />
    </Box>
  </FinishGroupItemStyled>
);
FinishGroupItem.propTypes = {
  onClick: PropTypes.func,
  target: PropTypes.object,
  question: PropTypes.shape({
    id: PropTypes.string,
    subtitle: PropTypes.string,
    type: PropTypes.string,
  }),
};

export default FinishGroupItem;
