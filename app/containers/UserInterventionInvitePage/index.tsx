import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useInjectSaga } from 'redux-injectors';
import { useLocation, useParams } from 'react-router';

import { themeColors } from 'theme';

import {
  allUserInterventionSagas,
  acceptInterventionInvite,
} from 'global/reducers/userIntervention';

import Spinner from 'components/Spinner';
import Box from 'components/Box';

interface Params {
  interventionId: string;
}

const UserInterventionInvitePage = () => {
  const { interventionId } = useParams<Params>();
  const { search } = useLocation();
  const dispatch = useDispatch();
  useInjectSaga({ key: 'userIntervention', saga: allUserInterventionSagas });

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(search);
    const clinicId = urlSearchParams.get('cid');
    dispatch(acceptInterventionInvite(interventionId, clinicId));
  }, []);

  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      justify="center"
      align="center"
    >
      <Spinner size={100} color={themeColors.secondary} />
    </Box>
  );
};

export default UserInterventionInvitePage;
