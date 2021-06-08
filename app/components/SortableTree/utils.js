import keyBy from 'lodash/keyBy';

export const updateTreeNodesRecursively = (oldTreeNodes, newTreeNodes) => {
  const newTreeNodesSize = newTreeNodes ? newTreeNodes.length : 0;

  if (!newTreeNodesSize) return [];

  const oldTreeNodesMap = oldTreeNodes ? keyBy(oldTreeNodes, 'id') : {};
  const newNodes = [];

  for (let i = 0; i < newTreeNodesSize; i++) {
    let node = newTreeNodes[i];
    const oldNode = oldTreeNodesMap[node.id];

    if (oldNode) {
      node = {
        ...node,
        expanded: oldNode.expanded,
        children: updateTreeNodesRecursively(oldNode.children, node.children),
      };
    }

    newNodes.push(node);
  }

  return newNodes;
};
