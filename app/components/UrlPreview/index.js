/**
 *
 * UrlPreview
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { getLinkPreview } from 'link-preview-js';

import Box from 'components/Box';
import Row from 'components/Row';
import Text from 'components/Text';
import Loader from 'components/Loader';
import { colors, themeColors } from 'theme';
import { useAsync } from 'utils/useAsync';
import { ClampedText, Thumbnail, Url, ClampedTitle } from './styled';

export const proxy = 'https://cors-anywhere.herokuapp.com/';

const UrlPreview = ({ link, handleClick }) => {
  const [linkData, setLinkData] = useState(null);

  const fetchData = async () =>
    getLinkPreview(`${proxy}${link}`, {
      imagesPropertyType: 'og',
    });

  useAsync(fetchData, data => setLinkData(data), { deps: [link] });

  const redirectToLink = () => {
    if (handleClick) handleClick();
    window.open(link, '_blank');
  };

  return (
    <Box my={5} width="100%">
      {linkData && (
        <Box bg={colors.white}>
          <Row>
            <Box
              bgc="transparent"
              padding={20}
              width={linkData.images[0] ? '70%' : '100%'}
            >
              <Url href={link} target="_blank" onClick={handleClick}>
                <ClampedTitle>{linkData.title}</ClampedTitle>
              </Url>
              <Url href={link} target="_blank" onClick={handleClick}>
                <ClampedText mt={8} mb={13} fontSize={11}>
                  {linkData.description}
                </ClampedText>
              </Url>
              <Url href={link} target="_blank" onClick={handleClick}>
                <Text
                  textOverflow="hidden"
                  whiteSpace="pre"
                  overflow="hidden"
                  my={3}
                  fontSize={9}
                  color={themeColors.secondary}
                >
                  {linkData.url && linkData.url.replace(proxy, '')}
                </Text>
              </Url>
            </Box>
            {linkData.images[0] && (
              <Thumbnail image={linkData.images[0]} onClick={redirectToLink} />
            )}
          </Row>
        </Box>
      )}
      {!linkData && (
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
