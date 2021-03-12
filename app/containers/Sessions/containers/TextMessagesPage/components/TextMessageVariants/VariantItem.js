import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Container } from 'react-grid-system';
import { injectIntl } from 'react-intl';

import binNoBg from 'assets/svg/bin-no-bg.svg';

import { colors } from 'theme';

import arrowDown from 'assets/svg/arrow-down-black.svg';
import arrowUp from 'assets/svg/arrow-up-black.svg';

import Box from 'components/Box';
import { StyledInput } from 'components/Input/StyledInput';
import Text from 'components/Text';
import Img from 'components/Img';
import Collapse from 'components/Collapse';
import InequalityChooser from 'components/InequalityChooser';
import H2 from 'components/H2';

import {
  changeFormulaMatch,
  changeContent,
  removeTextMessageVariantRequest,
  changeSelectedVariantId,
} from 'global/reducers/textMessages';

import { TextMessagesContext } from '../../utils';
import messages from './messages';

const VariantItem = ({
  open,
  index,
  variant: { id, formulaMatch, content },
  changeFormulaMatchAction,
  changeContentAction,
  removeVariant,
  disabled,
  changeSelectedVariant,
}) => {
  const { formatMessage } = useContext(TextMessagesContext);

  const toggleCollapsable = () => {
    if (open) changeSelectedVariant('');
    else changeSelectedVariant(id);
  };

  const handleFormulaMatchChange = value => {
    changeFormulaMatchAction(value, id);
  };

  const handleContentChange = value => {
    changeContentAction(value, id);
  };

  const handleDeleteCase = () => {
    removeVariant(id);
  };

  return (
    <Collapse
      disabled
      isOpened={open}
      onToggle={toggleCollapsable}
      height="auto"
      px={0}
      bgOpacity={0}
      onHideImg={arrowDown}
      onShowImg={arrowUp}
      imgWithBackground
      label={
        <Row
          align="center"
          justify="between"
          style={{ width: '100%', paddingRight: 10 }}
        >
          <Col xs={6}>
            <H2>
              {formatMessage(messages.case, {
                index,
              })}
            </H2>
            {formulaMatch && (
              <Text color={colors.grey}>
                {formatMessage(messages.formulaMatchLookup, {
                  formulaMatch,
                })}
              </Text>
            )}
          </Col>
        </Row>
      }
    >
      <Container style={{ width: '100%' }}>
        <Row justfy="between" align="center" style={{ marginBottom: 20 }}>
          <Col width="content">
            <Row align="center">
              <Img
                disabled={disabled}
                src={binNoBg}
                onClick={handleDeleteCase}
                mr={10}
                clickable
              />
              <Text whiteSpace="pre">{formatMessage(messages.if)}</Text>
              <InequalityChooser
                onSuccessfulChange={handleFormulaMatchChange}
                inequalityValue={formulaMatch}
                disabled={disabled}
              />
            </Row>
          </Col>
        </Row>

        <Row justfy="start">
          <Text whiteSpace="pre">
            {formatMessage(messages.sectionCaseContentHeader)}
          </Text>
          <Box bg={colors.linkWater} width="100%" mt={10} mb={20} px={8} py={8}>
            <StyledInput
              type="multiline"
              rows="5"
              width="100%"
              placeholder={formatMessage(
                messages.sectionCaseContentPlaceholder,
              )}
              value={content}
              onBlur={handleContentChange}
              disabled={disabled}
            />
          </Box>
        </Row>
      </Container>
    </Collapse>
  );
};

VariantItem.propTypes = {
  open: PropTypes.bool,
  index: PropTypes.number,
  variant: PropTypes.object,
  changeFormulaMatchAction: PropTypes.func,
  changeContentAction: PropTypes.func,
  removeVariant: PropTypes.func,
  disabled: PropTypes.bool,
  changeSelectedVariant: PropTypes.func,
};
VariantItem.defaultProps = {
  open: false,
};

const mapDispatchToProps = {
  changeFormulaMatchAction: changeFormulaMatch,
  changeContentAction: changeContent,
  removeVariant: removeTextMessageVariantRequest,
  changeSelectedVariant: changeSelectedVariantId,
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  injectIntl,
)(VariantItem);
