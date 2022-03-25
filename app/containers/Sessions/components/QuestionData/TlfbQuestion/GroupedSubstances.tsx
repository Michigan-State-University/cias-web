import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import isNil from 'lodash/isNil';

import { SubstanceGroup, Substance } from 'models/Question';
import BoxCollapse from 'components/BoxCollapse';
import BoxTable from 'components/BoxTable';
import { TextButton } from 'components/Button';
import { themeColors } from 'theme';
import HoverableBox from 'components/Box/HoverableBox';
import Box from 'components/Box';
import Text from 'components/Text';
import PlusCircle from 'components/Circle/PlusCircle';
import Row from 'components/Row';

import { clearError } from 'global/reducers/questions/actions';
import messages from './messages';
import NewSubstanceModal from './NewSubstanceModal';
import NewGroupModal from './NewGroupModal';

import {
  addSubstanceGroup,
  editSubstanceGroup,
  addSubstanceInGroup,
  removeSubstanceInGroup,
  editSubstanceInGroup,
  removeSubstanceGroup,
} from './actions';

type GroupedSubstancesType = {
  substanceGroups: SubstanceGroup[];
  loading?: boolean;
  error?: string;
  disabled?: boolean;
};

export const GroupedSubstances = ({
  substanceGroups,
  loading,
  error,
  disabled = false,
}: GroupedSubstancesType) => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();

  const [activeSubstanceGroupIndex, setActiveSubstanceGroupIndex] =
    useState<Nullable<number>>(null);
  const [activeSubstanceIndex, setActiveSubstanceIndex] =
    useState<Nullable<number>>(null);

  const hasGroupIndex = !isNil(activeSubstanceGroupIndex);
  const hasSubstanceIndex = !isNil(activeSubstanceIndex);

  const [isSubstanceModalVisible, setIsSubstanceModalVisible] = useState(false);
  const [isGroupModalVisible, setIsGroupModalVisible] = useState(false);

  const closeModal = () => {
    dispatch(clearError());
    setActiveSubstanceGroupIndex(null);
    setActiveSubstanceIndex(null);
    setIsSubstanceModalVisible(false);
    setIsGroupModalVisible(false);
  };

  const onRemoveSubstanceInGroup = (
    groupIndex: number,
    substanceIndex: number,
  ) => {
    dispatch(removeSubstanceInGroup(groupIndex, substanceIndex));
  };

  const onAddSubstanceInGroup = (groupIndex: number) => () => {
    setActiveSubstanceGroupIndex(groupIndex);
    setIsSubstanceModalVisible(true);
  };

  const onEditSubstanceInGroup = (
    groupIndex: number,
    substanceIndex: number,
  ) => {
    setActiveSubstanceIndex(substanceIndex);
    setActiveSubstanceGroupIndex(groupIndex);
    setIsSubstanceModalVisible(true);
  };

  const onAddSubstanceGroup = (name: string) =>
    dispatch(addSubstanceGroup(name));

  const onEditSubstanceGroup = (name: string) => {
    if (hasGroupIndex) {
      dispatch(editSubstanceGroup(name, activeSubstanceGroupIndex));
    }
  };

  const onAddGroupedSubstance = (substance: Substance) => {
    if (hasGroupIndex) {
      dispatch(addSubstanceInGroup(substance, activeSubstanceGroupIndex));
    }
  };

  const onEditGroupedSubstance = (substance: Substance) => {
    if (hasSubstanceIndex && hasGroupIndex) {
      dispatch(
        editSubstanceInGroup(
          activeSubstanceIndex,
          activeSubstanceGroupIndex,
          substance,
        ),
      );
    }
  };

  const onRemoveGroup = (groupIndex: number) => () => {
    dispatch(removeSubstanceGroup(groupIndex));
  };

  const onEditGroup = (groupIndex: number) => () => {
    setActiveSubstanceGroupIndex(groupIndex);
    setIsGroupModalVisible(true);
  };

  return (
    <>
      {substanceGroups.map((group, index) => (
        <BoxCollapse
          key={`substance-group-${index}`}
          label={group.name}
          onEdit={onEditGroup(index)}
          onDelete={onRemoveGroup(index)}
          mb={16}
          px={16}
          disableAnimation={!!error}
          disabled={disabled}
        >
          <>
            <BoxTable
              data={group.substances}
              badgeKeys={['variable']}
              columnKeys={['name', 'unit', 'variable']}
              onRowDelete={(id) => onRemoveSubstanceInGroup(index, id)}
              onRowEdit={(id) => onEditSubstanceInGroup(index, id)}
              containerStyleProps={{ mb: 16 }}
              disabled={disabled}
            />
            <TextButton
              buttonProps={{ color: themeColors.secondary }}
              onClick={onAddSubstanceInGroup(index)}
              disabled={disabled}
            >
              {formatMessage(messages.addNewSubstance)}
            </TextButton>
          </>
        </BoxCollapse>
      ))}

      <HoverableBox
        px={8}
        py={8}
        ml={-8}
        onClick={() => setIsGroupModalVisible(true)}
        disabled={disabled}
      >
        <Box>
          <Row align="center">
            <PlusCircle mr={12} />
            <Text fontWeight="bold" color={themeColors.secondary}>
              {formatMessage(messages.addSubstanceGroup)}
            </Text>
          </Row>
        </Box>
      </HoverableBox>

      <NewGroupModal
        substanceGroup={
          hasGroupIndex ? substanceGroups[activeSubstanceGroupIndex] : undefined
        }
        visible={isGroupModalVisible}
        onClose={closeModal}
        loading={!!loading}
        error={error}
        editMode={hasGroupIndex}
        onSubmitForm={
          hasGroupIndex ? onEditSubstanceGroup : onAddSubstanceGroup
        }
      />

      {isSubstanceModalVisible && (
        <NewSubstanceModal
          substance={
            hasGroupIndex && hasSubstanceIndex
              ? substanceGroups[activeSubstanceGroupIndex].substances[
                  activeSubstanceIndex
                ]
              : undefined
          }
          visible={isSubstanceModalVisible}
          onClose={closeModal}
          loading={!!loading}
          editMode={hasSubstanceIndex}
          onSubmitForm={
            hasSubstanceIndex ? onEditGroupedSubstance : onAddGroupedSubstance
          }
          error={error}
          grouped
        />
      )}
    </>
  );
};

export default GroupedSubstances;
