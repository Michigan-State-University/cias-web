/**
 *
 * UrlPreview
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { colors, themeColors } from 'theme';

import { useUrlMetadata } from 'utils/useUrlMetadata';

import Box from 'components/Box';
import Row from 'components/Row';
import Text from 'components/Text';
import Loader from 'components/Loader';

import { ClampedText, Thumbnail, Url, ClampedTitle } from './styled';

const UrlPreview = ({ link, handleClick }) => {
  const { metadata, isFetching } = useUrlMetadata(link);

  const redirectToLink = () => {
    if (handleClick) handleClick();
    window.open(metadata.url, '_blank');
  };

  const image = metadata?.image || metadata?.images?.[0];

  return (
    <Box my={5} width="100%">
      {metadata && (
        <Box bg={colors.white}>
          <Row>
            <Box bgc="transparent" padding={20} width={image ? '70%' : '100%'}>
              {metadata.title && (
                <Url href={metadata.url} target="_blank" onClick={handleClick}>
                  <ClampedTitle>{metadata.title}</ClampedTitle>
                </Url>
              )}
              {metadata?.description && (
                <Url href={metadata.url} target="_blank" onClick={handleClick}>
                  <ClampedText mt={8} mb={13} fontSize={11}>
                    {metadata?.description}
                  </ClampedText>
                </Url>
              )}
              {metadata.url && (
                <Url href={metadata.url} target="_blank" onClick={handleClick}>
                  <Text
                    wordBreak="break-all"
                    my={3}
                    fontSize={9}
                    color={themeColors.secondary}
                  >
                    {metadata.url}
                  </Text>
                </Url>
              )}
            </Box>
            {image && <Thumbnail image={image} onClick={redirectToLink} />}
          </Row>
        </Box>
      )}
      {isFetching && (
        <Row>
          <Loader type="inline" />
        </Row>
      )}
    </Box>
  );
};

UrlPreview.propTypes = {
  link: PropTypes.string,
  handleClick: PropTypes.func,
};

export default memo(UrlPreview);
