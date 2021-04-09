import React from 'react';
import Row from 'components/Row';
import Box from 'components/Box';
import PropTypes from 'prop-types';

const QuestionPreview = ({ dangerouslySetInnerHTML, mt, padding, width }) => (
  <Row mt={mt}>
    <Box
      lineHeight="1.42"
      padding={padding}
      width={width}
      dangerouslySetInnerHTML={dangerouslySetInnerHTML}
    />
  </Row>
);

QuestionPreview.propTypes = {
  dangerouslySetInnerHTML: PropTypes.any,
  mt: PropTypes.number,
  padding: PropTypes.number,
  width: PropTypes.string,
};

QuestionPreview.defaultProps = {
  mt: 0,
  padding: 0,
  width: '100%',
};

export default QuestionPreview;
