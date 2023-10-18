import React, { FC } from 'react';
import { useIntl } from 'react-intl';
import { useField } from 'formik';

import useDidUpdateEffect from 'utils/useDidUpdateEffect';

import Row from 'components/Row';
import FormikSwitchInput from 'components/FormikSwitchInput';
import { LabelPosition } from 'components/Switch';
import FormikSelect from 'components/FormikSelect';
import { SelectOption } from 'components/Select/types';

import messages from './messages';

export type Props = {
  selectFirstSessionFormikKey: string;
  sessionOptionFormikKey: string;
  sessionOptions: SelectOption<string>[];
};

export const SelectSessionControls: FC<Props> = ({
  selectFirstSessionFormikKey,
  sessionOptionFormikKey,
  sessionOptions,
}) => {
  const { formatMessage } = useIntl();

  const [{ value: selectFirstSession }] = useField<boolean>(
    selectFirstSessionFormikKey,
  );
  const [, , { setValue: setSessionOption }] = useField(sessionOptionFormikKey);

  useDidUpdateEffect(() => {
    if (selectFirstSession) {
      setSessionOption(sessionOptions[0]);
    }
  }, [selectFirstSession]);

  return (
    <>
      <Row mb={16}>
        <Row>
          <FormikSwitchInput
            formikKey={selectFirstSessionFormikKey}
            labelPosition={LabelPosition.Right}
          >
            {formatMessage(messages.selectFirstSession)}
          </FormikSwitchInput>
        </Row>
      </Row>
      <FormikSelect
        formikKey={sessionOptionFormikKey}
        label={formatMessage(messages.sessionSelectLabel)}
        inputProps={{
          placeholder: formatMessage(messages.sessionSelectPlaceholder),
        }}
        options={sessionOptions}
        required
        disabled={selectFirstSession}
      />
    </>
  );
};
