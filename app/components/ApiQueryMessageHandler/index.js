import { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import { toast } from 'react-toastify';

const ApiQueryMessageHandler = () => {
  const location = useLocation();
  const history = useHistory();

  const queryParams = new URLSearchParams(location.search);

  const error = queryParams.get('error');
  const success = queryParams.get('success');

  useEffect(() => {
    try {
      if (error) toast.error(atob(decodeURIComponent(error)));

      if (success) toast.success(atob(decodeURIComponent(success)));
      // eslint-disable-next-line no-empty
    } catch {
    } finally {
      let hasQueryToRemove = false;

      if (queryParams.has('error')) {
        queryParams.delete('error');
        hasQueryToRemove = true;
      }

      if (queryParams.has('success')) {
        queryParams.delete('success');
        hasQueryToRemove = true;
      }

      if (hasQueryToRemove)
        history.replace({
          search: queryParams.toString(),
        });
    }
  }, [success, error]);

  return null;
};

ApiQueryMessageHandler.propTypes = {};

export default ApiQueryMessageHandler;
