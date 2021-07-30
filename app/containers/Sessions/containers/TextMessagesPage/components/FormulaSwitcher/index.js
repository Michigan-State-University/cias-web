import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Row from 'components/Row';
import Text from 'components/Text';
import Switch from 'components/Switch';
import { changeFormulaUsed } from 'global/reducers/textMessages';

import messages from './messages';
import { TextMessagesContext } from '../../utils';

const FormulaSwitcher = ({ isUsedFormula, changeAction }) => {
  const { formatMessage, editingPossible } = useContext(TextMessagesContext);
  return (
    <Row mb={30} align="center">
      <Text mr={15} fontSize={15} fontWeight="bold">
        {formatMessage(messages.useFormula)}
      </Text>
      <Switch
        onToggle={changeAction}
        checked={isUsedFormula}
        disabled={!editingPossible}
      />
    </Row>
  );
};

FormulaSwitcher.propTypes = {
  changeAction: PropTypes.func,
  isUsedFormula: PropTypes.bool,
};

const mapDispatchToProps = {
  changeAction: changeFormulaUsed,
};

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect)(FormulaSwitcher);
