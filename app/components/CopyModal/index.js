/**
 *
 * CopyModal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, IntlShape } from 'react-intl';

import CopyChooser, { VIEWS } from 'components/CopyModal/Components';

import { draft } from 'models/Status/StatusTypes';

import { CopyModalContext } from './utils';
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
  interventionStatusFilter,
}) => {
  const handleCopy = target => {
    copyAction(target);
    onClose();
  };

  return (
    <CopyModalContext.Provider value={{ interventionStatusFilter }}>
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
    </CopyModalContext.Provider>
  );
};

CopyModal.propTypes = {
  intl: PropTypes.shape(IntlShape),
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  copyAction: PropTypes.func,
  disableQuestionGroupCopy: PropTypes.bool,
  disableSessionCopy: PropTypes.bool,
  disableInterventionCopy: PropTypes.bool,
  pasteText: PropTypes.string,
  defaultView: PropTypes.string,
  interventionStatusFilter: PropTypes.arrayOf(PropTypes.string),
};

CopyModal.defaultProps = {
  visible: false,
  disableQuestionGroupCopy: false,
  disableSessionCopy: false,
  disableInterventionCopy: false,
  defaultView: VIEWS.QUESTION_GROUP,
  interventionStatusFilter: [draft],
};

export default injectIntl(CopyModal);
