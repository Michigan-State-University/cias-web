import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Text from 'components/Text';
import Column from 'components/Column';
import { StyledInput } from 'components/Input/StyledInput';
import Box from 'components/Box';
import { changeNoFormulaText } from 'global/reducers/textMessages';
import { colors } from 'theme';

import messages from './messages';
import { TextMessagesContext } from '../../utils';

const NoFormulaMessage = ({ noFormulaText, changeAction }) => {
  const { formatMessage, editingPossible } = useContext(TextMessagesContext);
  return (
    <Column justify="center">
      <Text mr={13} fontSize={15} fontWeight="bold">
        {formatMessage(messages.label)}
      </Text>
      <Box bg={colors.linkWater} width="100%" mt={10} mb={20} px={8} py={8}>
        <StyledInput
          disabled={!editingPossible}
          type="multiline"
          rows="5"
          width="100%"
          placeholder={formatMessage(messages.textMessagePlaceholder)}
          value={noFormulaText || ''}
          onBlur={changeAction}
        />
      </Box>
    </Column>
  );
};

NoFormulaMessage.propTypes = {
  changeAction: PropTypes.func,
  noFormulaText: PropTypes.string,
};

const mapDispatchToProps = {
  changeAction: changeNoFormulaText,
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(NoFormulaMessage);
