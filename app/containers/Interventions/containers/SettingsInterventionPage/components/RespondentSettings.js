import React from 'react';
import PropTypes from 'prop-types';

import GetLink from './GetLink';

const RespondentSettings = ({ formatMessage, slug }) => (
  <GetLink formatMessage={formatMessage} disabled={false} slug={slug} />
);

RespondentSettings.propTypes = {
  formatMessage: PropTypes.func,
  slug: PropTypes.string,
};

export default RespondentSettings;
