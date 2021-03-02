import React from 'react';
import PropTypes from 'prop-types';
import VariantItem from './VariantItem';

const Variants = ({ variants, disabled, selectedVariantId }) => (
  <>
    {variants &&
      variants.map((variant, index) => (
        <VariantItem
          disabled={disabled}
          key={`variant-${variant.id}`}
          index={index + 1}
          variant={variant}
          open={selectedVariantId === variant.id}
        />
      ))}
  </>
);

Variants.propTypes = {
  variants: PropTypes.array,
  disabled: PropTypes.bool,
  selectedVariantId: PropTypes.string,
};
export default Variants;
