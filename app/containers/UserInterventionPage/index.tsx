import React, { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { useIntl } from 'react-intl';
import { Helmet } from 'react-helmet';
import groupBy from 'lodash/groupBy';
import { Markup } from 'interweave';
import { useInjectReducer } from 'redux-injectors';
import { Redirect } from 'react-router-dom';

import { RoutePath } from 'global/constants';

import useGet from 'utils/useGet';

import {
  UserIntervention,
  UserInterventionDTO,
} from 'models/UserIntervention/UserIntervention';
import { Session } from 'models/Session/Session';
import { UserSession } from 'models/UserSession/UserSession';
import { InterventionStatus, InterventionType } from 'models/Intervention';
import { AppFile } from 'models/File';

import {
  ChatWidgetReducer,
  chatWidgetReducerKey,
  setChatDisabled,
  setChatEnabled,
} from 'global/reducers/chatWidget';

import { themeColors } from 'theme';

import Loader from 'components/Loader';
import ErrorAlert from 'components/ErrorAlert';
import AppContainer from 'components/Container';
import H2 from 'components/H2';
import H3 from 'components/H3';
import Divider from 'components/Divider';
import BackButton from 'components/BackButton';
import Img from 'components/Img';
import { Col, Row } from 'components/ReactGridSystem';
import { FileDisplayItem } from 'components/FileDisplayItem';
import MarkupContainer from 'components/MarkupContainer';
import Column from 'components/Column';
import FlexRow from 'components/Row';
import {
  getInterventionNotAvailablePagePathFromReason,
  InterventionNotAvailableReason,
} from 'components/InterventionNotAvailableInfo';

import messages from './messages';
import UserSessionTile from './UserSessionTile';
import { parseUserIntervention } from './utils';

interface Params {
  userInterventionId: string;
}

const UserInterventionPage = () => {
  const { userInterventionId } = useParams<Params>();

  const globalDispatch = useDispatch();

  // @ts-ignore
  useInjectReducer({ key: chatWidgetReducerKey, reducer: ChatWidgetReducer });

  const { data, error, isFetching } = useGet<
    UserInterventionDTO,
    {
      userIntervention: UserIntervention;
      sessions: Session[];
      userSessions: UserSession[];
    }
  >(`/v1/user_interventions/${userInterventionId}`, parseUserIntervention);

  const groupedUserSessions = useMemo(
    () => groupBy(data?.userSessions, 'sessionId'),
    [data?.userSessions],
  );

  const filteredSessions = useMemo(() => {
    if (!data) return [];
    const { sessions, userIntervention } = data;
    if (userIntervention.intervention.type !== InterventionType.DEFAULT) {
      return sessions;
    }
    return sessions.filter(
      ({ id: sessionId }) => groupedUserSessions[sessionId] !== undefined,
    );
  }, [
    data?.userIntervention.intervention.type,
    groupedUserSessions,
    data?.sessions,
  ]);

  const { formatMessage } = useIntl();

  useEffect(() => {
    if (!data) return;

    const { type, liveChatEnabled, id } = data.userIntervention.intervention;

    if (type === InterventionType.DEFAULT || !liveChatEnabled) {
      globalDispatch(setChatDisabled());
      return;
    }

    globalDispatch(setChatEnabled(id));
  }, [data]);

  if (error) {
    return <ErrorAlert fullPage errorText={error} />;
  }

  if (isFetching || !data) {
    // @ts-ignore
    return <Loader type="absolute" color={themeColors.secondary} />;
  }

  const { userIntervention } = data;
  const {
    intervention: {
      name: interventionName,
      additionalText,
      imageAlt,
      logoUrl,
      type,
      id,
      files,
      status,
    },
    healthClinicId,
  } = userIntervention;

  if (status === InterventionStatus.PAUSED) {
    const redirectPath = getInterventionNotAvailablePagePathFromReason(
      InterventionNotAvailableReason.INTERVENTION_PAUSED,
    );
    if (redirectPath) return <Redirect to={redirectPath} />;
  }

  const filesCount = files?.length || 0;

  return (
    // @ts-ignore
    <AppContainer mb={30}>
      <Helmet>
        <title>{interventionName}</title>
      </Helmet>
      <Column mt={50} gap={20}>
        <FlexRow gap={16} dir="auto" justify="between">
          <H2>{interventionName}</H2>
          {logoUrl && (
            <Img maxHeight={100} maxWidth={200} src={logoUrl} alt={imageAlt} />
          )}
        </FlexRow>
      </Column>
      {additionalText && (
        <>
          <Divider width={100} my={24} />
          <MarkupContainer>
            <Markup content={additionalText} />
          </MarkupContainer>
        </>
      )}
      <Row mt={30}>
        {filteredSessions.map((session) => (
          <Col xl={3} md={6} xs={12} key={session.id}>
            <UserSessionTile
              interventionType={type}
              session={session}
              interventionId={id}
              userSession={groupedUserSessions[session.id]?.[0]}
              healthClinicId={healthClinicId}
            />
          </Col>
        ))}
      </Row>
      {filesCount > 0 && (
        <>
          <H3>{formatMessage(messages.helpingMaterials)}</H3>
          <Row overflow="auto" maxHeight={100} mt={10} mb={50}>
            {files.map((fileInfo: AppFile) => (
              <Col xs={12} md={6} xxl={4} mb={10} key={fileInfo.id}>
                <FileDisplayItem fileInfo={fileInfo} />
              </Col>
            ))}
          </Row>
        </>
      )}
      <BackButton link to={RoutePath.DASHBOARD}>
        {formatMessage(messages.backToInterventions)}
      </BackButton>
    </AppContainer>
  );
};

export default UserInterventionPage;
