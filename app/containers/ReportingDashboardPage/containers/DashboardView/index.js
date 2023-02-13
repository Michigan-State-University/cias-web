import React, { useEffect, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useParams } from 'react-router';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';

import { injectReducer, injectSaga } from 'redux-injectors';

import {
  fetchDashboardViewSelectOptionsRequest,
  makeSelectDashboardViewOptions,
  organizationsReducer,
} from 'global/reducers/organizations';
import { fetchDashboardViewSelectOptionsSaga } from 'global/reducers/organizations/sagas';
import { useRoleManager } from 'models/User/RolesManager';
import { ReportingDashboardPageContext } from 'containers/ReportingDashboardPage/constants';

import { Container, Row } from 'components/ReactGridSystem';
import Select from 'components/Select';

import Button from 'components/Button';
import { setChartFiltersRequest } from 'global/reducers/dashboardSections';
import messages from '../../messages';
import DashboardSections from '../DashboardSetup/containers/DashboardSections';
import { DEFAULT_OPTION, SELECT_OPTIONS } from './constants';

const DashboardView = ({
  fetchSelectOptions,
  selectOptions,
  setChartFilters,
}) => {
  const { formatMessage } = useIntl();
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedDateRange, setSelectedDateRange] = useState(
    DEFAULT_OPTION(formatMessage),
  );
  const { organizationId } = useParams();
  const { organizableId } = useContext(ReportingDashboardPageContext);

  const { isHealthClinicAdmin, isHealthSystemAdmin, hasFullOrgAccess } =
    useRoleManager();

  useEffect(() => {
    fetchSelectOptions(organizableId || organizationId);
  }, [organizableId, organizationId]);

  const mapHealthClinic = ({ id, name }) => ({
    label: name,
    value: id,
  });
  const mappedSelectOptions = useMemo(() => {
    if (!selectOptions) return null;
    if (isHealthClinicAdmin || isHealthSystemAdmin) {
      const selectOptionsSource = isHealthClinicAdmin
        ? selectOptions
        : selectOptions[0].healthClinics;
      return selectOptionsSource.map(mapHealthClinic);
    }
    if (hasFullOrgAccess) {
      return selectOptions[0].healthSystems.map(({ name, healthClinics }) => ({
        label: name,
        options: healthClinics.map(mapHealthClinic),
      }));
    }
  }, [selectOptions]);

  const organizationIdForRole = useMemo(() => {
    if (isHealthClinicAdmin) return organizationId;
    if (isHealthSystemAdmin) {
      if (!selectOptions) return null;
      return selectOptions[0].organizationId;
    }
    if (hasFullOrgAccess) return organizableId || organizationId;
  }, [organizableId, selectOptions]);

  useEffect(() => {
    if (mappedSelectOptions) {
      if (isHealthClinicAdmin || isHealthSystemAdmin) {
        setSelectedValue(mappedSelectOptions);
      } else {
        const allHealthClinics = mappedSelectOptions.reduce(
          (arr, { options }) => [...arr, ...options],
          [],
        );
        setSelectedValue(allHealthClinics);
      }
    }
  }, [mappedSelectOptions]);

  const setChartDataFilters = () => {
    setChartFilters({
      daysOffset: selectedDateRange,
      clinics: selectedValue,
      organizationId: organizationIdForRole,
    });
  };

  const dateSelectOptions = useMemo(
    () => SELECT_OPTIONS(formatMessage),
    [SELECT_OPTIONS],
  );

  return (
    <>
      <Helmet>
        <title>{formatMessage(messages.dashboardView)}</title>
      </Helmet>
      <Container mx="55px !important" maxWidth="100% !important">
        <Row my={15} justify="around" width="100%">
          <Select
            width={500}
            selectProps={{
              options: mappedSelectOptions,
              value: selectedValue,
              onChange: setSelectedValue,
              isMulti: true,
              formatLabel: (label) => label,
            }}
          />
          <Select
            width={500}
            selectProps={{
              options: dateSelectOptions,
              value: selectedDateRange,
              onChange: setSelectedDateRange,
            }}
          />
        </Row>
        <Row onClick={setChartDataFilters} mb={15} justify="center">
          <Button disabled={selectedValue?.length === 0} width={200}>
            {formatMessage(messages.filterData)}
          </Button>
        </Row>
        {organizationIdForRole && (
          <DashboardSections
            organizableId={organizationIdForRole}
            fromDashboardView
          />
        )}
      </Container>
    </>
  );
};

DashboardView.propTypes = {
  fetchSelectOptions: PropTypes.func,
  setChartFilters: PropTypes.func,
  selectOptions: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  selectOptions: makeSelectDashboardViewOptions(),
});

const mapDispatchToProps = {
  fetchSelectOptions: fetchDashboardViewSelectOptionsRequest,
  setChartFilters: setChartFiltersRequest,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  injectReducer({ key: 'organizations', reducer: organizationsReducer }),

  injectSaga({
    key: 'fetchDashboardViewSelectOptions',
    saga: fetchDashboardViewSelectOptionsSaga,
  }),
)(DashboardView);
