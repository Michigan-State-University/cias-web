import { useEffect, useState } from 'react';
import { useStoreState, useZoomPanHelper } from 'react-flow-renderer';

import { FileDownloaderFactory } from 'utils/fileDownloader';
import { HTMLToFileConverterFactory } from 'utils/htmlToImg';

import { colors } from 'theme';

import {
  DIVIDER_CLASSNAME,
  INITIAL_DOWNLOAD_PROGRESS_STATE,
  REACT_FLOW_EDGES_PANE_ID,
  SESSION_MAP_ID,
  SHOW_DETAILS_CLASSNAME,
} from '../../constants';
import { DownloadMapState, DownloadProgressState } from '../../types';

type DownloadSessionMap = {
  isGenerating: boolean;
  downloadAsync: (withBackground: boolean) => void;
};

export const useDownloadSessionMap = (): DownloadSessionMap => {
  const { transform } = useZoomPanHelper();

  const [downloadProgressState, setDownloadProgressState] =
    useState<DownloadProgressState>(INITIAL_DOWNLOAD_PROGRESS_STATE);

  const {
    isInProgress,
    isReadyToGenerate,
    isReadyToRestore,
    mapState,
    withBackground,
    cachedEdgesPane,
  } = downloadProgressState;

  const { width, height, currentTransform } = useStoreState((state) => {
    const {
      translateExtent: [, [x, y]],
    } = state;

    return { width: x, height: y, currentTransform: state.transform };
  });

  // Save current state and prepare map for generation (move to root etc)
  useEffect(() => {
    if (isInProgress) {
      const edgesPane = document.getElementsByClassName(
        REACT_FLOW_EDGES_PANE_ID,
      )[0];

      if (edgesPane) {
        setDownloadProgressState({
          ...downloadProgressState,
          cachedEdgesPane: edgesPane,
          mapState: saveCurrentMapState(edgesPane),
          isReadyToGenerate: true,
        });
        prepareMapForDownload(edgesPane);
      } else {
        setDownloadProgressState(INITIAL_DOWNLOAD_PROGRESS_STATE);
      }
    }
  }, [isInProgress]);

  // generate map
  useEffect(() => {
    if (isReadyToGenerate) {
      const map = document.getElementById(SESSION_MAP_ID);

      if (map) {
        generateAndTriggerDownloadAsync(map);
      }
    }
  }, [isReadyToGenerate]);

  // restore map to saved state
  useEffect(() => {
    if (isReadyToRestore) {
      restorePreviousMapState(cachedEdgesPane!, mapState!);

      setDownloadProgressState(INITIAL_DOWNLOAD_PROGRESS_STATE);
    }
  }, [isReadyToRestore]);

  const initializeDownload = (withBackgroundSetting: boolean) => {
    setDownloadProgressState({
      ...downloadProgressState,
      isInProgress: true,
      withBackground: withBackgroundSetting,
    });
  };

  const generateAndTriggerDownloadAsync = async (map: HTMLElement) => {
    const image = await generateImage(map);

    const fileDownloader = FileDownloaderFactory.markupFileDownloader();
    fileDownloader.download(image, 'session-map.svg');

    setDownloadProgressState({
      ...downloadProgressState,
      isReadyToGenerate: false,
      isReadyToRestore: true,
    });
  };

  const generateImage = (map: HTMLElement) => {
    const htmlToImageConverter = HTMLToFileConverterFactory.toSvg();

    return htmlToImageConverter.convert(map, {
      width,
      height,
      backgroundColor: withBackground ? colors.zirkon : 'transparent',
      filter: (node) =>
        !node.classList?.contains(SHOW_DETAILS_CLASSNAME) &&
        !node.classList?.contains(DIVIDER_CLASSNAME),
    });
  };

  const saveCurrentMapState = (edgesPane: Element): DownloadMapState => {
    const [x, y, zoom] = currentTransform;
    const savedWidth = edgesPane.getAttribute('width');
    const savedHeight = edgesPane.getAttribute('height');

    return {
      transform: {
        x,
        y,
        zoom,
      },
      edgePaneWidth: savedWidth,
      edgePaneHeight: savedHeight,
    };
  };

  const prepareMapForDownload = (edgesPane: Element) => {
    transform({ x: 0, y: 0, zoom: 1 });
    edgesPane.setAttribute('width', `${width}`);
    edgesPane.setAttribute('height', `${height}`);
  };

  const restorePreviousMapState = (
    edgesPane: Element,
    state: DownloadMapState,
  ) => {
    const {
      transform: { x, y, zoom },
      edgePaneWidth,
      edgePaneHeight,
    } = state;
    transform({ x, y, zoom });
    edgesPane.setAttribute('width', `${edgePaneWidth}`);
    edgesPane.setAttribute('height', `${edgePaneHeight}`);
  };

  return { isGenerating: isInProgress, downloadAsync: initializeDownload };
};
