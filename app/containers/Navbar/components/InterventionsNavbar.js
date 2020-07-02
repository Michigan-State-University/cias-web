import React, { Fragment } from 'react';
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

const InterventionNavbar = ({
  intervention: { name, id },
  updateInterventionName,
  intl: { formatMessage },
}) => {
  return (
    <Row align="center" justify="between" width="100%" border="1px solid red">
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
          onBlur={val => updateInterventionName({ field: 'name', value: val })}
        />
      </Row>

      <Tabs display="flex" align="center">
        <div
          label={
            <Link to={`/interventions/${id}/edit`}>
              {formatMessage(messages.content)}
            </Link>
          }
        />
        <div
          to={`/interventions/${id}/settings`}
          label={formatMessage(messages.settings)}
        />
        <div to="/" label={formatMessage(messages.sharing)} />
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
