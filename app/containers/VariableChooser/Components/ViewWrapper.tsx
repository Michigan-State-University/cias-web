import React, { memo } from 'react';
import { useSelector } from 'react-redux';

import arrowLeft from 'assets/svg/arrow-left.svg';

import { makeSelectCopyModalLoaders } from 'global/reducers/copyModalReducer';

import Column from 'components/Column';
import Img from 'components/Img';
import Loader from 'components/Loader';

interface Props {
  goBack?: () => void;
  children: JSX.Element | JSX.Element[];
}

const ViewWrapper = ({ children, goBack }: Props) => {
  const { interventions, sessions, questionGroups } = useSelector(
    makeSelectCopyModalLoaders(),
  );

  const isLoading = interventions && sessions && questionGroups;

  const render = () => {
    // @ts-ignore
    if (isLoading) return <Loader type="inline" />;

    return children;
  };

  return (
    <Column minWidth="200px" height={200} overflow="scroll">
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
