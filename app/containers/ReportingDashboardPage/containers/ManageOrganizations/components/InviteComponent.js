import PropTypes from 'prop-types';
import React, { memo, useContext } from 'react';
import { useIntl } from 'react-intl';
import { useFormik } from 'formik';

import EditIcon from 'assets/svg/edit.svg';
import useDidUpdateEffect from 'utils/useDidUpdateEffect';

import { Col, Row, NoMarginRow } from 'components/ReactGridSystem';
import ActionIcon from 'components/ActionIcon';
import Comment from 'components/Text/Comment';
import H2 from 'components/H2';
import Icon from 'components/Icon';
import Button from 'components/Button';
import { FormikHookInput } from 'components/FormikInput';
import Form from 'components/Form';

import { SettingsContainer } from '../../../styled';
import messages from '../../../messages';
import {
  inviteValidationSchema,
  ManageOrganizationsContext,
} from '../constants';

const InviteComponent = ({ inviteTo, onCancel, onInvite }) => {
  const { formatMessage } = useIntl();

  const onSubmit = (values, actions) => {
    onInvite(values.email);
    actions.setSubmitting(false);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: inviteValidationSchema,
    onSubmit,
  });

  const {
    loaders: { inviteAdmin: inviteAdminLoader },
    errors: { inviteAdmin: inviteAdminError },
  } = useContext(ManageOrganizationsContext);

  useDidUpdateEffect(() => {
    if (!inviteAdminLoader && !inviteAdminError) {
      onCancel();
      formik.handleReset();
    }
  }, [inviteAdminLoader]);

  return (
    <SettingsContainer>
      <NoMarginRow justify="between" align="end">
        <H2>{formatMessage(messages.inviteAdminHeader)}</H2>

        <ActionIcon onClick={onCancel} mr={0} />
      </NoMarginRow>

      <NoMarginRow>
        <Comment fontWeight="bold">
          {formatMessage(messages.inviteAdminSubheader, { name: inviteTo })}
        </Comment>
      </NoMarginRow>

      <Form onSubmit={formik.handleSubmit}>
        <Row justify="between" align="center" mt={30}>
          <Col>
            <FormikHookInput
              formikKey="email"
              formikState={formik}
              placeholder={formatMessage(messages.adminEmailPlaceholder)}
              label={formatMessage(messages.adminEmailLabel)}
              type="email"
              transparent
            >
              <Icon ml={8} src={EditIcon} />
            </FormikHookInput>
          </Col>
        </Row>

        <Row mt={30}>
          <Col xs={8}>
            <Button
              type="submit"
              disabled={!formik.values.email || !formik.isValid}
              loading={formik.isSubmitting || inviteAdminLoader}
              hoverable
              width="100%"
              px={10}
            >
              {formatMessage(messages.inviteAdminButton)}
            </Button>
          </Col>
        </Row>
      </Form>
    </SettingsContainer>
  );
};

InviteComponent.propTypes = {
  inviteTo: PropTypes.string,
  onCancel: PropTypes.func,
  onInvite: PropTypes.func,
};

export default memo(InviteComponent);
