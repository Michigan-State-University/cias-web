import React from 'react';
import { EntityType } from 'global/reducers/organizations';
import StyledTextButton from './components/StyledTextButton';
import EntityTreeNode from './components/EntityTreeNode';
import messages from '../../messages';

export const generateTreeFromOrganization = ({
  organizationData,
  onClick,
  addHealthSystem,
  formatMessage,
  addHealthSystemLoader,
}) => {
  const generateOrganizationNode = ({ name, id, healthSystems }) => ({
    title: generateEntityNodeTitle({
      type: EntityType.organization,
      name,
      id,
      onClick: onClick(id, EntityType.organization),
    }),
    expanded: true,
    id,
    children: [
      generateButtonNode({
        onClick: addHealthSystem,
        text: formatMessage(messages.addEntityButton, {
          type: EntityType.healthSystem,
        }),
        loading: addHealthSystemLoader,
      }),
      ...healthSystems.map(generateHealthSystemNode),
    ],
  });

  const generateHealthSystemNode = ({ name, id, healthClinics }) => ({
    title: generateEntityNodeTitle({
      type: EntityType.healthSystem,
      name,
      id,
      onClick: onClick(id, EntityType.healthSystem),
    }),
    expanded: true,
    id,
    children: [
      generateButtonNode({
        onClick: null,
        text: formatMessage(messages.addEntityButton, {
          type: EntityType.clinic,
        }),
      }),
      ...healthClinics.map(generateClinicNode),
    ],
  });

  const generateClinicNode = ({ name, id, healthSystemId }) => ({
    title: generateEntityNodeTitle({
      type: EntityType.clinic,
      name,
      id,
      onClick: onClick(id, EntityType.clinic, healthSystemId),
    }),
    expanded: true,
    id,
    children: [],
  });

  return organizationData ? [generateOrganizationNode(organizationData)] : [{}];
};

const generateEntityNodeTitle = ({ type, name, id, onClick }) => (
  <EntityTreeNode type={type} name={name} id={id} onClick={onClick} />
);

const generateButtonNode = ({ text, onClick, loading }) => ({
  title: <StyledTextButton onClick={onClick} text={text} loading={loading} />,
});
