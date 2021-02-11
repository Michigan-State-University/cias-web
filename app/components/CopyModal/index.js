/**
 *
 * CopyModal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

import CopyChooser, { VIEWS } from 'components/CopyModal/Components';

import Modal from '../Modal';
import messages from './messages';

const CopyModal = ({
  intl: { formatMessage },
  visible,
  onClose,
  copyAction,
  disableQuestionGroupCopy,
  disableSessionCopy,
  disableInterventionCopy,
  pasteText,
  defaultView,
}) => {
  const handleCopy = target => {
    copyAction(target);
    onClose();
  };
  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title={formatMessage(messages.selectPlace)}
      padding="25px 0"
      titleProps={{ mx: 25 }}
    >
      <CopyChooser
        defaultView={defaultView}
        onClick={handleCopy}
        disableQuestionGroupCopy={disableQuestionGroupCopy}
        disableSessionCopy={disableSessionCopy}
        disableInterventionCopy={disableInterventionCopy}
        pasteText={pasteText}
      />
    </Modal>
  );
};

CopyModal.propTypes = {
  intl: intlShape,
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  copyAction: PropTypes.func,
  disableQuestionGroupCopy: PropTypes.bool,
  disableSessionCopy: PropTypes.bool,
  disableInterventionCopy: PropTypes.bool,
  pasteText: PropTypes.string,
  defaultView: PropTypes.string,
};

CopyModal.defaultProps = {
  visible: false,
  disableQuestionGroupCopy: false,
  disableSessionCopy: false,
  disableInterventionCopy: false,
  defaultView: VIEWS.QUESTION_GROUP,
};

export default injectIntl(CopyModal);
