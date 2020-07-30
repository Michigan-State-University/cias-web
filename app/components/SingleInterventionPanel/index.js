/**
 *
 * SingleInterventionPanel
 *
 */

import React, { memo, forwardRef } from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import binNoBg from 'assets/svg/bin-no-bg.svg';
import csvIcon from 'assets/svg/csv-icon.svg';
import fileShare from 'assets/svg/file-share.svg';
import Spinner from 'components/Spinner';
import Img from 'components/Img';
import globalMessages from 'global/i18n/globalMessages';
import messages from './messages';

import {
  InterventionContainer,
  StyledLink,
  Heading,
  StatusIndicator,
  Title,
  InterventionInfo,
  NewInterventionContainer,
  AddIcon,
} from './styled';

const SingleInterventionPanel = forwardRef(
  (
    { intervention, clickHandler, interventionCreating, participantView },
    ref,
  ) => {
    if (!intervention) {
      return (
        <NewInterventionContainer onClick={clickHandler} ref={ref}>
          {!interventionCreating && (
            <>
              <AddIcon>
                <div>+</div>
              </AddIcon>
              <FormattedMessage {...messages.newIntervention} />
            </>
          )}
          {interventionCreating && <Spinner />}
        </NewInterventionContainer>
      );
    }
    const { id, name, status } = intervention;
    return (
      <StyledLink to={`/interventions/${id}/edit`}>
        <InterventionContainer>
          <Heading>
            <div>
              <FormattedMessage {...globalMessages.statuses[status]} />
              <StatusIndicator status={status} />
            </div>
            {!participantView && (
              <div>
                <Img ml={15} src={csvIcon} alt="export csv" />
                <Img ml={15} src={fileShare} alt="share" />
                <Img ml={15} src={binNoBg} alt="remove" />
              </div>
            )}
          </Heading>
          <Title>
            <div>{name}</div>
          </Title>
          <InterventionInfo>
            {!participantView && (
              <div>
                <FormattedMessage {...messages.notPublished} />
              </div>
            )}
          </InterventionInfo>
        </InterventionContainer>
      </StyledLink>
    );
  },
);

SingleInterventionPanel.propTypes = {
  intervention: PropTypes.object,
  clickHandler: PropTypes.func,
  interventionCreating: PropTypes.bool,
  participantView: PropTypes.bool,
};

export default memo(SingleInterventionPanel);
