import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Row, Col } from 'react-grid-system';

import DashedButton from 'components/Button/DashedButton';

import {
  createVariantRequest,
  makeSelectVariants,
  makeSelectSelectedVariantId,
  reorderTextMessageVariantsRequest,
} from 'global/reducers/textMessages';
import Loader from 'components/Loader';

import Variants from './Variants';
import messages from './messages';
import { TextMessagesContext } from '../../utils';

const TextMessageVariants = ({
  createVariant,
  variants,
  selectedVariantId,
  reorderTextMessageVariants,
}) => {
  const {
    formatMessage,
    loaders: { createVariantLoading, fetchVariantsAndPhonesLoading },
    editingPossible,
    selectedMessage: { id },
  } = useContext(TextMessagesContext);

  const onReorderTextMessageVariants = (reorderedVariants) => {
    reorderTextMessageVariants(id, reorderedVariants);
  };

  if (fetchVariantsAndPhonesLoading) return <Loader type="inline" />;
  return (
    <>
      <Variants
        selectedVariantId={selectedVariantId}
        disabled={!editingPossible}
        variants={variants}
        onReorder={onReorderTextMessageVariants}
      />
      <Row style={{ marginTop: 20 }}>
        <Col>
          <DashedButton
            disabled={!editingPossible}
            loading={createVariantLoading}
            onClick={createVariant}
          >
            {formatMessage(messages.addCaseButton)}
          </DashedButton>
        </Col>
      </Row>
    </>
  );
};

TextMessageVariants.propTypes = {
  createVariant: PropTypes.func,
  variants: PropTypes.array,
  selectedVariantId: PropTypes.string,
  reorderTextMessageVariants: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  variants: makeSelectVariants(),
  selectedVariantId: makeSelectSelectedVariantId(),
});

const mapDispatchToProps = {
  createVariant: createVariantRequest,
  reorderTextMessageVariants: reorderTextMessageVariantsRequest,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(TextMessageVariants);
