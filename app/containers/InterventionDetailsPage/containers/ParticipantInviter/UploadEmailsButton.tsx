import React, { FC } from 'react';
import { useIntl } from 'react-intl';

import CsvIcon from 'assets/svg/csv-file.svg';

import { TextButton } from 'components/Button';
import Icon from 'components/Icon';

import messages from './messages';
import { CSV_BUTTON_PROPS } from './constants';

export type Props = {
  disabled: boolean;
  onClick: () => void;
};

export const UploadEmailsButton: FC<Props> = ({ onClick, disabled }) => {
  const { formatMessage } = useIntl();

  return (
    <>
      <TextButton
        onClick={onClick}
        buttonProps={CSV_BUTTON_PROPS}
        disabled={disabled}
      >
        <Icon src={CsvIcon} />
        {formatMessage(messages.uploadEmailsButtonTitle)}
      </TextButton>
    </>
  );
};
