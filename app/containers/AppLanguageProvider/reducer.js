import produce from 'immer';

import { DEFAULT_LOCALE, isAppLanguageSupported } from 'i18n';

import { CHANGE_LOCALE } from './constants';

export const initialState = {
  locale: DEFAULT_LOCALE,
};

/* eslint-disable default-case, no-param-reassign, default-param-last */
const appLanguageProviderReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case CHANGE_LOCALE:
        const { locale } = action;
        draft.locale = isAppLanguageSupported(locale) ? locale : DEFAULT_LOCALE;
        break;
    }
  });

export default appLanguageProviderReducer;
