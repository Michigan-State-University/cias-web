import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import { FormattedMessage } from 'react-intl';
import { borders, colors } from 'theme';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ErrorAlert from 'components/ErrorAlert';
import H3 from 'components/H3';
import Loader from 'components/Loader';
import Row from 'components/Row';
import Text from 'components/Text';
import TextButton from 'components/Button/TextButton';
import { useInjectSaga } from 'utils/injectSaga';

import messages from '../messages';
import { cancelInvitationRequest, getInvitationsRequest } from '../actions';
import { cancelInvitationSaga, getInvitationsSaga } from '../sagas';
import {
  makeSelectCancelState,
  makeSelectInvitationsState,
} from '../selectors';

const InvitationList = ({
  invitationsState: { list, loading, error },
  cancelState: { invitationCanceling },
  getInvitations,
  cancelInvitation,
}) => {
  useInjectSaga({ key: 'cancelInvitation', saga: cancelInvitationSaga });
  useInjectSaga({ key: 'getInvitations', saga: getInvitationsSaga });

  useEffect(() => {
    getInvitations();
  }, []);

  if (loading) return <Loader type="inline" />;
  return (
    <Fragment>
      <H3 mb={20}>
        <FormattedMessage
          {...messages.invitationsSection}
          values={{ length: list ? list.length : 0 }}
        />
      </H3>
      {map(list, ({ id, email }) => (
        <Row
          height={46}
          key={`el-user-list-${id}`}
          align="center"
          justify="between"
          py={12}
          borderBottom={`${borders.borderWidth} ${borders.borderStyle} ${
            colors.mystic
          }`}
        >
          <Text fontSize={14}>{email}</Text>
          <TextButton
            onClick={() => cancelInvitation(id)}
            loading={invitationCanceling === id}
            buttonProps={{ color: colors.flamingo, fontWeight: 'bold' }}
            spinnerProps={{ size: 18, width: 2 }}
          >
            <FormattedMessage {...messages.cancel} />
          </TextButton>
        </Row>
      ))}
      {error && <ErrorAlert errorText={error} mt={25} />}
    </Fragment>
  );
};

InvitationList.propTypes = {
  cancelInvitation: PropTypes.func,
  getInvitations: PropTypes.func,
  invitationsState: PropTypes.shape({
    list: PropTypes.array,
    loading: PropTypes.bool,
    error: PropTypes.string,
  }),
  cancelState: PropTypes.shape({
    invitationCanceling: PropTypes.string,
  }),
};

const mapStateToProps = createStructuredSelector({
  invitationsState: makeSelectInvitationsState(),
  cancelState: makeSelectCancelState(),
});

const mapDispatchToProps = {
  getInvitations: getInvitationsRequest,
  cancelInvitation: cancelInvitationRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(withConnect)(InvitationList);
