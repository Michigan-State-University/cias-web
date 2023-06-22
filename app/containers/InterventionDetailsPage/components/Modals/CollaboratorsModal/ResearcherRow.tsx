import React from 'react';
import { useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';

import { colors } from 'theme';

import { User } from 'models/User';

import { addCollaboratorsRequest } from 'global/reducers/intervention';

import InviteIcon from 'assets/svg/invite.svg';

import { StripedTR } from 'components/Table';
import { ImageButton } from 'components/Button';
import Row from 'components/Row';
import { EllipsisText } from 'components/Text';

import messages from './messages';
import { StyledTD } from './styled';

type Props = {
  researcher: User & { loading: boolean };
  interventionId: string;
};

const ResearcherRow = ({
  researcher: { fullName, email, id, loading },
  interventionId,
}: Props) => {
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();

  const inviteCollaborator = () =>
    dispatch(addCollaboratorsRequest([email], interventionId, id));

  return (
    <StripedTR
      height={53}
      stripesPlacement="odd"
      color={colors.aliceBlueSaturated}
      bg={colors.white}
      mb={4}
    >
      <StyledTD padding={8}>
        <EllipsisText text={fullName} />
      </StyledTD>
      <StyledTD padding={8}>
        <EllipsisText text={email} />
      </StyledTD>
      <StyledTD pl={8}>
        <Row>
          <ImageButton
            src={InviteIcon}
            onClick={inviteCollaborator}
            title={formatMessage(messages.inviteResearcher)}
            loading={loading}
            spinnerProps={{ margin: 'initial', color: colors.black }}
          />
        </Row>
      </StyledTD>
    </StripedTR>
  );
};

export default ResearcherRow;
