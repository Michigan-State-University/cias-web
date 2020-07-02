import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import Navbar from 'containers/Navbar';
import { makeSelectIsLoggedIn } from '../../global/reducers/auth';

class AppRoute extends Route {
  render() {
    const { protectedRoute, isLoggedIn, path } = this.props;
    if (protectedRoute && !isLoggedIn) {
      return <Redirect to="/login" />;
    }
    if (isLoggedIn) {
      return (
        <>
          <Navbar path={path} />
          <div style={{ marginTop: 70 }}>{super.render()}</div>
        </>
      );
    }
    return super.render();
  }
}

AppRoute.propTypes = {
  protectedRoute: PropTypes.bool,
  logOut: PropTypes.func,
};

AppRoute.defaultProps = {
  protectedRoute: false,
};

const mapStateToProps = createStructuredSelector({
  isLoggedIn: makeSelectIsLoggedIn(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(AppRoute);
