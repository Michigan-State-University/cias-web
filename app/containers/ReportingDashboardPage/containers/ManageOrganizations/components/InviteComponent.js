import PropTypes from 'prop-types';
import React, { memo, useContext } from 'react';
import { useIntl } from 'react-intl';
import { Form, Formik } from 'formik';

import EditIcon from 'assets/svg/edit.svg';

import { Col, Row, NoMarginRow } from 'components/ReactGridSystem';
import ActionIcon from 'components/ActionIcon';
import Comment from 'components/Text/Comment';
import H2 from 'components/H2';
import Icon from 'components/Icon';
import Button from 'components/Button';
import TransparentFormikInput from 'components/FormikInput/TransparentFormikInput';

import useDidUpdateEffect from 'utils/useDidUpdateEffect';
import { SettingsContainer } from '../../../styled';
import messages from '../../../messages';
import {
  inviteValidationSchema,
  ManageOrganizationsContext,
} from '../constants';

const InviteComponent = ({ inviteTo, onCancel, onInvite }) => {
  const { formatMessage } = useIntl();

  const {
    loaders: { inviteAdmin: inviteAdminLoader },
    errors: { inviteAdmin: inviteAdminError },
  } = useContext(ManageOrganizationsContext);

  useDidUpdateEffect(() => {
    if (!inviteAdminLoader && !inviteAdminError) onCancel();
  }, [inviteAdminLoader]);

  const onSubmit = (values, actions) => {
    onInvite(values.email);
    actions.setSubmitting(false);
  };

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

      <Formik
        validationSchema={inviteValidationSchema}
        initialValues={{
          email: '',
        }}
        onSubmit={onSubmit}
      >
        {({ isValid, values, isSubmitting }) => (
          <Form>
            <Row justify="between" align="center" mt={30}>
              <Col>
                <TransparentFormikInput
                  formikKey="email"
                  placeholder={formatMessage(messages.adminEmailPlaceholder)}
                  label={formatMessage(messages.adminEmailLabel)}
                  type="email"
                >
                  <Icon ml={8} src={EditIcon} />
                </TransparentFormikInput>
              </Col>
            </Row>

            <Row mt={30}>
              <Col xs={8}>
                <Button
                  type="submit"
                  disabled={!values.email || !isValid}
                  loading={isSubmitting || inviteAdminLoader}
                  hoverable
                  width="100%"
                  px={10}
                >
                  {formatMessage(messages.inviteAdminButton)}
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </SettingsContainer>
  );
};

InviteComponent.propTypes = {
  inviteTo: PropTypes.string,
  onCancel: PropTypes.func,
  onInvite: PropTypes.func,
};

export default memo(InviteComponent);
