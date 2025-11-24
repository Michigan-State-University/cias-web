import isNullOrUndefined from 'utils/isNullOrUndefined';

import messages from '../messages';

export const orderSettings = (settings) =>
  settings && {
    ...(!isNullOrUndefined(settings.video) && {
      video: settings.video,
    }),
    ...(!isNullOrUndefined(settings.image) && {
      image: settings.image,
    }),
    ...(!isNullOrUndefined(settings.title) && {
      title: settings.title,
    }),
    ...(!isNullOrUndefined(settings.subtitle) && {
      subtitle: settings.subtitle,
    }),
    ...(!isNullOrUndefined(settings.narrator_skippable) && {
      narrator_skippable: settings.narrator_skippable,
    }),
    ...(!isNullOrUndefined(settings.proceed_button) && {
      proceed_button: settings.proceed_button,
    }),
    ...(!isNullOrUndefined(settings.required) && {
      required: settings.required,
    }),
    ...(!isNullOrUndefined(settings.start_autofinish_timer) && {
      start_autofinish_timer: settings.start_autofinish_timer,
    }),
    ...(!isNullOrUndefined(settings.show_dashboard_button) && {
      show_dashboard_button: settings.show_dashboard_button,
    }),
    ...(!isNullOrUndefined(settings.show_number) && {
      show_number: settings.show_number,
    }),
    ...(!isNullOrUndefined(settings.text_limit) && {
      text_limit: settings.text_limit,
    }),
    ...('min_length' in settings && {
      min_length: settings.min_length,
    }),
    ...('max_length' in settings && {
      max_length: settings.max_length,
    }),
  };

export const getSettingOptionTooltipText = (formatMessage, setting) => {
  let tooltipText;
  try {
    tooltipText = formatMessage(messages[`${setting}_tooltip_text`]);
  } catch (e) {
    tooltipText = null;
  }
  return tooltipText;
};
