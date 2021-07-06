import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { useSelector } from 'react-redux';

import arrowLeft from 'assets/svg/arrow-left.svg';

import { makeSelectCopyModalLoader } from 'global/reducers/copyModalReducer';

import Column from 'components/Column';
import Img from 'components/Img';
import Loader from 'components/Loader';

const ViewWrapper = ({ children, goBack }) => {
  const isLoading = useSelector(makeSelectCopyModalLoader());

  const render = () => {
    if (isLoading) return <Loader type="inline" />;

    return children;
  };

  return (
    <Column minWidth="200px">
      {goBack && (
        <Img
          width="min-content"
          src={arrowLeft}
          mb={10}
          onClick={goBack}
          clickable
        />
      )}
      {render()}
    </Column>
  );
};

ViewWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  goBack: PropTypes.func,
};

export default memo(ViewWrapper);
