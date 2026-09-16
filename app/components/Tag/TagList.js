import React from 'react';
import PropTypes from 'prop-types';
import Row from 'components/Row';
import Tag from './Tag';

const TagList = ({ tags, onRemoveTag, disabled, ...props }) => {
  if (!tags || tags.length === 0) return null;

  return (
    <Row gap={8} flexWrap="wrap" align="center" {...props}>
      {tags.map((tag) => {
        const handleRemove = () => {
          if (onRemoveTag) {
            onRemoveTag(tag.id);
          }
        };

        return (
          <Tag key={tag.id} onRemove={handleRemove} disabled={disabled}>
            {tag.name}
          </Tag>
        );
      })}
    </Row>
  );
};

TagList.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ),
  onRemoveTag: PropTypes.func,
  disabled: PropTypes.bool,
};

export default TagList;
