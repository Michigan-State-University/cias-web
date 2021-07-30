import { createSelector } from 'reselect';
import { initialState } from './reducer';

const dashboard = (state) => state.textMessages || initialState;

export const makeSelectTextMessagesState = () =>
  createSelector(dashboard, (substate) => substate);

export const makeSelectTextMessages = () =>
  createSelector(dashboard, (substate) => substate.textMessages);

export const makeSelectVariants = () =>
  createSelector(dashboard, (substate) => {
    const textMessage = substate.textMessages.find(
      ({ id }) => id === substate.selectedMessageId,
    );
    return textMessage.variants ?? [];
  });

export const makeSelectTextMessagesSize = () =>
  createSelector(dashboard, (substate) => substate.textMessages?.length ?? 0);

export const makeSelectErrors = () =>
  createSelector(dashboard, (substate) => substate.errors);

export const makeSelectLoaders = () =>
  createSelector(dashboard, (substate) => substate.loaders);

export const makeSelectAllLoaders = () =>
  createSelector(
    dashboard,
    (substate) =>
      substate.loaders.createTextMessagesLoading ||
      substate.loaders.updateTextMessagesLoading ||
      substate.loaders.removeTextMessagesLoading ||
      substate.loaders.updateVariantLoading ||
      substate.loaders.removeVariantLoading ||
      substate.loaders.createVariantLoading,
  );

export const makeSelectSelectedMessageId = () =>
  createSelector(dashboard, (substate) => substate.selectedMessageId);

export const makeSelectSelectedMessage = () =>
  createSelector(dashboard, (substate) =>
    substate.textMessages.find(({ id }) => id === substate.selectedMessageId),
  );

export const makeSelectSelectedVariantId = () =>
  createSelector(dashboard, (substate) => substate.selectedVariantId);
