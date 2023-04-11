import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { TEXT_MESSAGE_DEFAULT_STATE } from './constants';

const dashboard = (state) => state.textMessages || initialState;

export const makeSelectTextMessagesState = () =>
  createSelector(dashboard, (substate) => substate);

export const makeSelectTextMessages = () =>
  createSelector(dashboard, (substate) => substate.textMessages);

export const makeSelectFilters = () =>
  createSelector(dashboard, (substate) => substate.filters);

export const makeSelectVariants = () =>
  createSelector(dashboard, (substate) => {
    const textMessage = substate.textMessages.find(
      ({ id }) => id === substate.selectedMessageId,
    );
    return textMessage.variants ?? [];
  });

export const makeSelectTextMessagesSize = () =>
  createSelector(
    dashboard,
    (substate) =>
      substate.textMessagesSize ?? substate.textMessages?.length ?? 0,
  );

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
      substate.loaders.createVariantLoading ||
      substate.loaders.addPhoneLoading ||
      substate.loaders.removePhoneLoading ||
      substate.loaders.updatePhoneLoading,
  );

export const makeSelectSelectedMessageId = () =>
  createSelector(dashboard, (substate) => substate.selectedMessageId);

export const makeSelectSelectedMessage = () =>
  createSelector(dashboard, (substate) =>
    substate.textMessages.find(({ id }) => id === substate.selectedMessageId),
  );

export const makeSelectSelectedMessageState = () =>
  createSelector(
    dashboard,
    ({ selectedMessageId, textMessagesStates }) =>
      textMessagesStates.get(selectedMessageId) ?? TEXT_MESSAGE_DEFAULT_STATE,
  );

export const makeSelectSelectedVariantId = () =>
  createSelector(dashboard, (substate) => substate.selectedVariantId);

export const makeSelectVariantsStates = () =>
  createSelector(dashboard, ({ variantsStates }) => variantsStates);

export const makeSelectPhones = () =>
  createSelector(dashboard, (substate) => {
    const textMessage = substate.textMessages.find(
      ({ id }) => id === substate.selectedMessageId,
    );
    return textMessage?.phones || [];
  });
