/**
 *
 * CreateInterventionPage
 *
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import { Helmet } from 'react-helmet';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Column from 'components/Column';
import Row from 'components/Row';
import Box from 'components/Box';
import Img from 'components/Img';
import cross from 'assets/svg/cross.svg';
import H1 from 'components/H1';
import Intervention from 'models/Intervention/Intervention';
import { makeSelectIntervention } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import ScreenListItem from '../../components/ScreenListItem';

function CreateInterventionPage({ intl: { formatMessage }, intervention }) {
  useInjectReducer({ key: 'createInterventionPage', reducer });
  useInjectSaga({ key: 'createInterventionPage', saga });

  return (
    <Fragment>
      <Helmet>
        <title>{formatMessage(messages.pageTitle)}</title>
      </Helmet>
      <Row>
        <Column sm={5}>
          <Box padded>
            <Row mb={77}>
              <Img src={cross} mr={37} />
              <H1>{formatMessage(messages.pageTitle)}</H1>
            </Row>

            <Row>
              <Box width="100%" padded>
                {intervention.screens.map(screen => (
                  <ScreenListItem
                    type={screen.type}
                    question={screen.question}
                  />
                ))}
              </Box>
            </Row>
          </Box>
        </Column>
        <Column sm={7}>col2</Column>
      </Row>
    </Fragment>
  );
}

CreateInterventionPage.propTypes = {
  intl: PropTypes.object,
  intervention: PropTypes.shape(Intervention),
};

const mapStateToProps = createStructuredSelector({
  intervention: makeSelectIntervention(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default injectIntl(compose(withConnect)(CreateInterventionPage));
