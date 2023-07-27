import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';

import { LinkData } from 'models/NavigatorSetup';

import {
  makeSelectNavigatorLinks,
  addNavigatorLinkRequest,
  removeNavigatorLinkRequest,
  updateNavigatorLinkRequest,
  makeSelectNavigatorSetupLoader,
} from 'global/reducers/navigatorSetup';

import LinksPanel from '../Components/LinksPanel';
import messages from '../messages';

export type Props = {
  interventionId: string;
  disabled: boolean;
};

const NavigatorLinksPanel = ({ interventionId, disabled }: Props) => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();

  const navigatorLinks = useSelector(makeSelectNavigatorLinks());
  const addingNavigatorLink = useSelector(
    makeSelectNavigatorSetupLoader('addingNavigatorLink'),
  );

  const addNewNavigatorLink = () =>
    dispatch(
      addNavigatorLinkRequest(interventionId, {
        displayName: '',
        url: '',
      }),
    );

  const updateNavigatorLink = (linkId: string, data: LinkData) =>
    dispatch(updateNavigatorLinkRequest(interventionId, linkId, data));

  const removeNavigatorLink = (linkId: string) =>
    dispatch(removeNavigatorLinkRequest(interventionId, linkId));

  return (
    <LinksPanel
      title={formatMessage(messages.navigatorLinks)}
      noLinksMessage={formatMessage(messages.noLinksForNavigator)}
      links={navigatorLinks ?? []}
      addingLink={addingNavigatorLink}
      addLink={addNewNavigatorLink}
      updateLink={updateNavigatorLink}
      removeLink={removeNavigatorLink}
      disabled={disabled}
    />
  );
};

export default NavigatorLinksPanel;
