/**
 *
 * UrlPreview
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getLinkPreview } from 'link-preview-js';

import { ClampedText, Thumbnail, Url } from 'components/UrlPreview/styled';
import Box from 'components/Box';
import Row from 'components/Row';
import Text from 'components/Text';
import Loader from 'components/Loader';
import { ClampedTitle } from 'containers/Interventions/components/QuestionListItem/styled';
import { colors, themeColors } from 'theme';

const UrlPreview = ({ link, handleClick }) => {
  const [linkData, setLinkData] = useState(null);

  const proxy = 'https://cors-anywhere.herokuapp.com/';

  useEffect(() => {
    setLinkData(null);
    const fetchData = async () => {
      const data = await getLinkPreview(`${proxy}${link}`, {
        imagesPropertyType: 'og',
      });
      setLinkData(data);
    };
    fetchData();
  }, [link]);

  const redirectToLink = () => {
    if (handleClick) handleClick();
    window.open(link, '_blank');
  };

  return (
    <Box my={5}>
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
