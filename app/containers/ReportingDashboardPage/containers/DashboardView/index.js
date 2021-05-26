import React, { useEffect, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useParams } from 'react-router';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';

import { Container, Col, Row } from 'components/ReactGridSystem';

import { ReportingDashboardPageContext } from 'containers/ReportingDashboardPage/constants';
import {
  fetchDashboardViewSelectOptionsRequest,
  makeSelectDashboardViewOptions,
  organizationsReducer,
} from 'global/reducers/organizations';
import { fetchDashboardViewSelectOptionsSaga } from 'global/reducers/organizations/sagas';
import { injectReducer, injectSaga } from 'redux-injectors';
import { Roles } from 'models/User/UserRoles';
import Select from 'components/Select';
import { arraysOverlap } from 'utils/arrayUtils';
import messages from '../../messages';

const DashboardView = ({ fetchSelectOptions, selectOptions }) => {
  const [selectedValue, setSelectedValue] = useState(null);
  const { organizationId } = useParams();
  const { formatMessage } = useIntl();
  const {
    organizableId,
    user: { roles },
  } = useContext(ReportingDashboardPageContext);

  const isHealthClinicAdmin = roles[0] === Roles.clinicAdmin;
  const isHealthSystemAdmin = roles[0] === Roles.healthSystemAdmin;
  const hasFullOrgAccess = arraysOverlap(roles, [
    Roles.admin,
    Roles.organizationAdmin,
    Roles.eInterventionAdmin,
  ]);

  useEffect(() => {
    fetchSelectOptions(organizableId || organizationId);
  }, []);

  const mapHealthClinic = ({ id, name }) => ({
    label: name,
    value: id,
  });

  const mappedSelectOptions = useMemo(() => {
    if (!selectOptions) return null;
    if (isHealthClinicAdmin) {
      return selectOptions.map(mapHealthClinic);
    }
    if (isHealthSystemAdmin || hasFullOrgAccess) {
      const selectOptionsSource = isHealthSystemAdmin
        ? selectOptions
        : selectOptions[0].healthSystems;
      return selectOptionsSource.map(({ name, healthClinics }) => ({
        label: name,
        options: healthClinics.map(mapHealthClinic),
      }));
    }
  }, [selectOptions]);

  useEffect(() => {
    if (mappedSelectOptions) {
      if (isHealthClinicAdmin) {
        setSelectedValue(mappedSelectOptions[0]);
      } else {
        const allHealthClinics = mappedSelectOptions.reduce(
          (arr, { options }) => [...arr, ...options],
          [],
        );
        setSelectedValue(allHealthClinics);
      }
    }
  }, [mappedSelectOptions]);

  return (
    <>
      <Helmet>
        <title>{formatMessage(messages.dashboardView)}</title>
      </Helmet>
      <Container>
        <Row>
          <Col my={30}>
            <Select
              width={500}
              selectProps={{
                isDisabled: isHealthClinicAdmin,
                options: mappedSelectOptions,
                value: selectedValue,
                onChange: setSelectedValue,
                isMulti: true,
                formatLabel: label => label,
              }}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

DashboardView.propTypes = {
  fetchSelectOptions: PropTypes.func,
  selectOptions: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  selectOptions: makeSelectDashboardViewOptions(),
});

const mapDispatchToProps = {
  fetchSelectOptions: fetchDashboardViewSelectOptionsRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  injectReducer({ key: 'organizations', reducer: organizationsReducer }),

  injectSaga({
    key: 'fetchDashboardViewSelectOptions',
    saga: fetchDashboardViewSelectOptionsSaga,
  }),
)(DashboardView);
