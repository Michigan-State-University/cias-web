import React, { useRef } from 'react';
import { useIntl } from 'react-intl';
import { useField } from 'formik';

import BinIcon from 'assets/svg/bin-no-bg.svg';
import CopyIcon from 'assets/svg/copy2.svg';

import { colors, themeColors } from 'theme';

import { SimpleHealthClinic } from 'models/HealthClinic';

import useDidUpdateEffect from 'utils/useDidUpdateEffect';

import { Col as GCol, Row as GRow } from 'components/ReactGridSystem';
import { EllipsisText } from 'components/Text';
import { ImageButton, TextButton } from 'components/Button';
import Row from 'components/Row';
import FormikInputWithAdornment, {
  AdornmentType,
} from 'components/FormikInputWithAdornment';
import CopyToClipboard from 'components/CopyToClipboard';

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

  const [{ value: selected }, , { setValue: setSelectedValue }] =
    useField<boolean>(selectedFormikKey);
  const [
    { value: name },
    ,
    { setValue: setNameValue, setTouched: setNameTouched },
  ] = useField(nameFormikKey);

  let inputColumnXs = 10;
  if (healthClinic) inputColumnXs -= 2;
  if (!selected) inputColumnXs -= 2;

  const placeholder = healthClinic
    ? `${placeholderBase}?cid=${healthClinic.id}`
    : placeholderBase;

  useDidUpdateEffect(() => {
    if (selected) {
      inputRef.current?.focus();
    }
  }, [selected]);

  return (
    <GRow gutterWidth={16}>
      {healthClinic && (
        <GCol xs={2}>
          <Row height={43} align="center">
            <EllipsisText text={healthClinic.name} fontWeight="bold" />
          </Row>
        </GCol>
      )}
      <GCol xs={inputColumnXs}>
        <FormikInputWithAdornment
          formikKey={nameFormikKey}
          type={AdornmentType.PREFIX}
          adornment={selected ? CUSTOM_LINK_PREFIX : ''}
          disabled={!selected}
          backgroundColor={selected ? undefined : themeColors.highlight}
          opacity={selected ? undefined : 1}
          placeholder={selected ? '' : placeholder}
          ref={inputRef}
        />
      </GCol>
      <GCol xs={1}>
        <CopyToClipboard
          // @ts-ignore
          renderAsCustomComponent
          textToCopy={selected ? `${CUSTOM_LINK_PREFIX}${name}` : placeholder}
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
      </GCol>
      <GCol xs={selected ? 1 : 3}>
        {!selected && (
          <TextButton
            onClick={() => setSelectedValue(true)}
            buttonProps={{
              color: themeColors.secondary,
              mt: 11,
            }}
          >
            {formatMessage(messages.createLink)}
          </TextButton>
        )}
        {selected && (
          <ImageButton
            src={BinIcon}
            onClick={() => {
              // TODO try toggle
              setSelectedValue(false, true);
              // setSelectedValue(false, false); for duplicates
              setNameTouched(false, false);
              setNameValue('', false);
              // setNameValue('', true); for duplicates
            }}
            title={formatMessage(messages.removeLink)}
            fill={colors.heather}
            showHoverEffect
            noHoverBackground
            mt={8}
          />
        )}
      </GCol>
    </GRow>
  );
};

export default ShortLinkItem;
