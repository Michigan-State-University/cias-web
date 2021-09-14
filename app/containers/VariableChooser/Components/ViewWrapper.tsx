import React, { memo } from 'react';
import { useSelector } from 'react-redux';

import arrowLeft from 'assets/svg/arrow-left.svg';

import { makeSelectCopyModalLoader } from 'global/reducers/copyModalReducer';

import Column from 'components/Column';
import Img from 'components/Img';
import Loader from 'components/Loader';

interface Props {
  goBack?: () => void;
  children: JSX.Element | JSX.Element[];
}

const ViewWrapper = ({ children, goBack }: Props) => {
  const isLoading = useSelector(makeSelectCopyModalLoader());

  const render = () => {
    // @ts-ignore
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

export default memo(ViewWrapper);
