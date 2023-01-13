import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import isEqual from 'lodash/isEqual';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';

import BinIcon from 'assets/svg/bin-no-bg.svg';
import CopyIcon from 'assets/svg/copy2.svg';

import { colors, themeColors } from 'theme';

import { Intervention } from 'models/Intervention';
import { CharacterType } from 'models/Character';
import { NarratorAnimation } from 'models/Narrator';
import { ShortLink } from 'models/ShortLink';
import { ApiDataCollection } from 'models/Api';
import { SimpleHealthClinic } from 'models/HealthClinic';

import { jsonApiToArray } from 'utils/jsonApiMapper';
import { languageSelectOptionFormatter } from 'utils/formatters';
import { objectDifference } from 'utils/objectDifference';
import useGet from 'utils/useGet';
import {
  requiredValidationSchema,
  unreservedURLCharactersSchema,
} from 'utils/validators';

import {
  editInterventionRequest,
  makeSelectIntervention,
  makeSelectInterventionLoader,
} from 'global/reducers/intervention';

import {
  Col as GCol,
  FullWidthContainer,
  Row as GRow,
} from 'components/ReactGridSystem';
import ApiSelect from 'components/Select/ApiSelect';
import Text from 'components/Text';
import Divider from 'components/Divider';
import H3 from 'components/H3';
import { LabelPosition } from 'components/Switch';
import Switch from 'components/Switch/Switch';
import Button, { ImageButton, TextButton } from 'components/Button';
import Row from 'components/Row';
import CharacterSelector from 'components/CharacterSelector';
import { GlobalReplacementModal } from 'components/MissingAnimationsModal';
import FormikInputWithAdornment, {
  AdornmentType,
} from 'components/FormikInputWithAdornment';
import Loader from 'components/Loader';
import ErrorAlert from 'components/ErrorAlert';
import CopyToClipboard from 'components/CopyToClipboard';

import {
  INTERVENTION_LANGUAGE_LABEL_ID,
  INTERVENTION_QUICK_EXIT_LABEL_ID,
} from './constants';
import messages from '../../messages';
import modalMessages from './messages';

const linksSchema = Yup.object().shape({
  selected: Yup.boolean(),
  name: Yup.string().when('selected', {
    is: (selected) => selected,
    then: unreservedURLCharactersSchema.concat(requiredValidationSchema),
  }),
});

export type Props = {
  editingPossible: boolean;
  onClose: () => void;
};

