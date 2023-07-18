import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';

import { LinkData } from 'models/NavigatorSetup';

import {
  makeSelectParticipantLinks,
  addParticipantLinkRequest,
  removeParticipantLinkRequest,
  updateParticipantLinkRequest,
  makeSelectNavigatorSetupLoader,
} from 'global/reducers/navigatorSetup';

import LinksPanel from '../Components/LinksPanel';
import messages from '../messages';

export type Props = {
  interventionId: string;
  disabled: boolean;
};

const ParticipantLinksPanel = ({ interventionId, disabled }: Props) => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();

  const participantLinks = useSelector(makeSelectParticipantLinks());
  const addingParticipantLink = useSelector(
    makeSelectNavigatorSetupLoader('addingParticipantLink'),
  );

  const addNewParticipantLink = () =>
    dispatch(
      addParticipantLinkRequest(interventionId, {
        displayName: '',
        url: '',
      }),
    );

  const updateParticipantLink = (linkId: string, data: LinkData) =>
    dispatch(updateParticipantLinkRequest(interventionId, linkId, data));

  const removeParticipantLink = (linkId: string) =>
    dispatch(removeParticipantLinkRequest(interventionId, linkId));

  return (
    <LinksPanel
      title={formatMessage(messages.participantLinks)}
      noLinksMessage={formatMessage(messages.noLinksForParticipant)}
      links={participantLinks ?? []}
      addingLink={addingParticipantLink}
      addLink={addNewParticipantLink}
      updateLink={updateParticipantLink}
      removeLink={removeParticipantLink}
      disabled={disabled}
    />
  );
};

export default ParticipantLinksPanel;
