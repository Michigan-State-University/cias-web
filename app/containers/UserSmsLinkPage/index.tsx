import { useLocation } from 'react-router-dom';

import NotFoundPage from 'containers/NotFoundPage';
import Player from 'components/Player';

interface LinkDataType {
  link_type: string;
  redirect_url: string;
}

const UserSmsLinkPage = () => {
  const location = useLocation();
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { link_type, redirect_url } = location.state as LinkDataType;

  switch (link_type) {
    case 'website':
      window.location.replace(redirect_url);
      break;
    case 'video':
      return <Player videoUrl={redirect_url} disabled={false} />;
    default:
      return <NotFoundPage />;
  }
};

export default UserSmsLinkPage;
