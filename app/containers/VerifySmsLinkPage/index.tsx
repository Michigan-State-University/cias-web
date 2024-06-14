import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectSaga } from 'redux-injectors';

import { RoutePath } from 'global/constants';
import { withVerifySmsLinkSaga } from 'global/reducers/auth/sagas';
import { makeSelectErrors, verifySmsLinkRequest } from 'global/reducers/auth';

import Loader from 'components/Loader';
import NotFoundPage from 'containers/NotFoundPage';
import { VerifySmsLinkError } from './types';

const VerifySmsLinkPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  useInjectSaga(withVerifySmsLinkSaga);

  const { slug } = useParams<{ slug: string }>();

  const verifyError: Nullable<VerifySmsLinkError> = useSelector(
    makeSelectErrors('verifySmsLinkError'),
  );

  useEffect(() => {
    if (slug) {
      dispatch(verifySmsLinkRequest(slug));
    } else {
      history.replace(RoutePath.NOT_FOUND);
    }
  }, [slug]);

  if (verifyError) return <NotFoundPage />;
  return <Loader />;
};

export default VerifySmsLinkPage;
