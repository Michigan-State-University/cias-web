/**
 *
 * Logout
 *
 */

import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { logOut } from 'global/reducers/auth';

export function Logout({ logOut: logOutUser }) {
  useEffect(() => {
    logOutUser();
  }, []);

  return null;
}

Logout.propTypes = {
  logOut: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  logOut,
};

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect)(Logout);
