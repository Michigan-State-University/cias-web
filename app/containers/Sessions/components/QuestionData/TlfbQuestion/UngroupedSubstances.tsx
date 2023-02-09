import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';

import isNil from 'lodash/isNil';

import { Substance } from 'models/Question';
import BoxTable from 'components/BoxTable';
import Box from 'components/Box';
import HoverableBox from 'components/Box/HoverableBox';
import PlusCircle from 'components/Circle/PlusCircle';
import Row from 'components/Row';
import Text from 'components/Text';
import { themeColors } from 'theme';

import { removeSubstance, editSubstance, addSubstance } from './actions';
import NewSubstanceModal from './NewSubstanceModal';
import messages from './messages';

type UngroupedSubstancesType = {
  substances: Substance[];
  originalText?: Substance[];
  loading?: boolean;
  error?: string;
  disabled?: boolean;
};

export const UngroupedSubstances = ({
  substances,
  loading,
  error,
  disabled = false,
  originalText,
}: UngroupedSubstancesType) => {
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();

  const [isSubstanceModalVisible, setIsSubstanceModalVisible] = useState(false);

  const [activeSubstanceIndex, setActiveSubstanceIndex] =
    useState<Nullable<number>>(null);
  const isEditMode = !isNil(activeSubstanceIndex);

  const closeModal = () => {
    setIsSubstanceModalVisible(false);
    setActiveSubstanceIndex(null);
  };

  const onRemoveSubstance = (substanceIndex: number) => {
    dispatch(removeSubstance(substanceIndex));
  };

  const onEditSubstance = (substanceIndex: number) => {
    setActiveSubstanceIndex(substanceIndex);
    setIsSubstanceModalVisible(true);
  };

  const handleEditSubstance = (substance: Substance) => {
    if (isEditMode) {
      dispatch(editSubstance(activeSubstanceIndex, substance));
    }
  };

  const onAddSubstance = (substance: Substance) => {
    dispatch(addSubstance(substance));
  };

  return (
    <>
      <BoxTable
        data={substances}
        originalText={originalText}
        columnKeys={['name', 'variable']}
        badgeKeys={['variable']}
        onRowDelete={onRemoveSubstance}
        onRowEdit={onEditSubstance}
        disabled={disabled}
      />
      <HoverableBox
        px={8}
        py={8}
        ml={-8}
        onClick={() => setIsSubstanceModalVisible(true)}
        disabled={disabled}
      >
        <Box>
          <Row align="center">
            <PlusCircle mr={12} />
            <Text fontWeight="bold" color={themeColors.secondary}>
              {formatMessage(messages.addNewSubstance)}
            </Text>
          </Row>
        </Box>
      </HoverableBox>
      {isSubstanceModalVisible && (
        <NewSubstanceModal
          loading={!!loading}
          substance={isEditMode ? substances[activeSubstanceIndex] : undefined}
          visible={isSubstanceModalVisible}
          onClose={closeModal}
          editMode={isEditMode}
          onSubmitForm={isEditMode ? handleEditSubstance : onAddSubstance}
          error={error}
        />
      )}
    </>
  );
};

export default UngroupedSubstances;
