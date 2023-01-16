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
import * as Yup from 'yup';
import { Form, Formik, FormikProps } from 'formik';
import size from 'lodash/size';

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
  makeSelectInterventionError,
  changeInterventionNarratorRequest,
  editShortLinksRequest,
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
import { FormValues } from './types';
import { mapShortLinks } from './utils';

const createValidationSchema = (assignedToOrganization: boolean) => {
  if (assignedToOrganization) return null;
  return Yup.object().shape({
    selected: Yup.boolean(),
    name: Yup.string().when('selected', {
      is: (selected) => selected,
      then: unreservedURLCharactersSchema.concat(requiredValidationSchema),
    }),
  });
};

export type Props = {
  editingPossible: boolean;
  onClose: () => void;
};

// TODO
//  handle used links
const InterventionSettingsModal = ({ editingPossible, onClose }: Props) => {
  const { formatMessage } = useIntl();

  const dispatch = useDispatch();
  const originalIntervention = useSelector(makeSelectIntervention());
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

  const [changedIntervention, setChangedIntervention] =
    useState<Intervention>(originalIntervention);
  const [newNarrator, setNewNarrator] = useState<Nullable<CharacterType>>(null);
  const {
    id,
    languageCode,
    languageName,
    quickExit,
    currentNarrator,
    type,
    organizationId,
  } = changedIntervention;

  useEffect(() => {
    setChangedIntervention(originalIntervention);
  }, [originalIntervention]);

  const hasInterventionChanged = useMemo(
    () => !isEqual(originalIntervention, changedIntervention),
    [originalIntervention, changedIntervention],
  );

  const formRef = useRef<FormikProps<FormValues>>(null);

  useEffect(() => {
    if (editShortLinksError && formRef.current) {
      formRef.current.setFieldError(
        'name',
        formatMessage(modalMessages.linkTaken),
      );
    }
  }, [editShortLinksError]);

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

  const {
    error: shortLinksFetchError,
    isFetching: isFetchingShortLinks,
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

  const initialValues: FormValues = useMemo(() => {
    if (organizationId) return {};
    const name = shortLinksData?.shortLinks?.[0]?.name;
    return { selected: !!name, name: name ?? '' };
  }, [organizationId, shortLinksData]);

  const validationSchema = useMemo(
    () => createValidationSchema(Boolean(organizationId)),
    [organizationId],
  );

  const placeholder = `${
    process.env.WEB_URL
  }/interventions/${id}/sessions/${'sessionId'}/fill`; // TODO construct a correct url depending on a intervention type

  const prefix = `${process.env.WEB_URL}/int/`;

  const saveOtherSettingsAndLinks = useCallback(
    (formValues: Nullable<FormValues>) => {
      const { hasLinksChanged, shortLinks } = mapShortLinks(
        formValues,
        initialValues,
      );

      if (hasLinksChanged) {
        dispatch(editShortLinksRequest(shortLinks));
      }

      const changes = objectDifference(
        originalIntervention,
        changedIntervention,
      ) as Partial<Intervention>;
      delete changes.currentNarrator;

      if (size(changes)) {
        dispatch(
          editInterventionRequest(
            {
              ...changes,
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
    [initialValues, originalIntervention, changedIntervention],
  );

  const submitForm = useCallback(
    (formValues: FormValues) => {
      const narratorChanged =
        changedIntervention.currentNarrator !==
        originalIntervention.currentNarrator;
      if (narratorChanged) {
        setNewNarrator(changedIntervention.currentNarrator);
      } else {
        saveOtherSettingsAndLinks(formValues);
      }
    },
    [originalIntervention, changedIntervention, saveOtherSettingsAndLinks],
  );

  const onSaveNarrator = (
    replacementAnimations: Record<
      string,
      { [key in NarratorAnimation]: NarratorAnimation }
    >,
  ) => {
    dispatch(
      changeInterventionNarratorRequest(
        changedIntervention.currentNarrator,
        replacementAnimations,
      ),
    );
    saveOtherSettingsAndLinks(formRef.current?.values);
  };

  if (isFetchingShortLinks) {
    return <Loader type="inline" />;
  }

  if (shortLinksFetchError) {
    return <ErrorAlert errorText={shortLinksFetchError} />;
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
            onChange={handleNarratorChange}
            disabled={!editingPossible}
          />
          {changeInterventionNarratorError && (
            <ErrorAlert
              mt={16}
              errorText={
                changeInterventionNarratorError?.response?.data?.message ??
                changeInterventionNarratorError
              }
            />
          )}
        </GCol>
      </GRow>
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
          values: { selected, name },
        }) => (
          <Form>
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
              </>
            )}
            <Row gap={16} mt={56}>
              <Button
                // @ts-ignore
                px={30}
                width="auto"
                title={formatMessage(messages.applyChangesButton)}
                disabled={!isValid || (!hasInterventionChanged && !dirty)}
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
