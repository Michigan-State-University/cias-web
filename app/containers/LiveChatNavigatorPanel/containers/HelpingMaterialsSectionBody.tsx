import { useIntl } from 'react-intl';
import React from 'react';

import { AppFile } from 'models/File';
import { LinkFor, NavigatorLink } from 'models/NavigatorSetup';
import { themeColors } from 'theme';

import Text from 'components/Text';
import FileBox from 'components/FileBox';
import { PrimaryLink } from 'components/Links';
import Column from 'components/Column';

import { SectionBody } from '../components/styled';
import messages from '../messages';

const HelpingMaterialsSectionBody = () => {
  const { formatMessage } = useIntl();
  const links: NavigatorLink[] = [
    {
      displayName: 'test',
      id: '1',
      linkFor: LinkFor.NAVIGATORS,
      url: 'https://www.google.com/search?hl=en&q=scribble',
    },
  ];

  const files: AppFile[] = [
    {
      id: 'be52b679-aae3-4c51-b24a-70c4ee2fc632',
      name: 'image (39).png',
      url: 'https://localhost:3000/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWt3TXpabU5XWmlaUzFtWWpjMExUUXlNV0l0T0RreU9DMWhaVGt4TmpnMU1EWmxZemNHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--fa8b5e78859b5d53218821e6c179021e51b3484d/image%20(39).png',
    },
    {
      id: '8426e9c8-52f3-4b3d-94e5-1c7b74fd1869',
      name: 'Image from iOS (12).jpg',
      url: 'https://localhost:3000/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWt5WkRnM1lUVmtNaTAwTVdNekxUUmtabU10T0daaU5DMHpZemcwWmpZNFpEQmlNVElHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--c7166369b76a67e10491bb8f881b39cd37e061ef/Image%20from%20iOS%20(12).jpg',
    },
    {
      id: '158d5ff7-5cf6-4b1d-9877-e6d2dac8a92b',
      name: 'image (38).png',
      url: 'https://localhost:3000/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWs0T1RreFlXRTRPUzFsTkRSaUxUUmhOemt0WVRrNE1DMWpNREF4T0RrNE1tWm1NMkVHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--b1a6bd685c43e9bac7851635579cdf6be8799c6d/image%20(38).png',
    },
  ];

  return (
    <SectionBody
      borderLeft={`1px solid ${themeColors.highlight}`}
      pl={16}
      py={24}
      textAlign="left"
      overflow="scroll"
    >
      <Text mb={8} fontWeight="bold">
        {formatMessage(messages.usefulLinks)}
      </Text>
      <Column gap={4}>
        {links.map(({ displayName, url, id }) => (
          <PrimaryLink key={id} href={url} target="_blank">
            {displayName}
          </PrimaryLink>
        ))}
      </Column>
      <Text mt={32} mb={8} fontWeight="bold">
        {formatMessage(messages.filesToDownload)}
      </Text>
      <Column gap={8}>
        {files.map(({ id, name, url }) => (
          <FileBox
            name={name}
            url={url}
            key={id}
            maxHeight={44}
            minHeight={44}
          />
        ))}
      </Column>
    </SectionBody>
  );
};

export default HelpingMaterialsSectionBody;
