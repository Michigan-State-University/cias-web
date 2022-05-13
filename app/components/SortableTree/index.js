import React, { memo, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { TreeItem } from 'react-sortable-tree';

import { elements } from 'theme';

import { StyledSortableTree } from './styled';
import { updateTreeNodesRecursively } from './utils';

const SortableTree = React.forwardRef(
  ({ treeData, generateNodeProps: customGenerateNodeProps, ...props }, ref) => {
    const [structure, setStructure] = useState(treeData);

    useEffect(() => {
      setStructure(updateTreeNodesRecursively(structure, treeData));
    }, [treeData]);

    const generateNodeProps = useCallback(
      (data) => {
        const { node, treeIndex } = data;

        const customNodeProps = customGenerateNodeProps
          ? customGenerateNodeProps(data)
          : {};

        if (!node.id) node.id = `tree-node-${treeIndex}`;

        return {
          ...customNodeProps,
          node: {
            ...node,
            ...customNodeProps?.node,
          },
        };
      },
      [customGenerateNodeProps],
    );

    const getNodeKey = useCallback(
      ({ node, treeIndex }) => node.id ?? `tree-node-${treeIndex}`,
      [],
    );

    // looks weird, but function is required format for this library instead of simple `false`
    const canDrop = useCallback(() => false, []);

    return (
      <StyledSortableTree
        canDrag={false}
        canDrop={canDrop}
        generateNodeProps={generateNodeProps}
        getNodeKey={getNodeKey}
        isVirtualized={false}
        onChange={setStructure}
        ref={ref}
        rowHeight={elements.treeRowHeight}
        treeData={structure}
        {...props}
      />
    );
  },
);

SortableTree.propTypes = {
  generateNodeProps: PropTypes.func,
  treeData: PropTypes.arrayOf(PropTypes.shape(TreeItem)),
};

export default memo(SortableTree);
