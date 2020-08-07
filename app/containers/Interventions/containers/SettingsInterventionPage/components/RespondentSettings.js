import React from 'react';
import PropTypes from 'prop-types';

import GetLink from './GetLink';

const RespondentSettings = ({ formatMessage, slug, problemId }) => (
  <GetLink
    formatMessage={formatMessage}
    disabled={false}
    slug={slug}
    problemId={problemId}
  />
);

RespondentSettings.propTypes = {
  formatMessage: PropTypes.func,
  slug: PropTypes.string,
  problemId: PropTypes.string,
};

export default RespondentSettings;
