import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectToken } from '../../global/reducers/auth';

class AppRoute extends Route {
  render() {
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
  token: makeSelectToken(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(AppRoute);
