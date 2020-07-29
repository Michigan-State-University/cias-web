import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useInjectSaga } from 'utils/injectSaga';

import Row from 'components/Row';
import Tabs from 'components/Tabs';
import { StyledInput } from 'components/Input/StyledInput';

import {
  editInterventionRequest,
  makeSelectIntervention,
  editInterventionSaga,
} from 'global/reducers/intervention';

import messages from './messages';

const getActiveTab = (path, formatMessage) => {
  if (path.includes('/edit')) return formatMessage(messages.content);
  if (path.includes('/settings')) return formatMessage(messages.settings);
  return formatMessage(messages.sharing);
};

const InterventionNavbar = ({
  intervention: { name, id },
  updateInterventionName,
  intl: { formatMessage },
  path,
}) => {
  useInjectSaga({ key: 'editIntervention', saga: editInterventionSaga });

  const [tabActive, setTabActive] = useState(getActiveTab(path, formatMessage));
  useEffect(() => {
    setTabActive(getActiveTab(path, formatMessage));
  }, [path]);
  return (
    <Row align="center" justify="between" width="100%">
      <Row align="center">
        <StyledInput
          px={12}
          py={6}
          width="400px"
          value={name}
          fontSize={23}
          placeholder={formatMessage(messages.placeholder)}
          onBlur={val => updateInterventionName({ path: 'name', value: val })}
          maxWidth="none"
        />
      </Row>

      <Tabs
        display="flex"
        align="center"
        controlledTabActive={tabActive}
        controlledSetTabActive={setTabActive}
        controlled
      >
        <div
          renderAsLink={
            <Link to={`/interventions/${id}/edit`}>
              {formatMessage(messages.content)}
            </Link>
          }
        />
        <div
          renderAsLink={
            <Link to={`/interventions/${id}/settings`}>
              {formatMessage(messages.settings)}
            </Link>
          }
        />
        <div
          renderAsLink={<Link to="/">{formatMessage(messages.sharing)}</Link>}
        />
      </Tabs>
      <div />
    </Row>
  );
};

InterventionNavbar.propTypes = {
  intervention: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
  }),
  updateInterventionName: PropTypes.func,
  intl: intlShape,
  path: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  intervention: makeSelectIntervention(),
});

const mapDispatchToProps = {
  updateInterventionName: editInterventionRequest,
};

export const InterventionNavbarWithIntl = injectIntl(InterventionNavbar);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InterventionNavbarWithIntl);
