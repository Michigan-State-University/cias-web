import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import { themeColors } from 'theme';
import {
  fetchNavigatorHelpingMaterialsRequest,
  makeSelectOpenedConversationNavigatorHelpingMaterialsState,
  makeSelectOpenedConversationInterventionId,
} from 'global/reducers/liveChat';

import Column from 'components/Column';
import Loader from 'components/Loader';
import ErrorAlert from 'components/ErrorAlert';

import { SectionBody } from '../components/styled';
import NavigatorScriptsList from '../components/NavigatorScriptsList';
import NavigatorLinksList from '../components/NavigatorLinksList';
import NavigatorFilesList from '../components/NavigatorFilesList';

export type Props = {
  isArchive: boolean;
};

const HelpingMaterialsSectionBody = ({ isArchive }: Props) => {
  const dispatch = useDispatch();

  const interventionId = useSelector(
    makeSelectOpenedConversationInterventionId(),
  );

  const state = useSelector(
    makeSelectOpenedConversationNavigatorHelpingMaterialsState(),
  );

  useEffect(() => {
    if (interventionId && (!state || state.error)) {
      dispatch(fetchNavigatorHelpingMaterialsRequest(interventionId));
    }
  }, [interventionId]);

  const { error, data, loading } = state ?? {};

  return (
    <SectionBody
      borderLeft={`1px solid ${themeColors.highlight}`}
      pl={16}
      pt={24}
      pb={16}
      mr={-16}
      textAlign="left"
    >
      {loading && <Loader type="inline" />}
      {error && <ErrorAlert errorText={error.message} />}
      {!loading && !error && data && (
        <Column gap={32} maxHeight="100%" overflow="auto" pr={16}>
          {data.filledScriptTemplate && (
            <NavigatorScriptsList
              scriptsFile={data.filledScriptTemplate}
              disabled={isArchive}
            />
          )}
          {!isEmpty(data.navigatorLinks) && (
            <NavigatorLinksList navigatorLinks={data.navigatorLinks} />
          )}
          {!isEmpty(data.navigatorFiles) && (
            <NavigatorFilesList navigatorFiles={data.navigatorFiles} />
          )}
        </Column>
      )}
    </SectionBody>
  );
};

export default HelpingMaterialsSectionBody;
