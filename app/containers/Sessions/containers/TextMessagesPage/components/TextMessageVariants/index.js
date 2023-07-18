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
  makeSelectVariantsStates,
} from 'global/reducers/textMessages';
import Loader from 'components/Loader';

import Variants from './Variants';
import messages from './messages';
import { TextMessagesContext } from '../../utils';

const TextMessageVariants = ({
  createVariant,
  variants,
  variantsStates,
  selectedVariantId,
  textMessageId,
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
        textMessageId={textMessageId}
        disabled={!editingPossible}
        variants={variants}
        variantsStates={variantsStates}
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
  variantsStates: PropTypes.instanceOf(Map),
  reorderTextMessageVariants: PropTypes.func,
  textMessageId: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  variants: makeSelectVariants(),
  selectedVariantId: makeSelectSelectedVariantId(),
  variantsStates: makeSelectVariantsStates(),
});

const mapDispatchToProps = {
  createVariant: createVariantRequest,
  reorderTextMessageVariants: reorderTextMessageVariantsRequest,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(TextMessageVariants);
