import { useLocation } from 'react-router-dom';

import NotFoundPage from 'containers/NotFoundPage';
import Player from 'components/Player';
import Loader from 'components/Loader';
import { useLayoutEffect } from 'react';

interface LinkDataType {
  link_type: string;
  redirect_url: string;
}

const UserSmsLinkPage = () => {
  const location = useLocation();
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { link_type, redirect_url } = location.state as LinkDataType;

  useLayoutEffect(() => {
    if (link_type === 'website') window.location.replace(redirect_url);
  }, [link_type, redirect_url]);

  switch (link_type) {
    case 'website':
      return <Loader />;
    case 'video':
      return <Player videoUrl={redirect_url} disabled={false} />;
    default:
      return <NotFoundPage />;
  }
};

export default UserSmsLinkPage;
