import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';

import { makeSelectSelectedQuestion } from 'global/reducers/questions';

import Column from 'components/Column';
import PhoneNumberForm from 'components/AccountSettings/PhoneNumberForm';
import Row from 'components/Row';
import { TimeRanges } from 'components/TimeRanges';

const PhoneQuestion = ({ selectedQuestion, intl: { formatMessage } }) => {
  const { time_ranges: timeRanges } = selectedQuestion;
  return (
    <>
      <Column mt={10}>
        <Row>
          <PhoneNumberForm
            disabled
            formatMessage={formatMessage}
            error={null}
            loading={false}
            changeErrorValue={null}
          />
        </Row>
        {timeRanges && <TimeRanges availableTimeRanges={timeRanges} disabled />}
      </Column>
    </>
  );
};

PhoneQuestion.propTypes = {
  selectedQuestion: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  selectedQuestion: makeSelectSelectedQuestion(),
});

const withConnect = connect(mapStateToProps);

export default injectIntl(compose(withConnect)(PhoneQuestion));
