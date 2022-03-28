import React, { useState } from 'react';
import { useIntl } from 'react-intl';

import { themeColors } from 'theme';

import Img from 'components/Img';
import Text from 'components/Text';
import Row from 'components/Row';
import Modal from 'components/Modal';

import Document from 'assets/svg/green-document.svg';
import StandardDrinks from 'assets/images/standard-drinks.jpeg';

import messages from './messages';

export type TlfbHelpingMaterialsProps = {
  mobile?: boolean;
};

const TlfbHelpingMaterials = ({ mobile }: TlfbHelpingMaterialsProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { formatMessage } = useIntl();
  return (
    <>
      <Modal
        visible={modalVisible}
        title={formatMessage(messages.helpingMaterials)}
        onClose={() => setModalVisible(false)}
        maxWidth={mobile ? 400 : 500}
      >
        <Img
          maxWidth="100%"
          maxHeight="100%"
          src={StandardDrinks}
          alt={formatMessage(messages.helpingMaterials)}
        />
      </Modal>
      <Row
        cursor="pointer"
        onClick={() => setModalVisible(true)}
        display="flex"
        align="center"
      >
        {!mobile && (
          <Img mr={10} src={Document} alt={formatMessage(messages.document)} />
        )}
        <Text
          color={themeColors.primary}
          fontWeight={mobile ? 'bold' : 'medium'}
        >
          {formatMessage(messages.helpingMaterials)}
        </Text>
      </Row>
    </>
  );
};

export default TlfbHelpingMaterials;