// TODO use proper copies depending on intervention type, do not display link form for organization, save links, validate duplicates, handle used links
const InterventionSettingsModal = ({ editingPossible, onClose }: Props) => {
  const { formatMessage } = useIntl();

  const dispatch = useDispatch();
  const originalIntervention = useSelector(makeSelectIntervention());
  const savingChanges = useSelector(
    makeSelectInterventionLoader('editIntervention'),
  );

  const [changedIntervention, setChangedIntervention] =
    useState(originalIntervention);
  const [newNarrator, setNewNarrator] = useState(null);
  const { id, languageCode, languageName, quickExit, currentNarrator } =
    changedIntervention;

  useEffect(() => {
    setChangedIntervention(originalIntervention);
  }, [originalIntervention]);

  const hasInterventionChanged = useMemo(
    () => !isEqual(originalIntervention, changedIntervention),
    [originalIntervention, changedIntervention],
  );

  const onSaveNarrator = (
    replacementAnimations: Record<
      string,
      { [key in NarratorAnimation]: NarratorAnimation }
    >,
  ) => {
    const changes = objectDifference(originalIntervention, changedIntervention);
    dispatch(
      editInterventionRequest(
        {
          ...changes,
          id,
        },
        {
          hasNarratorChanged: true,
          replacementAnimations,
          onSuccess: onClose,
        },
      ),
    );
  };

  const saveChanges = useCallback(() => {
    if (
      changedIntervention.currentNarrator !==
      originalIntervention.currentNarrator
    ) {
      setNewNarrator(changedIntervention.currentNarrator);
    } else {
      const changes = objectDifference(
        originalIntervention,
        changedIntervention,
      );
      dispatch(
        editInterventionRequest(
          {
            ...changes,
            id,
          },
          { onSuccess: onClose },
        ),
      );
    }
  }, [originalIntervention, changedIntervention]);

  const changeIntervention = (changes: Partial<Intervention>) => {
    setChangedIntervention({
      ...changedIntervention,
      ...changes,
    });
  };

  const handleLanguageChange = ({
    value,
    label,
    googleLanguageId,
  }: {
    value: Intervention['languageCode'];
    label: Intervention['languageName'];
    googleLanguageId: string | number;
  }) =>
    changeIntervention({
      languageCode: value,
      languageName: label,
      googleLanguageId: +googleLanguageId,
    });

  const handleQuickExitChange = (value: Intervention['quickExit']) =>
    changeIntervention({
      quickExit: value,
    });

  const handleNarratorChange = (value: CharacterType) => {
    changeIntervention({
      currentNarrator: value,
    });
  };

  // const [shortLink, setShortLink] = useState<Nullable<ShortLinkData>>(null);

  const {
    error,
    isFetching,
    data: shortLinksData,
  } = useGet<
    ApiDataCollection<ShortLink> & {
      health_clinics: ApiDataCollection<SimpleHealthClinic>['data'];
    },
    { shortLinks: ShortLink[]; healthClinics: SimpleHealthClinic[] }
  >(`/v1/interventions/${id}/short_links`, (data) => ({
    shortLinks: jsonApiToArray(data, 'shortLink'),
    healthClinics: jsonApiToArray(
      { data: data.health_clinics },
      'simpleHealthClinic',
    ),
  }));

  const initialValues = useMemo(() => {
    const name = shortLinksData?.shortLinks?.[0]?.name;
    return { selected: !!name, name: name ?? '' };
  }, [shortLinksData]);

  const placeholder = `${
    process.env.WEB_URL
  }/interventions/${id}/sessions/${'sessionId'}/fill`; // TODO add session id

  const prefix = `${process.env.WEB_URL}/int/`;

  if (isFetching) {
    return <Loader type="inline" />;
  }

  if (error) {
    return <ErrorAlert errorText={error} />;
  }

  return (
    <FullWidthContainer>
      <GlobalReplacementModal
        sourceNarrator={originalIntervention.currentNarrator}
        destinationNarrator={changedIntervention.currentNarrator}
        visible={newNarrator !== null}
        onClose={() => setNewNarrator(null)}
        onChangeNarrator={onSaveNarrator}
      />
      <Text mt={6}>
        {formatMessage(messages.interventionSettingsModalSubtitle)}
      </Text>
      <Divider mt={16} mb={40} color={colors.lightDivider} />
      <GRow mb={16}>
        <GCol>
          <H3 id={INTERVENTION_LANGUAGE_LABEL_ID}>
            {formatMessage(messages.interventionSettingsLanguageLabel)}
          </H3>
        </GCol>
        <GCol>
          <H3>{formatMessage(messages.interventionSettingsQuickExit)}</H3>
        </GCol>
      </GRow>
      <GRow align="center">
        <GCol>
          {/*  @ts-ignore */}
          <ApiSelect
            url="/v1/google/languages"
            dataParser={(data: object) =>
              jsonApiToArray(data, 'supportedLanguage')
            }
            optionsFormatter={languageSelectOptionFormatter}
            selectProps={{
              onChange: handleLanguageChange,
              value: {
                value: languageCode,
                label: languageName,
              },
              'aria-labelledby': INTERVENTION_LANGUAGE_LABEL_ID,
              isDisabled: !editingPossible,
            }}
            width="100%"
          />
        </GCol>
        <GCol>
          <Switch
            checked={quickExit}
            onToggle={handleQuickExitChange}
            id={INTERVENTION_QUICK_EXIT_LABEL_ID}
            labelPosition={LabelPosition.Right}
            disabled={!editingPossible}
          >
            <Text fontWeight="bold">
              {formatMessage(messages.interventionSettingsQuickExitLabel)}
            </Text>
          </Switch>
        </GCol>
      </GRow>
      <GRow mb={16} mt={40}>
        <GCol>
          <H3>{formatMessage(messages.defaultNarrator)}</H3>
        </GCol>
      </GRow>
      <GRow mb={16}>
        <GCol>
          <CharacterSelector
            value={currentNarrator}
            onChange={handleNarratorChange}
            disabled={!editingPossible}
          />
        </GCol>
      </GRow>
      <H3 mt={40}>{formatMessage(modalMessages.interventionLinkHeader)}</H3>
      <Text mt={8} textOpacity={0.7} color={themeColors.text}>
        {formatMessage(modalMessages.interventionLinkDescription)}
      </Text>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={saveChanges}
        validationSchema={linksSchema}
      >
        {({
          isValid,
          dirty,
          setFieldValue,
          setFieldTouched,
          handleSubmit,
          values: { selected, name },
        }) => (
          <Form>
            <GRow mt={24} gutterWidth={16}>
              <GCol xs={selected ? 10 : 8}>
                <FormikInputWithAdornment
                  formikKey="name"
                  type={AdornmentType.PREFIX}
                  adornment={selected ? prefix : ''}
                  disabled={!selected}
                  backgroundColor={
                    !selected ? themeColors.highlight : undefined
                  }
                  opacity={!selected ? 1 : undefined}
                  placeholder={selected ? '' : placeholder}
                />
              </GCol>
              <GCol xs={1}>
                <CopyToClipboard
                  // @ts-ignore
                  renderAsCustomComponent
                  textToCopy={selected ? `${prefix}${name}` : placeholder}
                >
                  <ImageButton
                    src={CopyIcon}
                    title={formatMessage(modalMessages.copyLink)}
                    fill={colors.heather}
                    showHoverEffect
                    noHoverBackground
                    mt={8}
                  />
                </CopyToClipboard>
              </GCol>
              <GCol xs={selected ? 1 : 3}>
                {!selected && (
                  <TextButton
                    onClick={() => setFieldValue('selected', true)}
                    buttonProps={{
                      color: themeColors.secondary,
                      mt: 11,
                    }}
                  >
                    {formatMessage(modalMessages.createLink)}
                  </TextButton>
                )}
                {selected && (
                  <ImageButton
                    src={BinIcon}
                    onClick={() => {
                      setFieldTouched('name', false, false);
                      setFieldValue('name', '', false);
                      setFieldValue('selected', false);
                    }}
                    title={formatMessage(modalMessages.removeLink)}
                    fill={colors.heather}
                    showHoverEffect
                    noHoverBackground
                    mt={8}
                  />
                )}
              </GCol>
            </GRow>
            <Row gap={16} mt={56}>
              <Button
                // @ts-ignore
                px={30}
                width="auto"
                title={formatMessage(messages.applyChangesButton)}
                disabled={!isValid || (!hasInterventionChanged && !dirty)}
                loading={savingChanges}
                onClick={handleSubmit}
              />
              <Button
                // @ts-ignore
                px={30}
                width="auto"
                inverted
                title={formatMessage(messages.cancelButton)}
                onClick={onClose}
              />
            </Row>
          </Form>
        )}
      </Formik>
    </FullWidthContainer>
  );
};
export default memo(InterventionSettingsModal);
