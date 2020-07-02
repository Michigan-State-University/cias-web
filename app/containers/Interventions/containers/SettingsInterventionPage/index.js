import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import { Helmet } from 'react-helmet';

const SettingsInterventionPage = ({}) => {
  return (
    <div>
      <Helmet>
        <title>{'Settings'}</title>
      </Helmet>
    </div>
  );
};

SettingsInterventionPage.propTypes = {};

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = {};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default SettingsInterventionPage;
