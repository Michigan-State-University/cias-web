import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import isEqual from 'lodash/isEqual';
import { Form, Formik, FormikProps } from 'formik';

import BinIcon from 'assets/svg/bin-no-bg.svg';
import CopyIcon from 'assets/svg/copy2.svg';

import { colors, themeColors } from 'theme';

import { Intervention, InterventionType } from 'models/Intervention';
import { CharacterType } from 'models/Character';
import { NarratorAnimation } from 'models/Narrator';
import { ApiDataCollection } from 'models/Api';
import { Language } from 'models/Language';

import { jsonApiToArray } from 'utils/jsonApiMapper';
import {
  languageSelectOptionFormatter,
  LanguageSelectOption,
} from 'utils/formatters';
import { objectDifference } from 'utils/objectDifference';
import useGet from 'utils/useGet';

import {
  changeInterventionNarratorRequest,
  editInterventionRequest,
  editShortLinksRequest,
  makeSelectIntervention,
  makeSelectInterventionError,
  makeSelectInterventionLoader,
} from 'global/reducers/intervention';
import reducerMessages from 'global/reducers/intervention/messages';

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
  INTERVENTION_LINK_ID,
  INTERVENTION_QUICK_EXIT_LABEL_ID,
} from './constants';
import messages from '../../messages';
import modalMessages from './messages';
import {
  InterventionSettingsFormValues,
  GetShortLinksResponse,
  ShortLinksData,
} from './types';
import {
  createInterventionSettingsFormValidationSchema,
  getShortLinksDataParser,
  mapFormValuesToShortLinks,
  mapLanguageToInterventionChanges,
  mapShortLinksToFormValues,
} from './utils';

export type Props = {
  editingPossible: boolean;
  onClose: () => void;
};

