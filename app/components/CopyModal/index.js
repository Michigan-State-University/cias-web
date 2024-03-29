/**
 *
 * CopyModal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, IntlShape } from 'react-intl';
import { compose } from 'redux';
import { injectSaga, injectReducer } from 'redux-injectors';

import { InterventionStatus } from 'models/Intervention';

import CopyChooser, { VIEWS } from 'components/CopyModal/Components';

import {
  copyModalReducer,
  allCopyModalSagas,
} from 'global/reducers/copyModalReducer';

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
  disableCurrentQuestionGroupCopy,
  disableCurrentSessionCopy,
  disableCurrentInterventionCopy,
  pasteText,
  defaultView,
  interventionStatusFilter,
}) => {
  const handleCopy = (target) => {
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
        width={440}
      >
        <CopyChooser
          defaultView={defaultView}
          onClick={handleCopy}
          disableQuestionGroupCopy={disableQuestionGroupCopy}
          disableSessionCopy={disableSessionCopy}
          disableInterventionCopy={disableInterventionCopy}
          disableCurrentQuestionGroupCopy={disableCurrentQuestionGroupCopy}
          disableCurrentSessionCopy={disableCurrentSessionCopy}
          disableCurrentInterventionCopy={disableCurrentInterventionCopy}
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
  disableCurrentQuestionGroupCopy: PropTypes.bool,
  disableCurrentSessionCopy: PropTypes.bool,
  disableCurrentInterventionCopy: PropTypes.bool,
  pasteText: PropTypes.string,
  defaultView: PropTypes.string,
  interventionStatusFilter: PropTypes.arrayOf(PropTypes.string),
};

CopyModal.defaultProps = {
  visible: false,
  disableQuestionGroupCopy: false,
  disableSessionCopy: false,
  disableInterventionCopy: false,
  disableCurrentQuestionGroupCopy: false,
  disableCurrentSessionCopy: false,
  disableCurrentInterventionCopy: false,
  defaultView: VIEWS.QUESTION_GROUP,
  interventionStatusFilter: [InterventionStatus.DRAFT],
};

export default compose(
  injectIntl,
  injectReducer({ key: 'copyModal', reducer: copyModalReducer }),
  injectSaga({ key: 'copyModal', saga: allCopyModalSagas }),
)(CopyModal);
