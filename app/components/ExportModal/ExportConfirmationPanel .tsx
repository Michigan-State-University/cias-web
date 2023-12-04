import { useIntl } from 'react-intl';
import { Markup } from 'interweave';

import SpinnerIcon from 'assets/svg/spinner.svg';

import Text from 'components/Text';
import { Button } from 'components/Button';
import Icon from 'components/Icon';

import messages from './messages';

export type Props = {
  onClose: () => void;
};

export const ExportConfirmationPanel = ({ onClose }: Props) => {
  const { formatMessage } = useIntl();

  return (
    <>
      <Icon src={SpinnerIcon} alt={formatMessage(messages.spinnerIconAlt)} />
      <Text fontSize={15} lineHeight={1.35} textAlign="center">
        <Markup
          content={formatMessage(messages.exportConfirmationDescription)}
        />
      </Text>
      <Button width="auto" inverted px={32} onClick={onClose}>
        {formatMessage(messages.exportConfirmationButtonTitle)}
      </Button>
    </>
  );
};
