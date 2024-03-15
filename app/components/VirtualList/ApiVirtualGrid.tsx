/**
 *
 * ApiVirtualGrid
 *
 */

import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import { useScreenClass } from 'react-grid-system';

import useGet from 'utils/useGet';
import ErrorAlert from 'components/ErrorAlert';
import Column from 'components/Column';
import H2 from 'components/H2';

import { VirtualGrid } from '.';

interface Props {
  urlBase: string;
  dataParser: (data: any) => any;
  renderComponent: (x: {
    index: number;
    data: { items: any[] };
  }) => Nullable<JSX.Element>;
  itemsCountKey: string;
  noDataMessage?: string;
  rowHeight?: number;
}

const ApiVirtualGrid = ({
  urlBase,
  dataParser,
  renderComponent,
  itemsCountKey,
  noDataMessage,
  rowHeight = 210,
}: Props) => {
  const infiniteLoaderRef = useRef();
  const screenClass = useScreenClass();

  const prepareUrl = (startIndex: number, endIndex: number) =>
    `${urlBase}?start_index=${startIndex}&end_index=${endIndex}`;

  const [elements, setElements] = useState<any[]>([]);
  const [itemCount, setItemCount] = useState<Nullable<number>>(null);
  const [url, setUrl] = useState(prepareUrl(0, 20));

  const {
    data,
    error,
    isFetching: isLoading,
  } = useGet(url, (response) => response);

  useEffect(() => {
    if (data) {
      const typedData: any = data;
      setItemCount(typedData[itemsCountKey]);
      const parsedData = dataParser(typedData);
      setElements([...elements, ...parsedData]);
    }
  }, [data]);

  const columnCount = useMemo(() => {
    switch (screenClass) {
      case 'xs':
        return 1;
      case 'sm':
      case 'md':
        return 2;
      case 'lg':
        return 3;
      case 'xl':
      case 'xxl':
        return 4;
      default:
        return 1;
    }
  }, [screenClass]);

  const rowCount = useMemo(
    () => Math.ceil((elements.length + 1) / columnCount),
    [columnCount, elements.length],
  );

  const loadMoreItems = (startIndex: number, endIndex: number) => {
    setUrl(prepareUrl(startIndex, endIndex));
  };

  if (itemCount === 0) {
    return (
      <Column width="100%" align="center" mt={50}>
        <H2>{noDataMessage}</H2>
      </Column>
    );
  }

  return (
    <>
      {/* @ts-ignore */}
      <VirtualGrid
        ref={infiniteLoaderRef}
        columnCount={columnCount}
        rowCount={rowCount}
        rowHeight={rowHeight}
        items={elements}
        infiniteLoader={
          itemCount
            ? {
                loadMoreItems,
                isLoading,
                itemCount,
              }
            : null
        }
      >
        {renderComponent}
      </VirtualGrid>
      {error && <ErrorAlert errorText={error} fullPage={false} />}
    </>
  );
};
export default memo(ApiVirtualGrid);
