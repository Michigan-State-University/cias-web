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
} from 'global/reducers/textMessages';
import Loader from 'components/Loader';

import Variants from './Variants';
import messages from './messages';
import { TextMessagesContext } from '../../utils';

const TextMessageVariants = ({
  createVariant,
  variants,
  selectedVariantId,
}) => {
  const {
    formatMessage,
    loaders: { createVariantLoading, fetchVariantsLoading },
    editingPossible,
  } = useContext(TextMessagesContext);

  if (fetchVariantsLoading) return <Loader type="inline" />;
  return (
    <>
      <Variants
        selectedVariantId={selectedVariantId}
        disabled={!editingPossible}
        variants={variants}
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
};

const mapStateToProps = createStructuredSelector({
  variants: makeSelectVariants(),
  selectedVariantId: makeSelectSelectedVariantId(),
});

const mapDispatchToProps = {
  createVariant: createVariantRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(TextMessageVariants);
