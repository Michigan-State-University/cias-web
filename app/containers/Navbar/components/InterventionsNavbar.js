import React, { Fragment, useState, useEffect } from 'react';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Row from 'components/Row';
import Img from 'components/Img';
import Tabs from 'components/Tabs';
import { StyledInput } from 'components/Input/StyledInput';
import cross from 'assets/svg/cross.svg';
import { makeSelectIntervention } from 'containers/Interventions/containers/EditInterventionPage/selectors';
import { editInterventionRequest } from 'containers/Interventions/containers/EditInterventionPage/actions';

import { CrossContainer } from './styled';
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
  const [tabActive, setTabActive] = useState(getActiveTab(path, formatMessage));
  useEffect(() => {
    setTabActive(getActiveTab(path, formatMessage));
  }, [path]);
  return (
    <Row align="center" justify="between" width="100%">
      <Row align="center">
        <CrossContainer onClick={() => {}}>
          <Img src={cross} alt="cross" />
        </CrossContainer>
        <StyledInput
          px={12}
          py={6}
          width="auto"
          value={name}
          fontSize={23}
          autoSize
          maxWidth={800}
          averageLetterWidth={13}
          placeholder={formatMessage(messages.placeholder)}
          onBlur={val => updateInterventionName({ path: 'name', value: val })}
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
          renderAsLink={<Link to={`/`}>{formatMessage(messages.sharing)}</Link>}
        />
      </Tabs>
      <div />
    </Row>
  );
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
