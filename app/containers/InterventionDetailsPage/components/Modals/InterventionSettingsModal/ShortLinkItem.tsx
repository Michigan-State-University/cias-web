import React, { useMemo, useRef } from 'react';
import { useIntl } from 'react-intl';
import { useField } from 'formik';
import CopyIcon from 'assets/svg/copy2.svg';

import { colors, themeColors } from 'theme';

import { SimpleHealthClinic } from 'models/HealthClinic';

import useDidUpdateEffect from 'utils/useDidUpdateEffect';

import { EllipsisText } from 'components/Text';
import { ImageButton } from 'components/Button';
import Row from 'components/Row';
import FormikInputWithAdornment, {
  AdornmentType,
} from 'components/FormikInputWithAdornment';
import CopyToClipboard from 'components/CopyToClipboard';
import FormikSwitchInput from 'components/FormikSwitchInput';
import Box from 'components/Box';

import { CUSTOM_LINK_PREFIX } from './constants';
import messages from './messages';

export type Props = {
  nameFormikKey: string;
  selectedFormikKey: string;
  placeholderBase: string;
  healthClinic?: SimpleHealthClinic;
};

const ShortLinkItem = ({
  nameFormikKey,
  selectedFormikKey,
  placeholderBase,
  healthClinic,
}: Props) => {
  const { formatMessage } = useIntl();

  const inputRef = useRef<HTMLInputElement>(null);

  const [{ value: selected }] = useField<boolean>(selectedFormikKey);
  const [{ value: name }, , { setValue: setNameValue }] =
    useField(nameFormikKey);

  const placeholder = healthClinic
    ? `${placeholderBase}?cid=${healthClinic.id}`
    : placeholderBase;

  useDidUpdateEffect(() => {
    if (selected) {
      inputRef.current?.focus();
    } else {
      setNameValue('');
    }
  }, [selected]);

  const { switchAriaLabel, inputAriaLabel } = useMemo(() => {
    if (healthClinic) {
      const { name: healthClinicName } = healthClinic;
      return {
        switchAriaLabel: formatMessage(messages.linkSwitchAriaLabelForClinic, {
          healthClinicName,
        }),
        inputAriaLabel: formatMessage(messages.linkInputAriaLabel, {
          healthClinicName,
        }),
      };
    }
    return {
      switchAriaLabel: formatMessage(messages.linkSwitchAriaLabel),
      inputAriaLabel: formatMessage(messages.linkInputAriaLabel),
    };
  }, [healthClinic]);

  return (
    <Row gap={16}>
      <Box>
        <FormikSwitchInput
          ariaLabel={switchAriaLabel}
          formikKey={selectedFormikKey}
          mt={11}
        />
      </Box>
      {healthClinic && (
        <Row height={43} align="center" flexShrink={0} width={75}>
          <EllipsisText text={healthClinic.name} fontWeight="bold" />
        </Row>
      )}
      <Box filled>
        <FormikInputWithAdornment
          formikKey={nameFormikKey}
          type={AdornmentType.PREFIX}
          adornment={selected ? CUSTOM_LINK_PREFIX : ''}
          disabled={!selected}
          backgroundColor={selected ? undefined : themeColors.highlight}
          opacity={selected ? undefined : 1}
          placeholder={selected ? '' : placeholder}
          ref={inputRef}
          aria-label={inputAriaLabel}
        />
      </Box>
      <CopyToClipboard
        // @ts-ignore
        renderAsCustomComponent
        textToCopy={selected ? `${CUSTOM_LINK_PREFIX}${name}` : placeholder}
        popupVerticalPosition="center"
        popupHorizontalPosition="left"
        disabled={!selected && !placeholderBase}
      >
        <ImageButton
          src={CopyIcon}
          title={formatMessage(messages.copyLink)}
          fill={colors.heather}
          showHoverEffect
          noHoverBackground
          mt={8}
          disabled={!selected && !placeholderBase}
        />
      </CopyToClipboard>
    </Row>
  );
};

export default ShortLinkItem;
