import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectIsLoggedIn } from '../../global/reducers/auth';

class AppRoute extends Route {
  render() {
    if (this.props.protected && !this.props.isLoggedIn) {
      return <Redirect to="/login" />;
    }

    return super.render();
  }
}

AppRoute.propTypes = {
  protected: PropTypes.bool,
};

AppRoute.defaultProps = {
  protected: false,
};

const mapStateToProps = createStructuredSelector({
  isLoggedIn: makeSelectIsLoggedIn(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(AppRoute);