const InterventionSettingsModal = ({ editingPossible, onClose }: Props) => {
  const { formatMessage } = useIntl();

  const dispatch = useDispatch();
  const originalIntervention: Intervention = useSelector(
    makeSelectIntervention(),
  );
  const editInterventionLoader = useSelector(
    makeSelectInterventionLoader('editIntervention'),
  );
  const changeInterventionNarratorLoader = useSelector(
    makeSelectInterventionLoader('changeInterventionNarrator'),
  );
  const editShortLinksLoader = useSelector(
    makeSelectInterventionLoader('editShortLinks'),
  );
  const savingChanges =
    editInterventionLoader ||
    changeInterventionNarratorLoader ||
    editShortLinksLoader;

  const editInterventionError = useSelector(
    makeSelectInterventionError('editIntervention'),
  );
  const changeInterventionNarratorError = useSelector(
    makeSelectInterventionError('changeInterventionNarrator'),
  );
  const editShortLinksError = useSelector(
    makeSelectInterventionError('editShortLinks'),
  );

  const [newNarrator, setNewNarrator] = useState<Nullable<CharacterType>>(null);
  const {
    id,
    languageCode,
    languageName,
    type,
    organizationId,
    sessions,
    sessionsSize,
    googleLanguageId,
  } = originalIntervention;

  const formRef = useRef<FormikProps<InterventionSettingsFormValues>>(null);

  useEffect(() => {
    if (editShortLinksError && formRef.current) {
      formRef.current.setFieldError(
        'links.name',
        formatMessage(modalMessages.linkTaken),
      );
    }
  }, [editShortLinksError]);

  const {
    error: shortLinksFetchError,
    isFetching: isFetchingShortLinks,
    data: shortLinksData,
  } = useGet<GetShortLinksResponse, ShortLinksData>(
    `/v1/interventions/${id}/short_links`,
    getShortLinksDataParser,
  );

  const initialValues: InterventionSettingsFormValues = useMemo(
    () => ({
      interventionSettings: {
        language: {
          value: languageCode,
          label: languageName,
          googleLanguageId: googleLanguageId.toString(),
        },
        quickExit: originalIntervention.quickExit,
      },
      currentNarrator: originalIntervention.currentNarrator,
      links: mapShortLinksToFormValues(shortLinksData),
    }),
    [organizationId, shortLinksData],
  );

  const validationSchema = useMemo(
    () =>
      createInterventionSettingsFormValidationSchema(Boolean(organizationId)),
    [organizationId],
  );

  const placeholder = useMemo(() => {
    const base = `${process.env.WEB_URL}/interventions/${id}`;
    if (type === InterventionType.DEFAULT) {
      const firstSessionId = sessions?.[0]?.id;
      if (!firstSessionId) return '';
      return `${base}/sessions/${sessions[0].id}/fill`;
    }
    return `${base}/invite`;
  }, [type, sessionsSize, sessions]);

  const prefix = `${process.env.WEB_URL}/int/`;

  const saveOtherSettingsAndLinks = useCallback(
    (formValues: Nullable<InterventionSettingsFormValues>) => {
      if (!formValues) return;

      const linksChanged = !isEqual(initialValues.links, formValues.links);
      if (linksChanged) {
        dispatch(
          editShortLinksRequest(mapFormValuesToShortLinks(formValues.links)),
        );
      }

      const interventionSettingsChanged = !isEqual(
        initialValues.interventionSettings,
        formValues.interventionSettings,
      );
      if (interventionSettingsChanged) {
        const { language, ...otherChanges } = objectDifference(
          initialValues.interventionSettings,
          formValues.interventionSettings,
        ) as Partial<InterventionSettingsFormValues['interventionSettings']>;
        dispatch(
          editInterventionRequest(
            {
              ...(language ? mapLanguageToInterventionChanges(language) : {}),
              ...otherChanges,
              id,
            },
            {
              successMessage: formatMessage(
                reducerMessages.interventionSettingsSaved,
              ),
            },
          ),
        );
      }
    },
    [initialValues],
  );

  const submitForm = useCallback(
    (formValues: InterventionSettingsFormValues) => {
      const narratorChanged = !isEqual(
        initialValues.currentNarrator,
        formValues.currentNarrator,
      );
      if (narratorChanged) {
        setNewNarrator(formValues.currentNarrator);
      } else {
        saveOtherSettingsAndLinks(formValues);
      }
    },
    [initialValues, saveOtherSettingsAndLinks],
  );

  const onSaveNarrator = (
    replacementAnimations: Record<
      string,
      { [key in NarratorAnimation]: NarratorAnimation }
    >,
  ) => {
    dispatch(
      changeInterventionNarratorRequest(
        formRef.current?.values?.currentNarrator,
        replacementAnimations,
      ),
    );
    saveOtherSettingsAndLinks(formRef.current?.values);
  };

  useEffect(() => {
    if (
      !savingChanges &&
      !editInterventionError &&
      !changeInterventionNarratorError &&
      !editShortLinksError &&
      formRef?.current?.dirty
    ) {
      onClose();
    }
  }, [
    savingChanges,
    editInterventionError,
    changeInterventionNarratorError,
    editShortLinksError,
  ]);

  if (isFetchingShortLinks) {
    return <Loader type="inline" />;
  }

  if (shortLinksFetchError) {
    return <ErrorAlert errorText={shortLinksFetchError} />;
  }

  return (
    <FullWidthContainer>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        onSubmit={submitForm}
        validationSchema={validationSchema}
        innerRef={formRef}
      >
        {({
          isValid,
          dirty,
          setFieldValue,
          setFieldTouched,
          handleSubmit,
          values: {
            links: { selected, name },
            currentNarrator,
            interventionSettings: { language, quickExit },
          },
        }) => (
          <Form>
            <GlobalReplacementModal
              sourceNarrator={originalIntervention.currentNarrator}
              destinationNarrator={currentNarrator}
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
                  dataParser={(data: ApiDataCollection<Language>) =>
                    jsonApiToArray(data, 'supportedLanguage')
                  }
                  optionsFormatter={languageSelectOptionFormatter}
                  selectProps={{
                    onChange: (value: LanguageSelectOption) =>
                      setFieldValue('interventionSettings.language', value),
                    onBlur: () =>
                      setFieldTouched('interventionSettings.language', true),
                    value: language,
                    'aria-labelledby': INTERVENTION_LANGUAGE_LABEL_ID,
                    isDisabled: !editingPossible,
                  }}
                  width="100%"
                />
              </GCol>
              <GCol>
                <Switch
                  checked={quickExit}
                  onToggle={(value: boolean) =>
                    setFieldValue('interventionSettings.quickExit', value)
                  }
                  onBlur={() =>
                    setFieldTouched('interventionSettings.quickExit', true)
                  }
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
            {editInterventionError && (
              <ErrorAlert
                mt={16}
                errorText={
                  editInterventionError?.response?.data?.message ??
                  editInterventionError
                }
              />
            )}
            <GRow mb={16} mt={40}>
              <GCol>
                <H3>{formatMessage(messages.defaultNarrator)}</H3>
              </GCol>
            </GRow>
            <GRow mb={16}>
              <GCol>
                <CharacterSelector
                  value={currentNarrator}
                  onChange={(value: CharacterType) =>
                    setFieldValue('currentNarrator', value)
                  }
                  disabled={!editingPossible}
                />
                {changeInterventionNarratorError && (
                  <ErrorAlert
                    mt={16}
                    errorText={
                      changeInterventionNarratorError?.response?.data
                        ?.message ?? changeInterventionNarratorError
                    }
                  />
                )}
              </GCol>
            </GRow>
            {!organizationId && (
              <>
                <H3 mt={40}>
                  <label htmlFor={INTERVENTION_LINK_ID}>
                    {formatMessage(modalMessages.interventionLinkHeader)}
                  </label>
                </H3>
                <Text mt={8} textOpacity={0.7} color={themeColors.text}>
                  {formatMessage(modalMessages.interventionLinkDescription, {
                    interventionType: type,
                  })}
                </Text>
                <GRow mt={24} gutterWidth={16}>
                  <GCol xs={selected ? 10 : 8}>
                    <FormikInputWithAdornment
                      id={INTERVENTION_LINK_ID}
                      formikKey="links.name"
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
                      disabled={!selected && !placeholder}
                    >
                      <ImageButton
                        src={CopyIcon}
                        title={formatMessage(modalMessages.copyLink)}
                        fill={colors.heather}
                        showHoverEffect
                        noHoverBackground
                        mt={8}
                        disabled={!selected && !placeholder}
                      />
                    </CopyToClipboard>
                  </GCol>
                  <GCol xs={selected ? 1 : 3}>
                    {!selected && (
                      <TextButton
                        onClick={() => setFieldValue('links.selected', true)}
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
                          setFieldTouched('links.name', false, false);
                          setFieldValue('links.name', '', false);
                          setFieldValue('links.selected', false);
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
              </>
            )}
            <Row gap={16} mt={56}>
              <Button
                // @ts-ignore
                px={30}
                width="auto"
                title={formatMessage(messages.applyChangesButton)}
                disabled={!isValid || !dirty}
                loading={savingChanges}
                onClick={handleSubmit}
                type="submit"
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
