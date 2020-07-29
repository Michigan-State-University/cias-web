import React from 'react';
import PropTypes from 'prop-types';

import Row from 'components/Row';
import Text from 'components/Text';
import CloseIcon from 'components/CloseIcon';

const PreviewNavbar = ({ navbarName }) => {
  const handleClose = () => {
    window.opener = null;
    window.open('', '_self');
    window.close();
  };

  return (
    <Row align="center" justify="start" width="100%">
      <CloseIcon onClick={handleClose} />
      <Text color="black" fontSize={23}>
        {navbarName}
      </Text>
    </Row>
  );
};

PreviewNavbar.propTypes = {
  navbarName: PropTypes.string,
};

export default PreviewNavbar;
