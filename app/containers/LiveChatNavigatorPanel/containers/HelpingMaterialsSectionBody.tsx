import { useIntl } from 'react-intl';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { themeColors } from 'theme';
import {
  fetchNavigatorHelpingMaterialsRequest,
  makeSelectOpenedConversationNavigatorHelpingMaterialsState,
  makeSelectOpenedConversationInterventionId,
} from 'global/reducers/liveChat';

import Text from 'components/Text';
import FileBox from 'components/FileBox';
import { PrimaryLink } from 'components/Links';
import Column from 'components/Column';
import Loader from 'components/Loader';
import ErrorAlert from 'components/ErrorAlert';

import { SectionBody } from '../components/styled';
import messages from '../messages';

const HelpingMaterialsSectionBody = () => {
  const { formatMessage } = useIntl();
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
      py={24}
      textAlign="left"
      overflow="scroll"
    >
      {loading && <Loader type="inline" />}
      {error && <ErrorAlert errorText={error.message} />}
      {!loading && !error && data && (
        <>
          <Text mb={8} fontWeight="bold">
            {formatMessage(messages.usefulLinks)}
          </Text>
          <Column gap={4}>
            {data.navigatorLinks.map(({ displayName, url, id }) => (
              <PrimaryLink key={id} href={url} target="_blank">
                {displayName}
              </PrimaryLink>
            ))}
          </Column>
          <Text mt={32} mb={8} fontWeight="bold">
            {formatMessage(messages.filesToDownload)}
          </Text>
          <Column gap={8}>
            {data.navigatorFiles.map(({ id, name, url }) => (
              <FileBox
                name={name}
                url={url}
                key={id}
                maxHeight={44}
                minHeight={44}
              />
            ))}
          </Column>
        </>
      )}
    </SectionBody>
  );
};

export default HelpingMaterialsSectionBody;
