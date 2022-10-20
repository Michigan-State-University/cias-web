import React, { useState } from 'react';
import { useIntl } from 'react-intl';

import { themeColors } from 'theme';

import Img from 'components/Img';
import Text from 'components/Text';
import Row from 'components/Row';
import Modal from 'components/Modal';
import Divider from 'components/Divider';

import Document from 'assets/svg/green-document.svg';
import StandardDrinks from 'assets/images/standard-drinks.png';

import messages from './messages';

export type TlfbHelpingMaterialsProps = {
  mobile?: boolean;
  researcher?: boolean;
};

const TlfbHelpingMaterials = ({
  mobile,
  researcher,
}: TlfbHelpingMaterialsProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { formatMessage } = useIntl();
  return (
    <>
      <Modal
        visible={modalVisible}
        title={formatMessage(messages.standardDrinkChart)}
        onClose={() => setModalVisible(false)}
        maxWidth="90%"
        zIndex={1000}
        disableScrollLock
      >
        <Divider my={16} />
        <Img
          maxWidth="100%"
          maxHeight="100%"
          src={StandardDrinks}
          alt={formatMessage(messages.standardDrinkChart)}
        />
      </Modal>
      <Row
        cursor="pointer"
        onClick={() => setModalVisible(true)}
        display="flex"
        align="center"
      >
        {!mobile && !researcher && (
          <Img mr={10} src={Document} alt={formatMessage(messages.document)} />
        )}
        <Text
          color={themeColors.primary}
          fontWeight={mobile ? 'bold' : 'medium'}
          textDecoration={researcher ? 'underline' : 'none'}
        >
          {formatMessage(
            messages[researcher ? 'showPreview' : 'standardDrinkChart'],
          )}
        </Text>
      </Row>
    </>
  );
};

export default TlfbHelpingMaterials;
